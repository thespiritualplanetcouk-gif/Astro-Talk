import React, { useEffect, useRef, useState } from 'react';
import {
  Lock,
  LogOut,
  Users,
  Calendar,
  Mail,
  Layers,
  Globe,
  Settings,
  FileText,
  ShieldCheck,
  Database,
  MessageSquare,
  Send,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { EXPERTS } from '../data/experts';
import { SERVICES } from '../data/services';
import { KNOWLEDGE_ARTICLES } from '../data/knowledge';
import { SUPPORTED_CURRENCIES } from '../utils/international';
import { SeoHead } from '../components/SeoHead';

interface ServerAppointment {
  id: string;
  reference: string;
  fullName: string;
  countryCode: string;
  phoneNumber: string;
  serviceSlug: string;
  expertSlug: string;
  language: string;
  consultationType: string;
  customerTimeZone: string;
  preferredLocalDateTime: string;
  utcTimestamp: string;
  currency: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAtUtc: string;
}

interface ServerEnquiry {
  id: string;
  reference: string;
  fullName: string;
  email: string;
  topic: string;
  message: string;
  status: 'new' | 'reviewed' | 'archived';
  createdAtUtc: string;
}

interface AdminChatMessage {
  id: string;
  sender: 'customer' | 'support' | 'system';
  senderName: string;
  text: string;
  createdAtUtc: string;
}

interface AdminChatSession {
  sessionId: string;
  customerName: string;
  customerContact: string;
  language: string;
  createdAtUtc: string;
  updatedAtUtc: string;
  messages: AdminChatMessage[];
}

type AdminTab =
  | 'overview'
  | 'chats'
  | 'appointments'
  | 'enquiries'
  | 'experts'
  | 'services'
  | 'content'
  | 'settings';

export function AdminDashboardPage() {
  // Token kept strictly in React memory (never persisted to localStorage/sessionStorage)
  const [token, setToken] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<{
    loading: boolean;
    configured: boolean;
    source: string;
  }>({ loading: true, configured: false, source: 'unclaimed' });

  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [appointments, setAppointments] = useState<ServerAppointment[]>([]);
  const [enquiries, setEnquiries] = useState<ServerEnquiry[]>([]);
  const [chatSessions, setChatSessions] = useState<AdminChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);

  const adminWsRef = useRef<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [expertApprovals, setExpertApprovals] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    EXPERTS.forEach((e) => {
      init[e.slug] = e.availableForBooking;
    });
    return init;
  });

  useEffect(() => {
    fetch('/api/admin/status')
      .then((r) => r.json())
      .then((d) =>
        setAuthStatus({
          loading: false,
          configured: Boolean(d.configured),
          source: d.source || 'unclaimed',
        })
      )
      .catch(() => setAuthStatus({ loading: false, configured: false, source: 'unclaimed' }));
  }, []);

  // Connect authenticated Admin WebSocket to /ws/chat so visitors see Support Online in real time
  useEffect(() => {
    if (!token) {
      if (adminWsRef.current) {
        adminWsRef.current.close();
        adminWsRef.current = null;
      }
      setWsConnected(false);
      return;
    }

    let cancelled = false;
    let reconnectTimer: number | null = null;

    const connectAdminWs = () => {
      if (cancelled) return;
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${protocol}//${window.location.host}/ws/chat`);
      adminWsRef.current = ws;

      ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'admin:auth', token }));
      };

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'admin:authenticated') {
            setWsConnected(true);
            if (Array.isArray(payload.sessions)) {
              setChatSessions(payload.sessions);
            }
          } else if (payload.type === 'admin:sessions' && Array.isArray(payload.sessions)) {
            setChatSessions(payload.sessions);
          } else if (payload.type === 'error' && payload.error === 'Invalid admin token.') {
            setWsConnected(false);
          }
        } catch {
          // Ignore malformed frame
        }
      };

      ws.onclose = () => {
        setWsConnected(false);
        if (!cancelled) {
          reconnectTimer = window.setTimeout(connectAdminWs, 3500);
        }
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connectAdminWs();

    return () => {
      cancelled = true;
      if (reconnectTimer) window.clearTimeout(reconnectTimer);
      if (adminWsRef.current) {
        adminWsRef.current.close();
        adminWsRef.current = null;
      }
      setWsConnected(false);
    };
  }, [token]);

  // Keep selected chat session synced
  useEffect(() => {
    if (!selectedSessionId && chatSessions.length > 0) {
      setSelectedSessionId(chatSessions[0].sessionId);
    }
  }, [chatSessions, selectedSessionId]);

  useEffect(() => {
    if (activeTab === 'chats') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatSessions, selectedSessionId, activeTab]);

  const loadDashboard = async (bearerToken: string) => {
    const res = await fetch('/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${bearerToken}` },
    });
    if (res.status === 401) {
      setToken(null);
      return;
    }
    const data = await res.json();
    setAppointments(data.consultations ?? []);
    setEnquiries(data.enquiries ?? []);
    if (Array.isArray(data.chats)) {
      setChatSessions(data.chats);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSubmitting(true);
    try {
      const endpoint = authStatus.configured ? '/api/admin/login' : '/api/admin/setup';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Authentication failed.');
      } else {
        setToken(data.token);
        setPasscode('');
        setAuthStatus((prev) => ({ ...prev, configured: true }));
        await loadDashboard(data.token);
      }
    } catch {
      setAuthError('Server connection error.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    setToken(null);
    setChatSessions([]);
    setSelectedSessionId(null);
  };

  const updateAppointmentStatus = async (
    id: string,
    status: 'pending' | 'confirmed' | 'cancelled'
  ) => {
    if (!token) return;
    const res = await fetch(`/api/admin/appointments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    }
  };

  const updateEnquiryStatus = async (id: string, status: 'new' | 'reviewed' | 'archived') => {
    if (!token) return;
    const res = await fetch(`/api/admin/enquiries/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setEnquiries((prev) => prev.map((enq) => (enq.id === id ? { ...enq, status } : enq)));
    }
  };

  const handleSendChatReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = replyText.trim();
    if (!trimmed || !selectedSessionId || !token) return;

    setSendingReply(true);
    const msgId = `adm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    try {
      if (adminWsRef.current && adminWsRef.current.readyState === WebSocket.OPEN && wsConnected) {
        adminWsRef.current.send(
          JSON.stringify({
            type: 'admin:reply',
            sessionId: selectedSessionId,
            id: msgId,
            text: trimmed,
          })
        );
        setReplyText('');
      } else {
        const res = await fetch(`/api/admin/chats/${selectedSessionId}/reply`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: trimmed }),
        });
        if (res.ok) {
          setReplyText('');
          await loadDashboard(token);
        }
      }
    } finally {
      setSendingReply(false);
    }
  };

  const activeSession = chatSessions.find((s) => s.sessionId === selectedSessionId) ?? null;

  return (
    <div className="pt-24 pb-24 bg-[#FAF8F2] text-[#26332D] min-h-screen">
      <SeoHead
        title="Admin Management Architecture"
        description="Role-protected administration console for managing live customer chat, specialists, consultations, multilingual content, availability, fees, and SEO settings."
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {!token ? (
          <div className="max-w-md mx-auto mt-10 bg-white border border-[#C6A15B]/45 shadow-md p-7 sm:p-8 space-y-6 rounded-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#164E3C] text-[#EAD9AD] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <h1 className="font-display text-3xl font-semibold text-[#15243A]">
                {authStatus.configured ? 'Administrator Sign In' : 'First-Run Admin Setup'}
              </h1>
            </div>

            <p className="text-xs text-[#566760] leading-relaxed">
              {authStatus.configured
                ? 'Enter your configured server-side administrator passcode to open the management console and connect to the live customer chat desk.'
                : 'No ADMIN_PASSCODE environment secret is set yet. Claim a strong passcode (8+ characters) to secure this preview session. For production deployments, set ADMIN_PASSCODE in Secrets.'}
            </p>

            {authError && (
              <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-800 rounded-sm">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-pass" className="block text-xs font-semibold text-[#164E3C] mb-1.5">
                  {authStatus.configured ? 'Administrator Passcode' : 'Create Administrator Passcode'}
                </label>
                <input
                  id="admin-pass"
                  type="password"
                  required
                  minLength={8}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full h-11 px-3.5 text-sm bg-[#FAF8F2] border border-[#C6A15B]/45 text-[#15243A] focus:border-[#164E3C] focus:outline-none rounded-sm"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || authStatus.loading}
                className="w-full min-h-[44px] py-3 bg-[#164E3C] text-white font-semibold text-sm hover:bg-[#26745A] transition-colors cursor-pointer rounded-sm"
              >
                {submitting
                  ? 'Verifying...'
                  : authStatus.configured
                    ? 'Unlock Admin Console'
                    : 'Claim Admin Passcode'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top Admin Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C6A15B]/30">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#164E3C]">
                  ASTROTALK PK · Operations Console
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#15243A] mt-1">
                  Admin Management Architecture
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-sm border ${
                    wsConnected
                      ? 'bg-[#F1F5EF] border-[#164E3C]/30 text-[#164E3C]'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  {wsConnected ? (
                    <>
                      <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Live Chat Online</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3.5 h-3.5" />
                      <span>Reconnecting Chat...</span>
                    </>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => loadDashboard(token)}
                  className="px-4 py-2 text-xs font-medium bg-white border border-[#C6A15B]/45 text-[#15243A] hover:border-[#164E3C] cursor-pointer rounded-sm"
                >
                  Refresh Live Queue
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#15243A] text-white hover:bg-[#164E3C] cursor-pointer rounded-sm"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Architecture Persistence Disclosure */}
            <div className="p-4 bg-[#F1F5EF] border border-[#164E3C]/20 flex items-start gap-3 text-xs text-[#26332D] rounded-sm">
              <Database className="w-4 h-4 text-[#164E3C] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Live Server &amp; Persistence Blueprint:</strong> Live customer chats (
                <code className="text-[#164E3C] font-semibold">/ws/chat</code>), appointment
                requests, and contact enquiries are verified and managed live via authenticated
                Express endpoints (<code className="text-[#164E3C] font-semibold">/api/admin/*</code>
                ). Keeping this console open publishes real-time Support Online presence to visitors.
                For permanent production storage across restarts, connect PostgreSQL (Cloud SQL) or
                Firestore.
              </p>
            </div>

            {/* Module Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'overview', label: 'Analytics Overview', icon: Layers },
                { key: 'chats', label: `Live Chat Inbox (${chatSessions.length})`, icon: MessageSquare },
                { key: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar },
                { key: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Mail },
                { key: 'experts', label: `Experts & Approval (${EXPERTS.length})`, icon: Users },
                { key: 'services', label: `Services & Fees (${SERVICES.length})`, icon: ShieldCheck },
                { key: 'content', label: 'Knowledge & Translations', icon: FileText },
                { key: 'settings', label: 'Currencies, SEO & Site', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as AdminTab)}
                  className={`min-h-[42px] inline-flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all cursor-pointer whitespace-nowrap rounded-sm ${
                    activeTab === tab.key
                      ? 'bg-[#164E3C] text-white font-semibold shadow-sm'
                      : 'bg-white text-[#26332D] border border-[#C6A15B]/35 hover:border-[#164E3C]'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-6 bg-white border border-[#C6A15B]/35 rounded-sm shadow-xs">
                  <p className="text-xs text-[#566760]">Active Live Chat Threads</p>
                  <p className="tabular-nums-mono text-4xl text-[#164E3C] font-semibold mt-2">
                    {chatSessions.length}
                  </p>
                </div>
                <div className="p-6 bg-white border border-[#C6A15B]/35 rounded-sm shadow-xs">
                  <p className="text-xs text-[#566760]">Live Session Appointments</p>
                  <p className="tabular-nums-mono text-4xl text-[#15243A] font-semibold mt-2">
                    {appointments.length}
                  </p>
                </div>
                <div className="p-6 bg-white border border-[#C6A15B]/35 rounded-sm shadow-xs">
                  <p className="text-xs text-[#566760]">Live Session Enquiries</p>
                  <p className="tabular-nums-mono text-4xl text-[#15243A] font-semibold mt-2">
                    {enquiries.length}
                  </p>
                </div>
                <div className="p-6 bg-white border border-[#C6A15B]/35 rounded-sm shadow-xs">
                  <p className="text-xs text-[#566760]">Services · Specialists</p>
                  <p className="tabular-nums-mono text-4xl text-[#C6A15B] font-semibold mt-2">
                    {SERVICES.length} · {EXPERTS.length}
                  </p>
                </div>
              </div>
            )}

            {/* TAB: REAL-TIME LIVE CHAT INBOX */}
            {activeTab === 'chats' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[520px]">
                {/* Left: Customer Conversations List */}
                <div className="lg:col-span-4 bg-white border border-[#C6A15B]/35 rounded-sm shadow-xs flex flex-col overflow-hidden">
                  <div className="px-4 py-3.5 bg-[#F1F5EF] border-b border-[#C6A15B]/25 flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#164E3C]">
                      Customer Conversations
                    </h2>
                    <span className="tabular-nums-mono text-xs text-[#566760]">
                      {chatSessions.length}
                    </span>
                  </div>

                  {chatSessions.length === 0 ? (
                    <div className="p-6 text-xs text-[#566760] leading-relaxed">
                      No customer chat sessions started yet. When any visitor opens the floating
                      “Chat With Us” widget and sends a message, their thread appears here
                      instantly over WebSockets.
                    </div>
                  ) : (
                    <div className="divide-y divide-[#C6A15B]/20 overflow-y-auto max-h-[500px]">
                      {chatSessions.map((sess) => {
                        const lastMsg = sess.messages[sess.messages.length - 1];
                        const isSelected = sess.sessionId === selectedSessionId;
                        return (
                          <button
                            key={sess.sessionId}
                            type="button"
                            onClick={() => setSelectedSessionId(sess.sessionId)}
                            className={`w-full text-start p-4 transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#F1F5EF] border-s-4 border-[#164E3C]'
                                : 'hover:bg-[#FAF8F2]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-semibold text-[#15243A] truncate">
                                {sess.customerName || 'Visitor'}
                              </span>
                              <span className="text-[10px] uppercase font-semibold text-[#164E3C]">
                                {sess.language}
                              </span>
                            </div>
                            {sess.customerContact && (
                              <p className="text-[11px] tabular-nums-mono text-[#566760] mt-0.5 truncate">
                                {sess.customerContact}
                              </p>
                            )}
                            {lastMsg && (
                              <p className="text-xs text-[#566760] mt-1.5 line-clamp-1">
                                <span className="font-medium text-[#26332D]">
                                  {lastMsg.sender === 'support' ? 'You: ' : ''}
                                </span>
                                {lastMsg.text}
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right: Active Thread & Reply Composer */}
                <div className="lg:col-span-8 bg-white border border-[#C6A15B]/35 rounded-sm shadow-xs flex flex-col overflow-hidden">
                  {!activeSession ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-sm text-[#566760]">
                      <MessageSquare className="w-8 h-8 text-[#C6A15B] mb-3" />
                      <p>Select a customer conversation on the left to reply in real time.</p>
                    </div>
                  ) : (
                    <>
                      <div className="px-5 py-4 bg-[#164E3C] text-white flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h2 className="font-display text-xl font-semibold text-white">
                            {activeSession.customerName || 'Visitor'}
                          </h2>
                          <p className="text-xs text-[#DCE7E1] tabular-nums-mono">
                            Session {activeSession.sessionId.slice(0, 8)} ·{' '}
                            {activeSession.customerContact || 'No contact provided'} ·{' '}
                            {activeSession.language.toUpperCase()}
                          </p>
                        </div>
                        <span className="text-xs text-[#EAD9AD]">
                          {wsConnected ? 'Live WebSocket Relay' : 'REST Fallback Mode'}
                        </span>
                      </div>

                      <div className="flex-1 p-5 space-y-3 overflow-y-auto max-h-[380px] bg-[#FAF8F2]">
                        {activeSession.messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${
                              msg.sender === 'support'
                                ? 'items-end'
                                : msg.sender === 'system'
                                  ? 'items-center'
                                  : 'items-start'
                            }`}
                          >
                            {msg.sender === 'system' ? (
                              <div className="px-3 py-1.5 text-[11px] bg-[#F1F5EF] border border-[#C6A15B]/25 text-[#566760] rounded-sm text-center max-w-md">
                                {msg.text}
                              </div>
                            ) : (
                              <div
                                className={`max-w-[82%] px-4 py-2.5 text-sm rounded-sm shadow-xs ${
                                  msg.sender === 'support'
                                    ? 'bg-[#164E3C] text-white'
                                    : 'bg-white border border-[#C6A15B]/35 text-[#15243A]'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3 text-[10px] opacity-80 mb-1">
                                  <span className="font-semibold">{msg.senderName}</span>
                                  <span className="tabular-nums-mono">
                                    {msg.createdAtUtc.slice(11, 16)} UTC
                                  </span>
                                </div>
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                              </div>
                            )}
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>

                      <form
                        onSubmit={handleSendChatReply}
                        className="p-4 bg-white border-t border-[#C6A15B]/30 flex gap-2.5"
                      >
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type a live reply to this visitor..."
                          maxLength={1000}
                          className="flex-1 h-11 px-3.5 text-sm bg-[#FAF8F2] border border-[#C6A15B]/45 text-[#15243A] focus:border-[#164E3C] focus:outline-none rounded-sm"
                        />
                        <button
                          type="submit"
                          disabled={sendingReply || !replyText.trim()}
                          className="inline-flex items-center gap-2 px-5 h-11 bg-[#164E3C] text-white text-xs font-semibold hover:bg-[#26745A] disabled:opacity-50 transition-colors cursor-pointer rounded-sm"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Reply</span>
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* TAB: APPOINTMENTS */}
            {activeTab === 'appointments' && (
              <div className="bg-white border border-[#C6A15B]/35 overflow-x-auto rounded-sm shadow-xs">
                {appointments.length === 0 ? (
                  <p className="p-8 text-sm text-[#566760]">
                    No consultation requests submitted in this server session yet. Submit one from
                    any “Book Consultation” button to inspect live UTC normalization here.
                  </p>
                ) : (
                  <table className="w-full text-start text-xs">
                    <thead className="border-b border-[#C6A15B]/30 text-[#164E3C] bg-[#F1F5EF]">
                      <tr>
                        <th className="p-4 text-start">Ref</th>
                        <th className="p-4 text-start">Client</th>
                        <th className="p-4 text-start">Service / Lang</th>
                        <th className="p-4 text-start">UTC / Local TZ</th>
                        <th className="p-4 text-start">Status</th>
                        <th className="p-4 text-start">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C6A15B]/20">
                      {appointments.map((apt) => (
                        <tr key={apt.id}>
                          <td className="p-4 tabular-nums-mono font-semibold text-[#164E3C]">
                            {apt.reference}
                          </td>
                          <td className="p-4 text-[#15243A]">
                            <div className="font-medium">{apt.fullName}</div>
                            <div className="text-[#566760] tabular-nums-mono">
                              {apt.countryCode} {apt.phoneNumber}
                            </div>
                          </td>
                          <td className="p-4 text-[#26332D]">
                            <div>{apt.serviceSlug}</div>
                            <div className="text-[#566760] uppercase">
                              {apt.language} · {apt.consultationType}
                            </div>
                          </td>
                          <td className="p-4 tabular-nums-mono text-[#26332D]">
                            <div>{apt.utcTimestamp.slice(0, 16).replace('T', ' ')}Z</div>
                            <div className="text-[#566760]">{apt.customerTimeZone}</div>
                          </td>
                          <td className="p-4 capitalize font-semibold text-[#164E3C]">
                            {apt.status}
                          </td>
                          <td className="p-4 space-x-2 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                              className="px-2.5 py-1 bg-[#164E3C] text-white rounded-sm cursor-pointer"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                              className="px-2.5 py-1 bg-[#FAF8F2] text-[#566760] border border-[#C6A15B]/35 rounded-sm cursor-pointer"
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* TAB: ENQUIRIES */}
            {activeTab === 'enquiries' && (
              <div className="bg-white border border-[#C6A15B]/35 p-6 space-y-4 rounded-sm shadow-xs">
                {enquiries.length === 0 ? (
                  <p className="text-sm text-[#566760]">
                    No general contact enquiries received in this server session yet.
                  </p>
                ) : (
                  enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 bg-[#FAF8F2] border border-[#C6A15B]/30 flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-sm"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-[#164E3C] tabular-nums-mono">
                          {enq.reference} · {enq.topic} · Status: {enq.status}
                        </div>
                        <div className="text-sm font-semibold text-[#15243A]">
                          {enq.fullName} ({enq.email})
                        </div>
                        <p className="text-xs text-[#566760] pt-1">{enq.message}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateEnquiryStatus(enq.id, 'reviewed')}
                        className="px-3 py-1.5 text-xs bg-[#164E3C] text-white shrink-0 cursor-pointer rounded-sm"
                      >
                        Mark Reviewed
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: EXPERTS & APPROVAL */}
            {activeTab === 'experts' && (
              <div className="bg-white border border-[#C6A15B]/35 divide-y divide-[#C6A15B]/20 rounded-sm shadow-xs">
                {EXPERTS.map((exp) => (
                  <div
                    key={exp.slug}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#15243A]">{exp.name.en}</p>
                      <p className="text-xs text-[#566760] mt-0.5">
                        {exp.primarySpeciality.en} · {exp.availabilityWindowPkt} · PKR{' '}
                        {exp.feePkr.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-semibold text-[#164E3C]">
                        {expertApprovals[exp.slug] ? 'Active in Directory' : 'Paused'}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setExpertApprovals((prev) => ({
                            ...prev,
                            [exp.slug]: !prev[exp.slug],
                          }))
                        }
                        className="px-3 py-1.5 border border-[#C6A15B]/45 text-[#15243A] hover:border-[#164E3C] cursor-pointer rounded-sm"
                      >
                        {expertApprovals[exp.slug] ? 'Deactivate' : 'Approve & Activate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: SERVICES & FEES */}
            {activeTab === 'services' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map((svc) => (
                  <div
                    key={svc.slug}
                    className="p-5 bg-white border border-[#C6A15B]/35 rounded-sm shadow-xs"
                  >
                    <div className="flex justify-between text-xs font-semibold text-[#164E3C]">
                      <span className="tabular-nums-mono text-[#C6A15B]">{svc.order}</span>
                      <span>{svc.domain}</span>
                    </div>
                    <h2 className="font-display text-xl font-semibold text-[#15243A] mt-1">
                      {svc.title.en}
                    </h2>
                    <p className="text-xs text-[#566760] mt-1">
                      {svc.title.ur} · {svc.title.ar}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: CONTENT & TRANSLATIONS */}
            {activeTab === 'content' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-[#C6A15B]/35 space-y-3 rounded-sm shadow-xs">
                  <h2 className="font-display text-2xl font-semibold text-[#15243A]">
                    Knowledge Center Articles ({KNOWLEDGE_ARTICLES.length})
                  </h2>
                  {KNOWLEDGE_ARTICLES.map((art) => (
                    <div key={art.slug} className="py-2 border-b border-[#C6A15B]/20 text-xs">
                      <p className="text-[#15243A] font-medium">{art.title.en}</p>
                      <p className="text-[#566760] mt-0.5">
                        EN · UR · AR translated · {art.updatedDate}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-white border border-[#C6A15B]/35 space-y-3 text-xs text-[#566760] rounded-sm shadow-xs">
                  <h2 className="font-display text-2xl font-semibold text-[#15243A]">
                    Reviews Moderation &amp; Customer Directory
                  </h2>
                  <p className="leading-relaxed">
                    Zero unverified reviews are published. Connect a production database to store
                    consented post-consultation reviews, multilingual CMS updates, and encrypted
                    customer booking histories.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: SETTINGS & SEO */}
            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-[#C6A15B]/35 space-y-3 rounded-sm shadow-xs">
                  <div className="flex items-center gap-2 text-[#164E3C]">
                    <Globe className="w-4 h-4" />
                    <h2 className="font-display text-2xl font-semibold text-[#15243A]">
                      Prepared Currencies &amp; Markets
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {SUPPORTED_CURRENCIES.map((cur) => (
                      <div
                        key={cur.code}
                        className="p-3 bg-[#FAF8F2] border border-[#C6A15B]/30 rounded-sm"
                      >
                        <span className="tabular-nums-mono text-[#164E3C] font-semibold">
                          {cur.code}
                        </span>
                        <span className="block text-[#566760] mt-0.5">{cur.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white border border-[#C6A15B]/35 space-y-3 text-xs text-[#26332D] rounded-sm shadow-xs">
                  <h2 className="font-display text-2xl font-semibold text-[#15243A]">
                    Technical SEO, PWA &amp; Real-Time Readiness
                  </h2>
                  <ul className="space-y-2 text-[#566760]">
                    <li>Canonical URLs &amp; dynamic per-route metadata: Active</li>
                    <li>hreflang Alternates (en, ur, ar, x-default): Configured</li>
                    <li>XML Sitemap (/sitemap.xml) &amp; Robots (/robots.txt): Published</li>
                    <li>PWA Manifest, Service Worker &amp; Offline Caching: Configured</li>
                    <li>Real-Time WebSocket Live Chat Relay (/ws/chat): Active</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
