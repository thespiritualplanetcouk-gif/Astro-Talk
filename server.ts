import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

// --- Server-Side In-Memory Operational Store (Transient until Production DB connected) ---
interface ConsultationRecord {
  id: string;
  reference: string;
  fullName: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
  serviceSlug: string;
  expertSlug: string;
  language: 'en' | 'ur' | 'ar';
  consultationType: 'whatsapp' | 'phone' | 'appointment';
  customerTimeZone: string;
  preferredLocalDateTime: string;
  utcTimestamp: string;
  currency: string;
  notes: string;
  consentAccepted: boolean;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAtUtc: string;
}

interface ContactEnquiry {
  id: string;
  reference: string;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  topic: string;
  language: 'en' | 'ur' | 'ar';
  message: string;
  status: 'new' | 'reviewed' | 'archived';
  createdAtUtc: string;
}

const consultations: ConsultationRecord[] = [];
const enquiries: ContactEnquiry[] = [];

// --- Rate Limiter (Per-IP sliding window) ---
const rateBuckets = new Map<string, number[]>();
function checkRateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = (rateBuckets.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    rateBuckets.set(ip, timestamps);
    return false;
  }
  timestamps.push(now);
  rateBuckets.set(ip, timestamps);
  return true;
}

// --- Admin Authentication (scrypt + Bearer Session in Memory) ---
interface StoredHash {
  salt: string;
  hash: string;
}

let claimedAdminHash: StoredHash | null = null;
const activeSessions = new Map<string, { expiresAt: number }>();
const SESSION_TTL_MS = 1000 * 60 * 60 * 4; // 4 hours

function hashPasscode(passcode: string, salt?: string): StoredHash {
  const usedSalt = salt ?? crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(passcode, usedSalt, 64).toString('hex');
  return { salt: usedSalt, hash: derived };
}

function verifyPasscodeAgainstHash(candidate: string, stored: StoredHash): boolean {
  const derived = crypto.scryptSync(candidate, stored.salt, 64);
  const expected = Buffer.from(stored.hash, 'hex');
  if (derived.length !== expected.length) return false;
  return crypto.timingSafeEqual(derived, expected);
}

function getConfiguredEnvPasscode(): string {
  return (process.env.ADMIN_PASSCODE ?? '').trim();
}

function verifyAdminCredentials(candidate: string): boolean {
  const envPass = getConfiguredEnvPasscode();
  if (envPass.length > 0) {
    const envSalt = 'astrotalk-env-pass-salt';
    const envHash = hashPasscode(envPass, envSalt);
    return verifyPasscodeAgainstHash(candidate, envHash);
  }
  if (!claimedAdminHash) return false;
  return verifyPasscodeAgainstHash(candidate, claimedAdminHash);
}

function issueSessionToken(): string {
  const token = crypto.randomBytes(32).toString('hex');
  activeSessions.set(token, { expiresAt: Date.now() + SESSION_TTL_MS });
  return token;
}

function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization ?? '';
  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }
  const token = authHeader.slice(7).trim();
  const session = activeSessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    activeSessions.delete(token);
    res.status(401).json({ error: 'Session expired or invalid.' });
    return;
  }
  next();
}

// --- Input Sanitizers & Validators ---
function cleanText(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, maxLen);
}

const VALID_LANGS = new Set(['en', 'ur', 'ar']);
const VALID_METHODS = new Set(['whatsapp', 'phone', 'appointment']);
const VALID_CURRENCIES = new Set(['PKR', 'GBP', 'USD', 'EUR', 'CAD', 'AUD', 'AED', 'SAR']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9\s\-()]{6,20}$/;
const CALLING_CODE_RE = /^\+[0-9]{1,4}$/;

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '64kb' }));

  // Baseline security headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // --- Health & Persistence Status ---
  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      serverUtc: new Date().toISOString(),
      storageMode: 'transient-memory',
    });
  });

  // --- Public Consultation Appointment Request ---
  app.post('/api/consultations/request', (req, res) => {
    const ip = req.ip ?? 'unknown';
    if (!checkRateLimit(`consult:${ip}`, 10, 10 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many requests. Please wait a few minutes before submitting again.' });
      return;
    }

    const body = req.body ?? {};
    // Honeypot anti-spam trap
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      res.status(400).json({ error: 'Invalid submission.' });
      return;
    }

    const fullName = cleanText(body.fullName, 100);
    const countryCode = cleanText(body.countryCode, 6);
    const phoneNumber = cleanText(body.phoneNumber, 24);
    const email = cleanText(body.email, 120);
    const serviceSlug = cleanText(body.serviceSlug, 80);
    const expertSlug = cleanText(body.expertSlug, 80) || 'any-specialist';
    const language = cleanText(body.language, 4);
    const consultationType = cleanText(body.consultationType, 20);
    const customerTimeZone = cleanText(body.customerTimeZone, 64) || 'UTC';
    const preferredLocalDateTime = cleanText(body.preferredLocalDateTime, 40);
    const currency = cleanText(body.currency, 5).toUpperCase() || 'PKR';
    const notes = cleanText(body.notes, 800);
    const consentAccepted = body.consentAccepted === true;

    if (fullName.length < 2) {
      res.status(400).json({ error: 'Please enter your full name.' });
      return;
    }
    if (!CALLING_CODE_RE.test(countryCode) || !PHONE_RE.test(phoneNumber)) {
      res.status(400).json({ error: 'Please provide a valid international calling code and phone number.' });
      return;
    }
    if (email.length > 0 && !EMAIL_RE.test(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }
    if (!VALID_LANGS.has(language) || !VALID_METHODS.has(consultationType)) {
      res.status(400).json({ error: 'Invalid language or consultation method.' });
      return;
    }
    if (!consentAccepted) {
      res.status(400).json({ error: 'Privacy consent is required before submitting your request.' });
      return;
    }

    // Parse provided UTC timestamp or fallback safely
    let utcTimestamp = new Date().toISOString();
    if (typeof body.utcTimestamp === 'string' && !Number.isNaN(Date.parse(body.utcTimestamp))) {
      utcTimestamp = new Date(body.utcTimestamp).toISOString();
    }

    const refSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    const record: ConsultationRecord = {
      id: crypto.randomUUID(),
      reference: `ATPK-${refSuffix}`,
      fullName,
      countryCode,
      phoneNumber,
      email,
      serviceSlug: serviceSlug || 'general-consultation',
      expertSlug,
      language: language as 'en' | 'ur' | 'ar',
      consultationType: consultationType as 'whatsapp' | 'phone' | 'appointment',
      customerTimeZone,
      preferredLocalDateTime,
      utcTimestamp,
      currency: VALID_CURRENCIES.has(currency) ? currency : 'PKR',
      notes,
      consentAccepted: true,
      status: 'pending',
      createdAtUtc: new Date().toISOString(),
    };

    consultations.unshift(record);
    if (consultations.length > 200) consultations.pop();

    res.status(201).json({
      ok: true,
      reference: record.reference,
      utcTimestamp: record.utcTimestamp,
      customerTimeZone: record.customerTimeZone,
      storageNotice: 'Recorded in current server session. Connect a production database for permanent archival.',
    });
  });

  // --- Public General Contact Form ---
  app.post('/api/contact', (req, res) => {
    const ip = req.ip ?? 'unknown';
    if (!checkRateLimit(`contact:${ip}`, 8, 10 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many messages sent. Please wait a few minutes.' });
      return;
    }

    const body = req.body ?? {};
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      res.status(400).json({ error: 'Invalid submission.' });
      return;
    }

    const fullName = cleanText(body.fullName, 100);
    const email = cleanText(body.email, 120);
    const countryCode = cleanText(body.countryCode, 6) || '+44';
    const phoneNumber = cleanText(body.phoneNumber, 24);
    const topic = cleanText(body.topic, 80) || 'General Enquiry';
    const language = cleanText(body.language, 4);
    const message = cleanText(body.message, 1200);

    if (fullName.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
      res.status(400).json({ error: 'Please complete your name, valid email, and message (at least 10 characters).' });
      return;
    }

    const refSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    const record: ContactEnquiry = {
      id: crypto.randomUUID(),
      reference: `ENQ-${refSuffix}`,
      fullName,
      email,
      countryCode,
      phoneNumber,
      topic,
      language: (VALID_LANGS.has(language) ? language : 'en') as 'en' | 'ur' | 'ar',
      message,
      status: 'new',
      createdAtUtc: new Date().toISOString(),
    };

    enquiries.unshift(record);
    if (enquiries.length > 200) enquiries.pop();

    res.status(201).json({
      ok: true,
      reference: record.reference,
      createdAtUtc: record.createdAtUtc,
    });
  });

  // --- Admin Auth Status & Setup/Login Flow ---
  app.get('/api/admin/status', (_req, res) => {
    const envConfigured = getConfiguredEnvPasscode().length > 0;
    const isClaimed = envConfigured || claimedAdminHash !== null;
    res.json({
      configured: isClaimed,
      source: envConfigured ? 'env' : claimedAdminHash ? 'claimed' : 'unclaimed',
      storageMode: 'transient-memory',
    });
  });

  app.post('/api/admin/setup', (req, res) => {
    const ip = req.ip ?? 'unknown';
    if (!checkRateLimit(`admin-setup:${ip}`, 5, 10 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many setup attempts.' });
      return;
    }
    if (getConfiguredEnvPasscode().length > 0 || claimedAdminHash !== null) {
      res.status(409).json({ error: 'Administrator credentials are already configured.' });
      return;
    }
    const passcode = typeof req.body?.passcode === 'string' ? req.body.passcode.trim() : '';
    if (passcode.length < 8 || passcode.length > 72) {
      res.status(400).json({ error: 'Passcode must be between 8 and 72 characters.' });
      return;
    }
    claimedAdminHash = hashPasscode(passcode);
    const token = issueSessionToken();
    res.status(201).json({ ok: true, token });
  });

  app.post('/api/admin/login', (req, res) => {
    const ip = req.ip ?? 'unknown';
    if (!checkRateLimit(`admin-login:${ip}`, 10, 10 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many login attempts. Please try again later.' });
      return;
    }
    const passcode = typeof req.body?.passcode === 'string' ? req.body.passcode.trim() : '';
    if (!passcode || !verifyAdminCredentials(passcode)) {
      res.status(401).json({ error: 'Invalid administrator credentials.' });
      return;
    }
    const token = issueSessionToken();
    res.json({ ok: true, token });
  });

  app.post('/api/admin/logout', requireAdminAuth, (req, res) => {
    const token = (req.headers.authorization ?? '').slice(7).trim();
    activeSessions.delete(token);
    res.json({ ok: true });
  });

  app.get('/api/admin/dashboard', requireAdminAuth, (_req, res) => {
    res.json({
      consultations,
      enquiries,
      storageMode: 'transient-memory',
      serverUtc: new Date().toISOString(),
    });
  });

  app.patch('/api/admin/appointments/:id', requireAdminAuth, (req, res) => {
    const id = req.params.id;
    const status = req.body?.status;
    if (status !== 'pending' && status !== 'confirmed' && status !== 'cancelled') {
      res.status(400).json({ error: 'Invalid status.' });
      return;
    }
    const item = consultations.find((c) => c.id === id);
    if (!item) {
      res.status(404).json({ error: 'Appointment not found.' });
      return;
    }
    item.status = status;
    res.json({ ok: true, item });
  });

  app.patch('/api/admin/enquiries/:id', requireAdminAuth, (req, res) => {
    const id = req.params.id;
    const status = req.body?.status;
    if (status !== 'new' && status !== 'reviewed' && status !== 'archived') {
      res.status(400).json({ error: 'Invalid status.' });
      return;
    }
    const item = enquiries.find((e) => e.id === id);
    if (!item) {
      res.status(404).json({ error: 'Enquiry not found.' });
      return;
    }
    item.status = status;
    res.json({ ok: true, item });
  });

  // --- Vite Middleware in Development / Static Dist in Production ---
  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { maxAge: '1d' }));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ASTROTALK PK server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start ASTROTALK PK server:', err);
  process.exit(1);
});
