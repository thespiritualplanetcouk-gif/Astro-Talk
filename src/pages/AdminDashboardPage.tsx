import React, { useEffect, useState } from 'react';
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

type AdminTab =
  | 'overview'
  | 'experts'
  | 'appointments'
  | 'enquiries'
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

  return (
    <div className="pt-24 pb-20 bg-[#091426] min-h-screen">
      <SeoHead
        title="Admin Management Architecture"
        description="Role-protected administration console for managing specialists, consultations, multilingual content, availability, fees, and SEO settings."
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {!token ? (
          <div className="max-w-md mx-auto mt-10 bg-[#0C192F] border border-[#C6A35A]/30 p-7 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#E5CD91]" />
              <h1 className="font-display text-3xl font-semibold text-[#F6F2E9]">
                {authStatus.configured ? 'Administrator Sign In' : 'First-Run Admin Setup'}
              </h1>
            </div>

            <p className="text-xs text-[#A9B2BE] leading-relaxed">
              {authStatus.configured
                ? 'Enter your configured server-side administrator passcode to open the management console.'
                : 'No ADMIN_PASSCODE environment secret is set yet. Claim a strong passcode (8+ characters) to secure this preview session. For production deployments, set ADMIN_PASSCODE in Secrets.'}
            </p>

            {authError && (
              <div className="p-3 text-xs bg-[#3A161A] border border-[#E07A7A]/40 text-[#F6D6D6]">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-pass" className="block text-xs text-[#D6DCE5] mb-1.5">
                  {authStatus.configured ? 'Administrator Passcode' : 'Create Administrator Passcode'}
                </label>
                <input
                  id="admin-pass"
                  type="password"
                  required
                  minLength={8}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full h-11 px-3.5 text-sm bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9]"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || authStatus.loading}
                className="w-full py-3 bg-[#C6A35A] text-[#091426] font-semibold text-sm hover:bg-[#E5CD91] transition-colors cursor-pointer"
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C6A35A]/20">
              <div>
                <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A]">
                  ASTROTALK PK · Operations Console
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#F6F2E9] mt-1">
                  Admin Management Architecture
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => loadDashboard(token)}
                  className="px-4 py-2 text-xs border border-[#C6A35A]/30 text-[#E5CD91] hover:border-[#E5CD91] cursor-pointer"
                >
                  Refresh Live Queue
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs bg-[#0C192F] border border-[#C6A35A]/25 text-[#F6F2E9] hover:border-[#E5CD91] cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Architecture Persistence Disclosure */}
            <div className="p-4 bg-[#0C3028]/50 border border-[#C6A35A]/30 flex items-start gap-3 text-xs text-[#D6DCE5]">
              <Database className="w-4 h-4 text-[#E5CD91] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Backend Persistence Blueprint:</strong> Appointment requests and contact
                enquiries submitted during this server session are verified and managed live via
                server-side Express endpoints (<code className="text-[#E5CD91]">/api/admin/*</code>
                ). For permanent production persistence, role-based access control (RBAC), photo
                uploads, and live FX exchange rates, connect PostgreSQL (Cloud SQL) or Firestore +
                Firebase Auth. Local browser storage is intentionally NOT used as a database.
              </p>
            </div>

            {/* Module Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'overview', label: 'Analytics Overview', icon: Layers },
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
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-[#C6A35A] text-[#091426] font-semibold'
                      : 'bg-[#0C192F] text-[#D6DCE5] border border-[#C6A35A]/20 hover:border-[#E5CD91]'
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
                <div className="p-6 bg-[#0C192F] border border-[#C6A35A]/20">
                  <p className="text-xs text-[#A9B2BE]">Live Session Appointments</p>
                  <p className="tabular-nums-mono text-4xl text-[#E5CD91] font-semibold mt-2">
                    {appointments.length}
                  </p>
                </div>
                <div className="p-6 bg-[#0C192F] border border-[#C6A35A]/20">
                  <p className="text-xs text-[#A9B2BE]">Live Session Enquiries</p>
                  <p className="tabular-nums-mono text-4xl text-[#F6F2E9] font-semibold mt-2">
                    {enquiries.length}
                  </p>
                </div>
                <div className="p-6 bg-[#0C192F] border border-[#C6A35A]/20">
                  <p className="text-xs text-[#A9B2BE]">Configured Service Categories</p>
                  <p className="tabular-nums-mono text-4xl text-[#F6F2E9] font-semibold mt-2">
                    {SERVICES.length}
                  </p>
                </div>
                <div className="p-6 bg-[#0C192F] border border-[#C6A35A]/20">
                  <p className="text-xs text-[#A9B2BE]">Sample Specialist Templates</p>
                  <p className="tabular-nums-mono text-4xl text-[#F6F2E9] font-semibold mt-2">
                    {EXPERTS.length}
                  </p>
                </div>
              </div>
            )}

            {/* TAB: APPOINTMENTS */}
            {activeTab === 'appointments' && (
              <div className="bg-[#0C192F] border border-[#C6A35A]/20 overflow-x-auto">
                {appointments.length === 0 ? (
                  <p className="p-8 text-sm text-[#A9B2BE]">
                    No consultation requests submitted in this server session yet. Submit one from
                    any “Book Consultation” button to inspect live UTC normalization here.
                  </p>
                ) : (
                  <table className="w-full text-start text-xs">
                    <thead className="border-b border-[#C6A35A]/20 text-[#E5CD91] bg-[#091426]">
                      <tr>
                        <th className="p-4 text-start">Ref</th>
                        <th className="p-4 text-start">Client</th>
                        <th className="p-4 text-start">Service / Lang</th>
                        <th className="p-4 text-start">UTC / Local TZ</th>
                        <th className="p-4 text-start">Status</th>
                        <th className="p-4 text-start">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C6A35A]/10">
                      {appointments.map((apt) => (
                        <tr key={apt.id}>
                          <td className="p-4 tabular-nums-mono text-[#E5CD91]">{apt.reference}</td>
                          <td className="p-4 text-[#F6F2E9]">
                            <div>{apt.fullName}</div>
                            <div className="text-[#A9B2BE] tabular-nums-mono">
                              {apt.countryCode} {apt.phoneNumber}
                            </div>
                          </td>
                          <td className="p-4 text-[#D6DCE5]">
                            <div>{apt.serviceSlug}</div>
                            <div className="text-[#A9B2BE] uppercase">
                              {apt.language} · {apt.consultationType}
                            </div>
                          </td>
                          <td className="p-4 tabular-nums-mono text-[#D6DCE5]">
                            <div>{apt.utcTimestamp.slice(0, 16).replace('T', ' ')}Z</div>
                            <div className="text-[#A9B2BE]">{apt.customerTimeZone}</div>
                          </td>
                          <td className="p-4 capitalize font-medium text-[#E5CD91]">{apt.status}</td>
                          <td className="p-4 space-x-2 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                              className="px-2.5 py-1 bg-[#0C3028] text-[#F6F2E9] border border-[#C6A35A]/30 cursor-pointer"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                              className="px-2.5 py-1 bg-[#091426] text-[#A9B2BE] border border-[#C6A35A]/20 cursor-pointer"
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
              <div className="bg-[#0C192F] border border-[#C6A35A]/20 p-6 space-y-4">
                {enquiries.length === 0 ? (
                  <p className="text-sm text-[#A9B2BE]">
                    No general contact enquiries received in this server session yet.
                  </p>
                ) : (
                  enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 bg-[#091426] border border-[#C6A35A]/15 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="text-xs text-[#E5CD91] tabular-nums-mono">
                          {enq.reference} · {enq.topic} · Status: {enq.status}
                        </div>
                        <div className="text-sm font-semibold text-[#F6F2E9]">
                          {enq.fullName} ({enq.email})
                        </div>
                        <p className="text-xs text-[#A9B2BE] pt-1">{enq.message}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateEnquiryStatus(enq.id, 'reviewed')}
                        className="px-3 py-1.5 text-xs bg-[#0C3028] text-[#F6F2E9] border border-[#C6A35A]/30 shrink-0 cursor-pointer"
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
              <div className="bg-[#0C192F] border border-[#C6A35A]/20 divide-y divide-[#C6A35A]/15">
                {EXPERTS.map((exp) => (
                  <div
                    key={exp.slug}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#F6F2E9]">{exp.name.en}</p>
                      <p className="text-xs text-[#A9B2BE] mt-0.5">
                        {exp.primarySpeciality.en} · {exp.availabilityWindowPkt} · PKR{' '}
                        {exp.feePkr.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-[#E5CD91]">
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
                        className="px-3 py-1.5 border border-[#C6A35A]/30 text-[#F6F2E9] hover:border-[#E5CD91] cursor-pointer"
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
                  <div key={svc.slug} className="p-5 bg-[#0C192F] border border-[#C6A35A]/20">
                    <div className="flex justify-between text-xs text-[#C6A35A]">
                      <span className="tabular-nums-mono">{svc.order}</span>
                      <span>{svc.domain}</span>
                    </div>
                    <h2 className="font-display text-xl text-[#F6F2E9] mt-1">{svc.title.en}</h2>
                    <p className="text-xs text-[#A9B2BE] mt-1">{svc.title.ur} · {svc.title.ar}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: CONTENT & TRANSLATIONS */}
            {activeTab === 'content' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-[#0C192F] border border-[#C6A35A]/20 space-y-3">
                  <h2 className="font-display text-2xl text-[#E5CD91]">
                    Knowledge Center Articles ({KNOWLEDGE_ARTICLES.length})
                  </h2>
                  {KNOWLEDGE_ARTICLES.map((art) => (
                    <div key={art.slug} className="py-2 border-b border-[#C6A35A]/10 text-xs">
                      <p className="text-[#F6F2E9] font-medium">{art.title.en}</p>
                      <p className="text-[#A9B2BE] mt-0.5">
                        EN · UR · AR translated · {art.updatedDate}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-[#0C192F] border border-[#C6A35A]/20 space-y-3 text-xs text-[#A9B2BE]">
                  <h2 className="font-display text-2xl text-[#E5CD91]">
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
                <div className="p-6 bg-[#0C192F] border border-[#C6A35A]/20 space-y-3">
                  <div className="flex items-center gap-2 text-[#E5CD91]">
                    <Globe className="w-4 h-4" />
                    <h2 className="font-display text-2xl text-[#F6F2E9]">
                      Prepared Currencies &amp; Markets
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {SUPPORTED_CURRENCIES.map((cur) => (
                      <div key={cur.code} className="p-3 bg-[#091426] border border-[#C6A35A]/15">
                        <span className="tabular-nums-mono text-[#E5CD91] font-semibold">
                          {cur.code}
                        </span>
                        <span className="block text-[#A9B2BE] mt-0.5">{cur.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#0C192F] border border-[#C6A35A]/20 space-y-3 text-xs text-[#D6DCE5]">
                  <h2 className="font-display text-2xl text-[#F6F2E9]">
                    Technical SEO &amp; Indexing Readiness
                  </h2>
                  <ul className="space-y-2 text-[#A9B2BE]">
                    <li>Canonical URLs &amp; dynamic per-route metadata: Active</li>
                    <li>hreflang Alternates (en, ur, ar, x-default): Configured</li>
                    <li>XML Sitemap (/sitemap.xml) &amp; Robots (/robots.txt): Published</li>
                    <li>Organization Schema.org JSON-LD (no fake ratings): Active</li>
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
