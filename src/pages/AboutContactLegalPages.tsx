import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail, MessageCircle, MessageSquare, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useChat } from '../context/ChatContext';
import { ASSETS } from '../data/services';
import { EditorialImage } from '../components/EditorialImage';
import { SeoHead } from '../components/SeoHead';
import { buildWhatsAppUrl, INTERNATIONAL_COUNTRIES } from '../utils/international';

export function AboutPage() {
  const { t, lang } = useLanguage();
  const { openBooking } = useBooking();
  const { openChat } = useChat();

  return (
    <div className="pt-24 pb-24 bg-[#FAF8F2] text-[#26332D] min-h-screen">
      <SeoHead
        title="About ASTROTALK PK — International Consultation Charter"
        description="Learn how ASTROTALK PK serves overseas Pakistanis and international clients with specialist separation, privacy standards, and multilingual accessibility."
      />
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-[#C6A15B]/30">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#164E3C]">
              {t.nav.aboutUs}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#15243A] leading-tight">
              An International Consultation Standard Rooted in Pakistan.
            </h1>
            <p className="text-base text-[#4B5C55] leading-relaxed">
              ASTROTALK PK was conceived to replace fragmented, opaque spiritual websites with a
              transparent, dignified hybrid consultation marketplace built specifically for
              Pakistani expatriates across the UK, Europe, USA, Canada, Australia, UAE, Saudi
              Arabia, and Pakistan.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden border border-[#C6A15B]/40 rounded-sm shadow-md">
              <EditorialImage
                src={ASSETS.spiritual}
                alt="Quiet sanctuary courtyard architecture"
                className="w-full h-full object-cover"
                fallbackTitle="ASTROTALK PK"
              />
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: 'Clear Disciplinary Separation',
              body: 'We strictly distinguish classical astronomical astrology from Quran & Sunnah-based spiritual guidance. Each discipline is served by separate specialists and clear editorial context.',
            },
            {
              num: '02',
              title: 'Administrator-Curated Marketplace',
              body: 'Every live specialist profile undergoes structured qualification, language, and fee transparency review prior to publication—never unverified anonymous listings.',
            },
            {
              num: '03',
              title: 'Dignity, Privacy & Honest Language',
              body: 'We reject fear-mongering, fabricated testimonials, and guaranteed-result marketing. Clients receive respectful listening, transparent base fees, and confidential handling.',
            },
          ].map((item) => (
            <div
              key={item.num}
              className="p-7 bg-white border border-[#C6A15B]/35 space-y-3 rounded-sm shadow-xs"
            >
              <span className="tabular-nums-mono text-xs font-semibold text-[#C6A15B]">
                {item.num}
              </span>
              <h2 className="font-display text-2xl font-semibold text-[#15243A]">{item.title}</h2>
              <p className="text-sm text-[#566760] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="p-8 bg-[#164E3C] text-white border border-[#C6A15B]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-sm shadow-sm">
          <div>
            <h2 className="font-display text-3xl text-white">
              Speak With Our Central Coordination Desk
            </h2>
            <p className="text-sm text-[#DCE7E1] mt-2">
              Need help deciding between Istikhara education, Rohani guidance, classical astrology,
              or family counselling?
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={openChat}
              className="min-h-[44px] px-5 py-3 border border-[#EAD9AD]/60 text-[#FAF8F2] font-semibold text-sm hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer rounded-sm"
            >
              {t.hero.chatCta}
            </button>
            <button
              type="button"
              onClick={() => openBooking({ language: lang })}
              className="min-h-[44px] px-6 py-3 bg-[#C6A15B] text-[#15243A] font-semibold text-sm hover:bg-[#EAD9AD] transition-colors whitespace-nowrap cursor-pointer rounded-sm"
            >
              {t.nav.bookConsultation}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export function ContactPage() {
  const { lang, t } = useLanguage();
  const { openChat, supportOnline } = useChat();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+44');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [topic, setTopic] = useState('Choosing the Right Service');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const centralWa = buildWhatsAppUrl(
    '923000000000',
    'Assalam-o-Alaikum ASTROTALK PK Support, I have a general enquiry.'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          countryCode,
          phoneNumber,
          topic,
          language: lang,
          message,
          website,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Please check your message and try again.');
      } else {
        setReference(data.reference);
      }
    } catch {
      setError('Unable to reach server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full h-11 px-3.5 text-sm bg-[#FAF8F2] border border-[#C6A15B]/45 text-[#15243A] focus:border-[#164E3C] focus:outline-none rounded-sm';

  return (
    <div className="pt-24 pb-24 bg-[#FAF8F2] text-[#26332D] min-h-screen">
      <SeoHead
        title="Contact ASTROTALK PK — Central International Support"
        description="Reach our central coordination desk in English, Urdu, or Arabic via live chat, secure contact form, or WhatsApp from the UK, Europe, USA, Canada, Australia, UAE, Saudi Arabia, or Pakistan."
      />
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl pb-10 border-b border-[#C6A15B]/30">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#164E3C] mb-3">
            {t.nav.contactUs}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#15243A]">
            Central Coordination &amp; Enquiries
          </h1>
          <p className="text-base text-[#566760] mt-3 leading-relaxed">
            Questions about specialist availability, international time zones, specialist
            onboarding, or privacy? Send a confidential message below.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 bg-white border border-[#C6A15B]/40 shadow-sm p-6 sm:p-8 rounded-sm">
            {reference ? (
              <div className="py-8 space-y-5">
                <CheckCircle2 className="w-8 h-8 text-[#164E3C]" />
                <h2 className="font-display text-3xl text-[#15243A]">Enquiry Recorded</h2>
                <p className="text-sm text-[#566760] leading-relaxed">
                  Thank you for contacting ASTROTALK PK. Your message has been validated and logged
                  with our central coordination desk.
                </p>
                <p className="tabular-nums-mono text-sm font-semibold text-[#164E3C]">
                  Reference: {reference}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReference(null);
                    setMessage('');
                  }}
                  className="px-5 py-2.5 bg-[#164E3C] text-white text-xs font-semibold cursor-pointer rounded-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="hidden" aria-hidden="true">
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="p-3.5 text-xs bg-red-50 border border-red-200 text-red-800 rounded-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ct-name" className="block text-xs font-semibold text-[#164E3C] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="ct-name"
                      required
                      minLength={2}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="ct-email" className="block text-xs font-semibold text-[#164E3C] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="ct-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-5">
                    <label htmlFor="ct-code" className="block text-xs font-semibold text-[#164E3C] mb-1.5">
                      Country Code
                    </label>
                    <select
                      id="ct-code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className={inputClass}
                    >
                      {INTERNATIONAL_COUNTRIES.map((c) => (
                        <option key={`${c.iso}-${c.dialCode}`} value={c.dialCode}>
                          {c.name} ({c.dialCode})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-7">
                    <label htmlFor="ct-phone" className="block text-xs font-semibold text-[#164E3C] mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      id="ct-phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`${inputClass} tabular-nums-mono`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ct-topic" className="block text-xs font-semibold text-[#164E3C] mb-1.5">
                    Enquiry Topic
                  </label>
                  <select
                    id="ct-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={inputClass}
                  >
                    <option>Choosing the Right Service</option>
                    <option>International Time Zone / Scheduling Support</option>
                    <option>Specialist Application &amp; Verification</option>
                    <option>Privacy &amp; Data Protection</option>
                    <option>General Platform Enquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ct-msg" className="block text-xs font-semibold text-[#164E3C] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="ct-msg"
                    rows={5}
                    required
                    minLength={10}
                    maxLength={1200}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 text-sm bg-[#FAF8F2] border border-[#C6A15B]/45 text-[#15243A] focus:border-[#164E3C] focus:outline-none rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="min-h-[44px] px-7 py-3 bg-[#164E3C] text-white font-semibold text-sm hover:bg-[#26745A] disabled:opacity-60 transition-colors cursor-pointer rounded-sm"
                >
                  {submitting ? 'Sending...' : 'Send Confidential Enquiry'}
                </button>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-white border border-[#C6A15B]/35 space-y-4 rounded-sm shadow-sm">
              <h2 className="font-display text-2xl font-semibold text-[#15243A]">Direct Channels</h2>

              <button
                type="button"
                onClick={openChat}
                className="w-full flex items-center justify-between gap-3 p-4 bg-[#164E3C] text-white border border-[#C6A15B]/40 text-sm hover:bg-[#26745A] transition-colors cursor-pointer rounded-sm text-start"
              >
                <span className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-[#EAD9AD] shrink-0" />
                  <span>
                    <strong className="block font-semibold">Live Support Chat</strong>
                    <span className="text-xs text-[#DCE7E1]">
                      {supportOnline
                        ? 'Support Desk Online Now'
                        : 'Leave a message or continue on WhatsApp'}
                    </span>
                  </span>
                </span>
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    supportOnline ? 'bg-emerald-400 animate-status-pulse' : 'bg-[#EAD9AD]/70'
                  }`}
                />
              </button>

              <a
                href={centralWa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-[#F1F5EF] border border-[#164E3C]/25 text-sm font-medium text-[#164E3C] hover:bg-[#E7F0E4] transition-colors rounded-sm"
              >
                <MessageCircle className="w-5 h-5 text-[#164E3C] shrink-0" />
                <span>{t.footer.centralSupport}</span>
              </a>

              <a
                href="mailto:support@astrotalkpk.com"
                className="flex items-center gap-3 p-4 bg-[#FAF8F2] border border-[#C6A15B]/35 text-sm text-[#26332D] hover:border-[#164E3C] transition-colors rounded-sm"
              >
                <Mail className="w-5 h-5 text-[#C6A15B] shrink-0" />
                <span>support@astrotalkpk.com</span>
              </a>
            </div>

            <div className="p-6 bg-[#F1F5EF] border border-[#164E3C]/20 space-y-3 text-xs text-[#26332D] leading-relaxed rounded-sm">
              <div className="flex items-center gap-2 text-[#164E3C] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Privacy Commitment</span>
              </div>
              <p>
                We never expose private customer phone numbers, birth details, or enquiry notes
                publicly. Review our full{' '}
                <Link to="/privacy" className="text-[#164E3C] font-semibold underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export function LegalPage({ type }: { type: 'privacy' | 'terms' | 'disclaimer' }) {
  const content = {
    privacy: {
      title: 'Privacy Policy & Data Protection',
      subtitle: 'How ASTROTALK PK safeguards customer consultation details and birth information.',
      sections: [
        {
          h: '1. Confidential Handling of Personal & Birth Data',
          p: 'Birth dates, birth times, birth locations, phone numbers, and consultation notes submitted through our forms are strictly private. Interactive tools such as the Birth Chart, Abjad, and Hijri calculators compute results locally in your browser without publishing or exposing your inputs.',
        },
        {
          h: '2. International Time-Zone Storage & Consent',
          p: 'Appointment requests are normalized to Coordinated Universal Time (UTC) with explicit client consent so specialists and clients across the UK, Europe, North America, Australia, the Gulf, and Pakistan share unambiguous schedules.',
        },
        {
          h: '3. Zero Sale or Public Disclosure',
          p: 'ASTROTALK PK never sells client contact lists or publishes consultation topics. Client reviews are only published with explicit written permission and optional anonymization.',
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Transparent rules governing marketplace consultations, scheduling, and fees.',
      sections: [
        {
          h: '1. Hybrid Marketplace Structure',
          p: 'ASTROTALK PK connects clients with independent specialists approved by platform administration across distinct categories of classical astrology, Islamic spiritual guidance, and family counselling.',
        },
        {
          h: '2. Upfront Consultation Fees',
          p: 'Base consultation fees and session durations are disclosed transparently on each specialist profile prior to confirmation. Multi-currency payment conversion requires an integrated exchange-rate provider and will always be confirmed before payment.',
        },
        {
          h: '3. Scheduling & Cancellation Courtesy',
          p: 'Clients are encouraged to select accurate local time zones when requesting appointments and notify specialists at least 12 hours ahead of rescheduling requests.',
        },
      ],
    },
    disclaimer: {
      title: 'Ethical Charter & Responsible Content Disclaimer',
      subtitle: 'Clear distinction between classical astrology, Islamic guidance, and professional care.',
      sections: [
        {
          h: '1. Separation of Astrology and Islamic Religious Teachings',
          p: 'ASTROTALK PK maintains an unambiguous separation between classical astrology / numerology (traditional symbolic studies) and Islamic spiritual guidance (Salat al-Istikhara, authentic Quranic Ruqyah, and Prophetic Adhkar). We never present astrological interpretations as Islamic religious rulings.',
        },
        {
          h: '2. No Guaranteed Outcomes or Certainty of the Unseen',
          p: 'No specialist on ASTROTALK PK promises guaranteed cures, guaranteed marriage outcomes, certain removal of black magic, or infallible predictions of the future. Istikhara is presented strictly as a Sunnah act of seeking goodness from Allah—never fortune-telling.',
        },
        {
          h: '3. Not a Substitute for Medical, Psychological, or Legal Services',
          p: 'Consultations offer personal, cultural, and spiritual reflection. For physical health conditions, clinical mental health emergencies, domestic safety risks, or legal disputes, please seek qualified licensed professionals in your country of residence.',
        },
      ],
    },
  }[type];

  return (
    <div className="pt-24 pb-24 bg-[#FAF8F2] text-[#26332D] min-h-screen">
      <SeoHead title={content.title} description={content.subtitle} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        <header className="pb-8 border-b border-[#C6A15B]/30">
          <p className="text-xs tracking-[0.16em] uppercase text-[#164E3C] font-semibold mb-2">
            ASTROTALK PK Governance
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#15243A]">
            {content.title}
          </h1>
          <p className="text-base text-[#566760] mt-3">{content.subtitle}</p>
        </header>

        <div className="space-y-8">
          {content.sections.map((s) => (
            <section
              key={s.h}
              className="p-6 bg-white border border-[#C6A15B]/30 space-y-2.5 rounded-sm shadow-xs"
            >
              <h2 className="font-display text-2xl font-semibold text-[#15243A]">{s.h}</h2>
              <p className="text-sm sm:text-base text-[#26332D] leading-[1.85]">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
