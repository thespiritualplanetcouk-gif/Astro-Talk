import React, { useEffect, useMemo, useState } from 'react';
import { X, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useBooking } from '../context/BookingContext';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES } from '../data/services';
import { EXPERTS } from '../data/experts';
import {
  COMMON_TIMEZONES,
  INTERNATIONAL_COUNTRIES,
  SUPPORTED_CURRENCIES,
  formatTimeInZone,
} from '../utils/international';
import type { ConsultationMethod, CurrencyCode, Language } from '../types';

export function BookingModal() {
  const { isOpen, prefill, closeBooking } = useBooking();
  const { lang, t, loc } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+44');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [serviceSlug, setServiceSlug] = useState(SERVICES[0].slug);
  const [expertSlug, setExpertSlug] = useState('any-specialist');
  const [consultationLang, setConsultationLang] = useState<Language>(lang);
  const [consultationType, setConsultationType] = useState<ConsultationMethod>('whatsapp');
  const [timeZone, setTimeZone] = useState('Europe/London');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().slice(0, 10);
  });
  const [preferredTime, setPreferredTime] = useState('18:00');
  const [currency, setCurrency] = useState<CurrencyCode>('GBP');
  const [notes, setNotes] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    utcTimestamp: string;
    customerTimeZone: string;
    storageNotice: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      setConfirmation(null);
      if (prefill.serviceSlug) setServiceSlug(prefill.serviceSlug);
      if (prefill.expertSlug) setExpertSlug(prefill.expertSlug);
      else setExpertSlug('any-specialist');
      if (prefill.language) setConsultationLang(prefill.language);
      else setConsultationLang(lang);
      if (prefill.consultationType) setConsultationType(prefill.consultationType);

      // Detect browser timezone if available
      try {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (detected && COMMON_TIMEZONES.some((tz) => tz.value === detected)) {
          setTimeZone(detected);
        }
      } catch {
        // Keep default
      }
    }
  }, [isOpen, prefill, lang]);

  const selectedExpert = useMemo(
    () => EXPERTS.find((e) => e.slug === expertSlug) ?? null,
    [expertSlug]
  );

  // Convert local date/time approximation to UTC preview + PKT comparison
  const previewDates = useMemo(() => {
    const combined = new Date(`${preferredDate}T${preferredTime || '12:00'}:00`);
    if (Number.isNaN(combined.getTime())) return null;
    return {
      isoUtc: combined.toISOString(),
      pktPreview: formatTimeInZone(combined, 'Asia/Karachi'),
      localPreview: formatTimeInZone(combined, timeZone),
    };
  }, [preferredDate, preferredTime, timeZone]);

  const handleCountryChange = (dial: string) => {
    setCountryCode(dial);
    const match = INTERNATIONAL_COUNTRIES.find((c) => c.dialCode === dial);
    if (match) {
      setTimeZone(match.defaultTimeZone);
      setCurrency(match.defaultCurrency);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!consentAccepted) {
      setErrorMsg('Please confirm privacy and consultation consent before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/consultations/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          countryCode,
          phoneNumber,
          email,
          serviceSlug,
          expertSlug,
          language: consultationLang,
          consultationType,
          customerTimeZone: timeZone,
          preferredLocalDateTime: `${preferredDate} ${preferredTime}`,
          utcTimestamp: previewDates?.isoUtc ?? new Date().toISOString(),
          currency,
          notes,
          consentAccepted,
          website: honeypot,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || 'Could not submit request. Please review your details.');
      } else {
        setConfirmation({
          reference: data.reference,
          utcTimestamp: data.utcTimestamp,
          customerTimeZone: data.customerTimeZone,
          storageNotice: data.storageNotice,
        });
      }
    } catch {
      setErrorMsg('Connection error while submitting your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#15243A]/60 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-2xl bg-[#FAF8F2] border border-[#C6A15B]/50 shadow-2xl sm:my-8 max-h-[92vh] overflow-y-auto text-[#26332D]"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-5 sm:p-6 bg-[#164E3C] text-white border-b border-[#C6A15B]/40">
              <div>
                <h2
                  id="booking-modal-title"
                  className="font-display text-2xl sm:text-3xl font-semibold text-white"
                >
                  {t.booking.modalTitle}
                </h2>
                <p className="text-xs text-[#EAD9AD] mt-1">{t.booking.modalSubtitle}</p>
              </div>
              <button
                type="button"
                onClick={closeBooking}
                aria-label="Close modal"
                className="p-2 text-[#EAD9AD] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {confirmation ? (
                <div className="py-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-7 h-7 text-[#164E3C] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-2xl text-[#15243A] font-semibold">
                        {t.booking.successTitle}
                      </h3>
                      <p className="text-sm text-[#4A5A53] mt-2 leading-relaxed">
                        {t.booking.successBody}
                      </p>
                    </div>
                  </div>

                  <dl className="border border-[#C6A15B]/40 bg-white p-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#6E7E77]">{t.booking.referenceLabel}</dt>
                      <dd className="tabular-nums-mono font-semibold text-[#164E3C]">
                        {confirmation.reference}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#6E7E77]">{t.booking.utcStoredLabel}</dt>
                      <dd className="tabular-nums-mono text-[#26332D]">
                        {confirmation.utcTimestamp}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#6E7E77]">{t.booking.timeZone}</dt>
                      <dd className="text-[#26332D]">{confirmation.customerTimeZone}</dd>
                    </div>
                  </dl>

                  <p className="text-xs text-[#6E7E77]">{confirmation.storageNotice}</p>

                  <button
                    type="button"
                    onClick={closeBooking}
                    className="w-full py-3.5 px-6 bg-[#164E3C] text-white font-semibold text-sm hover:bg-[#26745A] transition-colors cursor-pointer"
                  >
                    {t.booking.closeButton}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field hidden from legitimate users */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="booking-website">Website</label>
                    <input
                      id="booking-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Fee Transparency Banner when specialist selected */}
                  {selectedExpert && (
                    <div className="p-4 bg-[#F1F5EF] border border-[#164E3C]/25 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                      <div>
                        <span className="text-[#164E3C] font-semibold block">
                          {t.booking.feeDisclosure}
                        </span>
                        <span className="text-[#4A5A53]">
                          {loc(selectedExpert.name)} · {selectedExpert.sessionDurationMinutes} min
                        </span>
                      </div>
                      <span className="tabular-nums-mono text-base font-semibold text-[#15243A]">
                        PKR {selectedExpert.feePkr.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {errorMsg && (
                    <div
                      role="alert"
                      className="p-3.5 text-xs bg-red-50 border border-red-300 text-red-900"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-name">
                        {t.booking.fullName} *
                      </label>
                      <input
                        id="bk-name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-email">
                        {t.booking.emailOptional}
                      </label>
                      <input
                        id="bk-email"
                        type="email"
                        maxLength={120}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* International Calling Code + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-5">
                      <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-code">
                        {t.booking.countryCode} *
                      </label>
                      <select
                        id="bk-code"
                        value={countryCode}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                      >
                        {INTERNATIONAL_COUNTRIES.map((c) => (
                          <option key={`${c.iso}-${c.dialCode}`} value={c.dialCode}>
                            {c.name} ({c.dialCode})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-7">
                      <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-phone">
                        {t.booking.phoneNumber} *
                      </label>
                      <input
                        id="bk-phone"
                        type="tel"
                        required
                        placeholder="7700 900123"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm tabular-nums-mono bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Service & Specialist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-service">
                        {t.booking.service}
                      </label>
                      <select
                        id="bk-service"
                        value={serviceSlug}
                        onChange={(e) => setServiceSlug(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                      >
                        {SERVICES.map((svc) => (
                          <option key={svc.slug} value={svc.slug}>
                            {loc(svc.title)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-expert">
                        {t.booking.specialist}
                      </label>
                      <select
                        id="bk-expert"
                        value={expertSlug}
                        onChange={(e) => setExpertSlug(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                      >
                        <option value="any-specialist">{t.booking.anySpecialist}</option>
                        {EXPERTS.map((exp) => (
                          <option key={exp.slug} value={exp.slug}>
                            {loc(exp.name)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Language & Method */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-lang">
                        {t.booking.language}
                      </label>
                      <select
                        id="bk-lang"
                        value={consultationLang}
                        onChange={(e) => setConsultationLang(e.target.value as Language)}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                      >
                        <option value="en">{t.common.english}</option>
                        <option value="ur">{t.common.urdu}</option>
                        <option value="ar">{t.common.arabic}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-method">
                        {t.booking.method}
                      </label>
                      <select
                        id="bk-method"
                        value={consultationType}
                        onChange={(e) => setConsultationType(e.target.value as ConsultationMethod)}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                      >
                        <option value="whatsapp">{t.finder.types.whatsapp}</option>
                        <option value="phone">{t.finder.types.phone}</option>
                        <option value="appointment">{t.finder.types.appointment}</option>
                      </select>
                    </div>
                  </div>

                  {/* Time Zone, Date, Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-6">
                      <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-tz">
                        {t.booking.timeZone}
                      </label>
                      <select
                        id="bk-tz"
                        value={timeZone}
                        onChange={(e) => setTimeZone(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                      >
                        {COMMON_TIMEZONES.map((tz) => (
                          <option key={tz.value} value={tz.value}>
                            {tz.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-date">
                        {t.booking.preferredDate}
                      </label>
                      <input
                        id="bk-date"
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm tabular-nums-mono bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-time">
                        {t.booking.preferredTime}
                      </label>
                      <input
                        id="bk-time"
                        type="time"
                        required
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm tabular-nums-mono bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                      />
                    </div>
                  </div>

                  {previewDates && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-[#4A5A53] bg-[#F1F5EF] px-3.5 py-2.5 border border-[#C6A15B]/30">
                      <span className="inline-flex items-center gap-1.5 text-[#164E3C] font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
                        PKT: {previewDates.pktPreview}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums-mono">UTC: {previewDates.isoUtc.slice(0, 16).replace('T', ' ')}Z</span>
                    </div>
                  )}

                  {/* Currency Preference */}
                  <div>
                    <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-curr">
                      {t.booking.currencyPreference}
                    </label>
                    <select
                      id="bk-curr"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                    >
                      {SUPPORTED_CURRENCIES.map((cur) => (
                        <option key={cur.code} value={cur.code}>
                          {cur.code} — {cur.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-[#6E7E77] mt-1.5 leading-relaxed">
                      {t.booking.currencyNote}
                    </p>
                  </div>

                  {/* Confidential Notes */}
                  <div>
                    <label className="block text-xs font-medium text-[#26332D] mb-1.5" htmlFor="bk-notes">
                      {t.booking.notesLabel}
                    </label>
                    <textarea
                      id="bk-notes"
                      rows={3}
                      maxLength={800}
                      placeholder={t.booking.notesPlaceholder}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#C6A15B]/40 text-[#26332D] placeholder:text-[#6E7E77] focus:border-[#164E3C] focus:outline-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <label className="flex items-start gap-3 text-xs text-[#26332D] cursor-pointer leading-relaxed">
                    <input
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      className="mt-1 accent-[#164E3C] w-4 h-4 shrink-0"
                    />
                    <span>{t.booking.consentText}</span>
                  </label>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-[#6E7E77]">
                      <ShieldCheck className="w-4 h-4 text-[#164E3C] shrink-0" />
                      <span>HTTPS · Private Handling</span>
                    </span>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3.5 bg-[#164E3C] text-white font-semibold text-sm hover:bg-[#26745A] disabled:opacity-60 transition-colors cursor-pointer"
                    >
                      {submitting ? t.booking.submitting : t.booking.submitButton}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
