import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';

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

interface ChatMessageRecord {
  id: string;
  sender: 'customer' | 'support' | 'system';
  senderName: string;
  text: string;
  createdAtUtc: string;
}

interface ChatSessionRecord {
  sessionId: string;
  sessionToken: string;
  customerName: string;
  customerContact: string;
  language: 'en' | 'ur' | 'ar';
  createdAtUtc: string;
  updatedAtUtc: string;
  messages: ChatMessageRecord[];
}

const consultations: ConsultationRecord[] = [];
const enquiries: ContactEnquiry[] = [];
const chatSessions = new Map<string, ChatSessionRecord>();

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

function validateAdminToken(token: string): boolean {
  const session = activeSessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization ?? '';
  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }
  const token = authHeader.slice(7).trim();
  if (!validateAdminToken(token)) {
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

function serializeSessionForAdmin(s: ChatSessionRecord) {
  return {
    sessionId: s.sessionId,
    customerName: s.customerName,
    customerContact: s.customerContact,
    language: s.language,
    createdAtUtc: s.createdAtUtc,
    updatedAtUtc: s.updatedAtUtc,
    messages: s.messages,
  };
}

function listAdminChatSessions() {
  return Array.from(chatSessions.values())
    .sort((a, b) => b.updatedAtUtc.localeCompare(a.updatedAtUtc))
    .map(serializeSessionForAdmin);
}

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '64kb' }));

  // Baseline security headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // --- Real-Time WebSocket Live Chat Hub (/ws/chat) ---
  const wss = new WebSocketServer({ server: httpServer, path: '/ws/chat' });
  const customerRooms = new Map<string, Set<WebSocket>>();
  const adminSockets = new Set<WebSocket>();

  function safeSend(ws: WebSocket, payload: Record<string, unknown>) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
    }
  }

  function broadcastPresence() {
    const supportOnline = adminSockets.size > 0;
    const msg = JSON.stringify({ type: 'presence', supportOnline });
    for (const sockets of customerRooms.values()) {
      for (const sock of sockets) {
        if (sock.readyState === WebSocket.OPEN) sock.send(msg);
      }
    }
  }

  function broadcastAdminSessions() {
    const payload = JSON.stringify({
      type: 'admin:sessions',
      sessions: listAdminChatSessions(),
    });
    for (const adminWs of adminSockets) {
      if (adminWs.readyState === WebSocket.OPEN) adminWs.send(payload);
    }
  }

  function broadcastToCustomerRoom(sessionId: string, payload: Record<string, unknown>) {
    const room = customerRooms.get(sessionId);
    if (!room) return;
    const serialized = JSON.stringify(payload);
    for (const sock of room) {
      if (sock.readyState === WebSocket.OPEN) sock.send(serialized);
    }
  }

  wss.on('connection', (ws) => {
    let role: 'unauthenticated' | 'customer' | 'admin' = 'unauthenticated';
    let boundSessionId: string | null = null;
    let messageCountWindow = 0;
    let windowStart = Date.now();

    ws.on('message', (raw) => {
      const now = Date.now();
      if (now - windowStart > 10_000) {
        windowStart = now;
        messageCountWindow = 0;
      }
      messageCountWindow += 1;
      if (messageCountWindow > 25) {
        safeSend(ws, { type: 'error', message: 'Rate limit exceeded. Please pause briefly.' });
        return;
      }

      let data: Record<string, unknown>;
      try {
        data = JSON.parse(raw.toString()) as Record<string, unknown>;
      } catch {
        safeSend(ws, { type: 'error', message: 'Invalid message format.' });
        return;
      }

      const type = cleanText(data.type, 40);

      if (type === 'ping') {
        safeSend(ws, { type: 'pong', supportOnline: adminSockets.size > 0 });
        return;
      }

      // Customer authenticates into their private room with server-issued sessionToken
      if (type === 'customer:join') {
        const sessionId = cleanText(data.sessionId, 80);
        const sessionToken = cleanText(data.sessionToken, 128);
        const session = chatSessions.get(sessionId);
        if (!session || session.sessionToken !== sessionToken) {
          safeSend(ws, { type: 'error', message: 'Chat session invalid or expired.' });
          return;
        }
        role = 'customer';
        boundSessionId = sessionId;
        if (!customerRooms.has(sessionId)) {
          customerRooms.set(sessionId, new Set());
        }
        customerRooms.get(sessionId)!.add(ws);

        safeSend(ws, {
          type: 'chat:joined',
          sessionId,
          supportOnline: adminSockets.size > 0,
          messages: session.messages,
        });
        return;
      }

      // Customer sends message into their authenticated room
      if (type === 'customer:message' && role === 'customer' && boundSessionId) {
        const session = chatSessions.get(boundSessionId);
        if (!session) return;

        const text = cleanText(data.text, 1000);
        if (!text) return;

        const clientMsgId = cleanText(data.id, 80) || crypto.randomUUID();
        if (session.messages.some((m) => m.id === clientMsgId)) {
          return; // Idempotent deduplication
        }

        const senderName = cleanText(data.senderName, 80);
        const customerContact = cleanText(data.contact, 120);
        if (senderName) session.customerName = senderName;
        if (customerContact) session.customerContact = customerContact;

        const msg: ChatMessageRecord = {
          id: clientMsgId,
          sender: 'customer',
          senderName: session.customerName || 'Guest Visitor',
          text,
          createdAtUtc: new Date().toISOString(),
        };
        session.messages.push(msg);
        if (session.messages.length > 120) session.messages.shift();
        session.updatedAtUtc = msg.createdAtUtc;

        broadcastToCustomerRoom(boundSessionId, { type: 'chat:message', message: msg });
        broadcastAdminSessions();
        return;
      }

      // Admin authenticates via Bearer token sent in message payload (never in URL query)
      if (type === 'admin:auth') {
        const token = cleanText(data.token, 128);
        if (!validateAdminToken(token)) {
          safeSend(ws, { type: 'error', message: 'Unauthorized admin session.' });
          ws.close();
          return;
        }
        role = 'admin';
        adminSockets.add(ws);
        safeSend(ws, {
          type: 'admin:authenticated',
          sessions: listAdminChatSessions(),
        });
        broadcastPresence();
        return;
      }

      // Admin sends live reply to a specific customer session
      if (type === 'admin:reply' && role === 'admin') {
        const targetSessionId = cleanText(data.sessionId, 80);
        const text = cleanText(data.text, 1200);
        const session = chatSessions.get(targetSessionId);
        if (!session || !text) return;

        const msgId = cleanText(data.id, 80) || crypto.randomUUID();
        if (session.messages.some((m) => m.id === msgId)) return;

        const msg: ChatMessageRecord = {
          id: msgId,
          sender: 'support',
          senderName: 'AstroTalk PK Support Desk',
          text,
          createdAtUtc: new Date().toISOString(),
        };
        session.messages.push(msg);
        if (session.messages.length > 120) session.messages.shift();
        session.updatedAtUtc = msg.createdAtUtc;

        broadcastToCustomerRoom(targetSessionId, { type: 'chat:message', message: msg });
        broadcastAdminSessions();
      }
    });

    ws.on('close', () => {
      if (role === 'customer' && boundSessionId) {
        const room = customerRooms.get(boundSessionId);
        if (room) {
          room.delete(ws);
          if (room.size === 0) customerRooms.delete(boundSessionId);
        }
      }
      if (role === 'admin') {
        adminSockets.delete(ws);
        broadcastPresence();
      }
    });
  });

  // --- Health & Persistence Status ---
  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      serverUtc: new Date().toISOString(),
      storageMode: 'transient-memory',
      supportOnline: adminSockets.size > 0,
    });
  });

  // --- Live Chat REST Endpoints ---
  app.get('/api/chat/status', (_req, res) => {
    res.json({
      supportOnline: adminSockets.size > 0,
      activeAdmins: adminSockets.size,
      serverUtc: new Date().toISOString(),
    });
  });

  app.post('/api/chat/session', (req, res) => {
    const ip = req.ip ?? 'unknown';
    if (!checkRateLimit(`chat-session:${ip}`, 20, 10 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many chat sessions started. Please wait briefly.' });
      return;
    }

    const body = req.body ?? {};
    const customerName = cleanText(body.customerName, 80) || 'Guest Visitor';
    const customerContact = cleanText(body.customerContact, 120);
    const rawLang = cleanText(body.language, 4);
    const language = (VALID_LANGS.has(rawLang) ? rawLang : 'en') as 'en' | 'ur' | 'ar';

    // Allow resuming an existing valid session if sessionId & sessionToken match
    const existingId = cleanText(body.sessionId, 80);
    const existingToken = cleanText(body.sessionToken, 128);
    if (existingId && existingToken) {
      const existing = chatSessions.get(existingId);
      if (existing && existing.sessionToken === existingToken) {
        if (body.customerName) existing.customerName = customerName;
        if (body.customerContact) existing.customerContact = customerContact;
        res.json({
          ok: true,
          sessionId: existing.sessionId,
          sessionToken: existing.sessionToken,
          supportOnline: adminSockets.size > 0,
          messages: existing.messages,
        });
        return;
      }
    }

    const sessionId = `CHAT-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const sessionToken = crypto.randomBytes(24).toString('hex');
    const nowUtc = new Date().toISOString();

    const record: ChatSessionRecord = {
      sessionId,
      sessionToken,
      customerName,
      customerContact,
      language,
      createdAtUtc: nowUtc,
      updatedAtUtc: nowUtc,
      messages: [],
    };

    chatSessions.set(sessionId, record);
    // Keep memory bounded
    if (chatSessions.size > 200) {
      const oldestKey = chatSessions.keys().next().value;
      if (oldestKey) chatSessions.delete(oldestKey);
    }

    broadcastAdminSessions();

    res.status(201).json({
      ok: true,
      sessionId,
      sessionToken,
      supportOnline: adminSockets.size > 0,
      messages: [],
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
      chats: listAdminChatSessions(),
      storageMode: 'transient-memory',
      serverUtc: new Date().toISOString(),
    });
  });

  app.get('/api/admin/chats', requireAdminAuth, (_req, res) => {
    res.json({
      chats: listAdminChatSessions(),
      supportOnline: adminSockets.size > 0,
    });
  });

  app.post('/api/admin/chats/:sessionId/reply', requireAdminAuth, (req, res) => {
    const session = chatSessions.get(req.params.sessionId);
    if (!session) {
      res.status(404).json({ error: 'Chat session not found.' });
      return;
    }
    const text = cleanText(req.body?.text, 1200);
    if (!text) {
      res.status(400).json({ error: 'Reply message cannot be empty.' });
      return;
    }
    const msg: ChatMessageRecord = {
      id: crypto.randomUUID(),
      sender: 'support',
      senderName: 'AstroTalk PK Support Desk',
      text,
      createdAtUtc: new Date().toISOString(),
    };
    session.messages.push(msg);
    session.updatedAtUtc = msg.createdAtUtc;
    broadcastToCustomerRoom(session.sessionId, { type: 'chat:message', message: msg });
    broadcastAdminSessions();
    res.status(201).json({ ok: true, message: msg });
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

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`ASTROTALK PK server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start ASTROTALK PK server:', err);
  process.exit(1);
});
