import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { ASSETS } from '../data/services';
import { EditorialImage } from '../components/EditorialImage';
import { SeoHead } from '../components/SeoHead';
import { buildWhatsAppUrl, INTERNATIONAL_COUNTRIES } from '../utils/international';

export function AboutPage() {
  const { t, lang } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <div className="pt-24 pb-20 bg-[#091426] min-h-screen">
      <SeoHead
        title="About ASTROTALK PK — International Consultation Charter"
        description="Learn how ASTROTALK PK serves overseas Pakistanis and international clients with specialist separation, privacy standards, and multilingual accessibility."
      />
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-[#C6A35A]/20">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A]">
              {t.nav.aboutUs}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F6F2E9] leading-tight">
              An International Consultation Standard Rooted in Pakistan.
            </h1>
            <p className="text-base text-[#C7D0DC] leading-relaxed">
              ASTROTALK PK was conceived to replace fragmented, opaque spiritual websites with a
              transparent, dignified hybrid consultation marketplace built specifically for
              Pakistani expatriates across the UK, Europe, USA, Canada, Australia, UAE, Saudi
              Arabia, and Pakistan.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden border border-[#C6A35A]/30">
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
            <div key={item.num} className="p-7 bg-[#0C192F] border border-[#C6A35A]/20 space-y-3">
              <span className="tabular-nums-mono text-xs text-[#C6A35A]">{item.num}</span>
              <h2 className="font-display text-2xl font-semibold text-[#F6F2E9]">{item.title}</h2>
              <p className="text-sm text-[#A9B2BE] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="p-8 bg-[#0C3028]/60 border border-[#C6A35A]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl text-[#F6F2E9]">
              Speak With Our Central Coordination Desk
            </h2>
            <p className="text-sm text-[#C7D4CE] mt-2">
              Need help deciding between Istikhara education, Rohani guidance, classical astrology,
              or family counselling?
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBooking({ language: lang })}
            className="px-6 py-3.5 bg-[#C6A35A] text-[#091426] font-semibold text-sm hover:bg-[#E5CD91] transition-colors whitespace-nowrap cursor-pointer"
          >
            {t.nav.bookConsultation}
          </button>
        </section>
      </div>
    </div>
  );
}

export function ContactPage() {
  const { lang, t } = useLanguage();
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

  return (
    <div className="pt-24 pb-20 bg-[#091426] min-h-screen">
      <SeoHead
        title="Contact ASTROTALK PK — Central International Support"
        description="Reach our central coordination desk in English, Urdu, or Arabic via secure contact form or WhatsApp from the UK, Europe, USA, Canada, Australia, UAE, Saudi Arabia, or Pakistan."
      />
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl pb-10 border-b border-[#C6A35A]/20">
          <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A] mb-3">
            {t.nav.contactUs}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F6F2E9]">
            Central Coordination &amp; Enquiries
          </h1>
          <p className="text-base text-[#A9B2BE] mt-3 leading-relaxed">
            Questions about specialist availability, international time zones, specialist
            onboarding, or privacy? Send a confidential message below.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 bg-[#0C192F] border border-[#C6A35A]/25 p-6 sm:p-8">
            {reference ? (
              <div className="py-8 space-y-5">
                <CheckCircle2 className="w-8 h-8 text-[#E5CD91]" />
                <h2 className="font-display text-3xl text-[#F6F2E9]">Enquiry Recorded</h2>
                <p className="text-sm text-[#A9B2BE] leading-relaxed">
                  Thank you for contacting ASTROTALK PK. Your message has been validated and logged
                  with our central coordination desk.
                </p>
                <p className="tabular-nums-mono text-sm text-[#E5CD91]">Reference: {reference}</p>
                <button
                  type="button"
                  onClick={() => {
                    setReference(null);
                    setMessage('');
                  }}
                  className="px-5 py-2.5 bg-[#C6A35A] text-[#091426] text-xs font-semibold cursor-pointer"
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
                  <div className="p-3.5 text-xs bg-[#3A161A] border border-[#E07A7A]/40 text-[#F6D6D6]">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ct-name" className="block text-xs text-[#D6DCE5] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="ct-name"
                      required
                      minLength={2}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-11 px-3.5 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9]"
                    />
                  </div>
                  <div>
                    <label htmlFor="ct-email" className="block text-xs text-[#D6DCE5] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="ct-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-3.5 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-5">
                    <label htmlFor="ct-code" className="block text-xs text-[#D6DCE5] mb-1.5">
                      Country Code
                    </label>
                    <select
                      id="ct-code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full h-11 px-3 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9]"
                    >
                      {INTERNATIONAL_COUNTRIES.map((c) => (
                        <option key={`${c.iso}-${c.dialCode}`} value={c.dialCode}>
                          {c.name} ({c.dialCode})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-7">
                    <label htmlFor="ct-phone" className="block text-xs text-[#D6DCE5] mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      id="ct-phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full h-11 px-3.5 text-sm tabular-nums-mono bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ct-topic" className="block text-xs text-[#D6DCE5] mb-1.5">
                    Enquiry Topic
                  </label>
                  <select
                    id="ct-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full h-11 px-3 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9]"
                  >
                    <option>Choosing the Right Service</option>
                    <option>International Time Zone / Scheduling Support</option>
                    <option>Specialist Application &amp; Verification</option>
                    <option>Privacy &amp; Data Protection</option>
                    <option>General Platform Enquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ct-msg" className="block text-xs text-[#D6DCE5] mb-1.5">
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
                    className="w-full p-3.5 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-7 py-3.5 bg-[#C6A35A] text-[#091426] font-semibold text-sm hover:bg-[#E5CD91] disabled:opacity-60 transition-colors cursor-pointer"
                >
                  {submitting ? 'Sending...' : 'Send Confidential Enquiry'}
                </button>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[#0C192F] border border-[#C6A35A]/20 space-y-4">
              <h2 className="font-display text-2xl text-[#F6F2E9]">Direct Channels</h2>
              <a
                href={centralWa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-[#0C3028] border border-[#C6A35A]/30 text-sm text-[#F6F2E9] hover:bg-[#123D32] transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-[#E5CD91] shrink-0" />
                <span>{t.footer.centralSupport}</span>
              </a>
              <a
                href="mailto:support@astrotalkpk.com"
                className="flex items-center gap-3 p-4 bg-[#091426] border border-[#C6A35A]/20 text-sm text-[#D6DCE5] hover:border-[#E5CD91] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#C6A35A] shrink-0" />
                <span>support@astrotalkpk.com</span>
              </a>
            </div>

            <div className="p-6 bg-[#0C192F] border border-[#C6A35A]/20 space-y-3 text-xs text-[#A9B2BE] leading-relaxed">
              <div className="flex items-center gap-2 text-[#E5CD91] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Privacy Commitment</span>
              </div>
              <p>
                We never expose private customer phone numbers, birth details, or enquiry notes
                publicly. Review our full{' '}
                <Link to="/privacy" className="text-[#E5CD91] underline">
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
    <div className="pt-24 pb-20 bg-[#F6F2E9] text-[#091426] min-h-screen">
      <SeoHead title={content.title} description={content.subtitle} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        <header className="pb-8 border-b border-[#091426]/15">
          <p className="text-xs tracking-[0.16em] uppercase text-[#0C3028] font-semibold mb-2">
            ASTROTALK PK Governance
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#091426]">
            {content.title}
          </h1>
          <p className="text-base text-[#364457] mt-3">{content.subtitle}</p>
        </header>

        <div className="space-y-8">
          {content.sections.map((s) => (
            <section key={s.h} className="space-y-2.5">
              <h2 className="font-display text-2xl font-semibold text-[#091426]">{s.h}</h2>
              <p className="text-sm sm:text-base text-[#243244] leading-[1.85]">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
