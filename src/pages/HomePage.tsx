import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Search,
  ShieldCheck,
  BookOpen,
  MessageCircle,
  Phone,
  Users,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useChat } from '../context/ChatContext';
import { SERVICES } from '../data/services';
import { EXPERTS } from '../data/experts';
import { ZODIAC_SIGNS } from '../data/zodiac';
import { KNOWLEDGE_ARTICLES, TOOLS_CATALOG } from '../data/knowledge';
import {
  CENTRAL_PHONE_NUMBER,
  CENTRAL_WHATSAPP_NUMBER,
  EXPERT_DISCOVERY_CATEGORIES,
} from '../data/homepageContent';
import { calculateCosmicSnapshot } from '../utils/astronomy';
import { buildWhatsAppUrl } from '../utils/international';
import { HeroSlider } from '../components/HeroSlider';
import { CategorizedServicesSection } from '../components/CategorizedServicesSection';
import { CelestialBackdrop } from '../components/CelestialBackdrop';
import { ZodiacWheel } from '../components/ZodiacWheel';
import { MoonPhaseVisual } from '../components/MoonPhaseVisual';
import { InternationalMap } from '../components/InternationalMap';
import { ExpertCard } from '../components/ExpertCard';
import { EditorialImage } from '../components/EditorialImage';
import { InteractiveTiltCard } from '../components/InteractiveTiltCard';
import { QuranInspirationSection } from '../components/QuranInspirationSection';
import { SeoHead } from '../components/SeoHead';
import type { ConsultationMethod, Language } from '../types';

export function HomePage() {
  const { lang, t, loc } = useLanguage();
  const { openBooking } = useBooking();
  const { openChat } = useChat();
  const navigate = useNavigate();

  // Quick Consultation Finder state
  const [finderService, setFinderService] = useState<string>('');
  const [finderLang, setFinderLang] = useState<Language>(lang);
  const [finderType, setFinderType] = useState<ConsultationMethod>('whatsapp');

  // Expert Discovery & inline filters
  const [expService, setExpService] = useState<string>('all');
  const [expLang, setExpLang] = useState<string>('all');
  const [expQuery, setExpQuery] = useState<string>('');

  // Interactive Zodiac / Daily Horoscope wheel state
  const [selectedZodiacSlug, setSelectedZodiacSlug] = useState<string>('sagittarius');
  const activeZodiac = useMemo(
    () => ZODIAC_SIGNS.find((z) => z.slug === selectedZodiacSlug) ?? ZODIAC_SIGNS[0],
    [selectedZodiacSlug]
  );

  // Genuine astronomical snapshot computed via astronomy-engine
  const cosmic = useMemo(() => calculateCosmicSnapshot(new Date()), []);

  const filteredExperts = useMemo(() => {
    return EXPERTS.filter((e) => {
      if (expService !== 'all' && !e.serviceSlugs.includes(expService)) return false;
      if (expLang !== 'all' && !e.languages.includes(expLang as Language)) return false;
      if (expQuery.trim()) {
        const q = expQuery.toLowerCase();
        const hay = `${e.name.en} ${e.name.ur} ${e.primarySpeciality.en} ${e.title.en}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }).slice(0, 6);
  }, [expService, expLang, expQuery]);

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (finderType === 'appointment') {
      openBooking({
        serviceSlug: finderService || SERVICES[0].slug,
        language: finderLang,
        consultationType: 'appointment',
      });
      return;
    }
    const params = new URLSearchParams();
    if (finderService) params.set('service', finderService);
    if (finderLang) params.set('langFilter', finderLang);
    if (finderType) params.set('method', finderType);
    navigate(`/experts?${params.toString()}`);
  };

  const moonPhaseLocalized =
    lang === 'ur'
      ? cosmic.moonPhase.phaseNameUr
      : lang === 'ar'
        ? cosmic.moonPhase.phaseNameAr
        : cosmic.moonPhase.phaseNameEn;

  const centralWaHref = buildWhatsAppUrl(
    CENTRAL_WHATSAPP_NUMBER,
    'Assalam-o-Alaikum ASTROTALK PK, I would like to speak with a consultation specialist.'
  );

  return (
    <>
      <SeoHead
        title="ASTROTALK PK — International Astrology, Istikhara & Spiritual Guidance Platform"
        description="Check Today's Horoscope, create your Free Birth Chart, or connect privately with experienced specialists in Astrology, Online Istikhara, Rohani Guidance, Marriage & Family Counselling in English, Urdu, and Arabic."
      />

      {/* SECTION 1: FULL-WIDTH RESPONSIVE HERO SLIDER + 6-ACTION CONVERSION STRIP */}
      <HeroSlider />

      {/* SECTION 2: QUICK CONSULTATION FINDER (DEEP EMERALD ANCHOR) */}
      <section className="py-12 lg:py-14 bg-[#FAF8F2]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#164E3C] border border-[#C6A15B]/50 p-6 sm:p-8 shadow-[0_24px_50px_-24px_rgba(22,78,60,0.42)] islamic-lattice-bg">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-6 border-b border-[#C6A15B]/25">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                  {t.finder.title}
                </h2>
                <p className="text-sm text-[#D8E5DF] mt-1">{t.finder.subtitle}</p>
              </div>
              <span className="text-xs text-[#EAD9AD] whitespace-nowrap">
                UK · Europe · USA · Canada · Australia · UAE · Saudi Arabia · Pakistan
              </span>
            </div>

            <form
              onSubmit={handleFinderSubmit}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
            >
              <div className="md:col-span-4">
                <label htmlFor="qf-service" className="block text-xs text-[#EAD9AD] mb-2 font-medium">
                  {t.finder.serviceLabel}
                </label>
                <select
                  id="qf-service"
                  value={finderService}
                  onChange={(e) => setFinderService(e.target.value)}
                  className="w-full h-12 px-3.5 text-sm bg-white border border-[#C6A15B]/50 text-[#26332D] focus:border-[#C6A15B] focus:outline-none"
                >
                  <option value="">{t.finder.servicePlaceholder}</option>
                  {SERVICES.map((svc) => (
                    <option key={svc.slug} value={svc.slug}>
                      {loc(svc.title)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label htmlFor="qf-lang" className="block text-xs text-[#EAD9AD] mb-2 font-medium">
                  {t.finder.languageLabel}
                </label>
                <select
                  id="qf-lang"
                  value={finderLang}
                  onChange={(e) => setFinderLang(e.target.value as Language)}
                  className="w-full h-12 px-3.5 text-sm bg-white border border-[#C6A15B]/50 text-[#26332D] focus:border-[#C6A15B] focus:outline-none"
                >
                  <option value="en">{t.common.english}</option>
                  <option value="ur">{t.common.urdu}</option>
                  <option value="ar">{t.common.arabic}</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label htmlFor="qf-type" className="block text-xs text-[#EAD9AD] mb-2 font-medium">
                  {t.finder.typeLabel}
                </label>
                <select
                  id="qf-type"
                  value={finderType}
                  onChange={(e) => setFinderType(e.target.value as ConsultationMethod)}
                  className="w-full h-12 px-3.5 text-sm bg-white border border-[#C6A15B]/50 text-[#26332D] focus:border-[#C6A15B] focus:outline-none"
                >
                  <option value="whatsapp">{t.finder.types.whatsapp}</option>
                  <option value="phone">{t.finder.types.phone}</option>
                  <option value="appointment">{t.finder.types.appointment}</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full h-12 px-5 bg-[#C6A15B] text-[#15243A] font-semibold text-sm hover:bg-[#EAD9AD] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                >
                  {t.finder.searchButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 3: 5 CATEGORIZED SERVICE SECTIONS (ASTROLOGY, ROHANI, MARRIAGE & ISTIKHARA, BUSINESS, HEALTH & WELLBEING) */}
      <CategorizedServicesSection />

      {/* SECTION 4: EXPERT CATEGORY DISCOVERY ("اپنے مسئلے کے مطابق Expert تلاش کریں") + LIVE SPECIALIST DIRECTORY */}
      <section id="expert-discovery" className="py-20 bg-white border-y border-[#EAD9AD]/70">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
                Specialist Marketplace · Transparent Qualifications &amp; Upfront Fees
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#15243A] leading-tight">
                اپنے مسئلے کے مطابق Expert تلاش کریں
              </h2>
              <p className="text-sm sm:text-base text-[#4A5A53] mt-3 leading-relaxed">
                Select a specialist category below to filter experts by discipline, consultation
                language, and availability—or explore the full directory.
              </p>
            </div>
            <Link
              to="/experts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#164E3C] hover:text-[#C6A15B] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.sections.viewAllExperts}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 8 Interactive Expert Category Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10">
            {EXPERT_DISCOVERY_CATEGORIES.map((cat) => {
              const isSelected = expService === cat.serviceSlug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setExpService((prev) => (prev === cat.serviceSlug ? 'all' : cat.serviceSlug))
                  }
                  className={`text-start p-4 border transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                    isSelected
                      ? 'bg-[#164E3C] text-white border-[#164E3C] shadow-sm'
                      : 'bg-[#FAF8F2] text-[#15243A] border-[#C6A15B]/40 hover:border-[#164E3C] hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-display text-lg font-semibold leading-snug">
                      {cat.label}
                    </span>
                    <Users
                      className={`w-4 h-4 shrink-0 mt-1 ${
                        isSelected ? 'text-[#EAD9AD]' : 'text-[#C6A15B]'
                      }`}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span
                      dir="rtl"
                      lang="ur"
                      className={`font-urdu text-xs ${
                        isSelected ? 'text-[#EAD9AD]' : 'text-[#566760]'
                      }`}
                    >
                      {cat.urduSub}
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        isSelected ? 'text-white' : 'text-[#164E3C]'
                      }`}
                    >
                      {isSelected ? 'Active' : 'Filter'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Transparent Editorial Sample Disclosure */}
          <div className="mb-8 px-4 py-3.5 bg-[#F1F5EF] border border-[#164E3C]/20 text-xs text-[#26332D] leading-relaxed">
            {t.sections.sampleNotice}
          </div>

          {/* Interactive Search & Language Filter Controls */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#164E3C] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={expQuery}
                onChange={(e) => setExpQuery(e.target.value)}
                placeholder={t.expertActions.searchPlaceholder}
                className="w-full h-11 ps-10 pe-4 text-sm bg-[#FAF8F2] border border-[#C6A15B]/40 text-[#26332D] placeholder:text-[#6E7E77] focus:border-[#164E3C] focus:outline-none"
              />
            </div>

            <div className="md:col-span-4">
              <select
                aria-label={t.expertActions.filterAllServices}
                value={expService}
                onChange={(e) => setExpService(e.target.value)}
                className="w-full h-11 px-3.5 text-sm bg-[#FAF8F2] border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
              >
                <option value="all">{t.expertActions.filterAllServices}</option>
                {SERVICES.map((svc) => (
                  <option key={svc.slug} value={svc.slug}>
                    {loc(svc.title)}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                aria-label={t.expertActions.filterAllLanguages}
                value={expLang}
                onChange={(e) => setExpLang(e.target.value)}
                className="w-full h-11 px-3.5 text-sm bg-[#FAF8F2] border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
              >
                <option value="all">{t.expertActions.filterAllLanguages}</option>
                <option value="en">{t.common.english}</option>
                <option value="ur">{t.common.urdu}</option>
                <option value="ar">{t.common.arabic}</option>
              </select>
            </div>
          </div>

          {filteredExperts.length === 0 ? (
            <div className="p-10 text-center border border-[#C6A15B]/35 bg-[#FAF8F2]">
              <p className="text-sm text-[#4A5A53]">{t.expertActions.noResults}</p>
              <button
                type="button"
                onClick={() => {
                  setExpService('all');
                  setExpLang('all');
                  setExpQuery('');
                }}
                className="mt-4 px-5 py-2.5 text-xs font-semibold bg-[#164E3C] text-white cursor-pointer"
              >
                {t.expertActions.clearFilters}
              </button>
            </div>
          ) : (
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 no-scrollbar">
              {filteredExperts.map((expert) => (
                <div
                  key={expert.slug}
                  className="shrink-0 w-[85vw] max-w-[340px] md:w-auto md:max-w-none snap-start"
                >
                  <ExpertCard expert={expert} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: AUTHENTIC QURANIC VERSE INSPIRATION SECTION (AR-RA'D 13:28, ASH-SHARH 94:5, AT-TALAQ 65:3, AL-HADID 57:4) */}
      <QuranInspirationSection />

      {/* SECTION 6: TODAY'S HOROSCOPE & INTERACTIVE 12-SIGN ZODIAC WHEEL */}
      <section
        id="zodiac-horoscope"
        className="py-20 bg-[#FAF8F2] border-b border-[#C6A15B]/30 scroll-mt-20"
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
                Aaj Ka Horoscope · Interactive 12-Sign Zodiac Wheel
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#15243A]">
                Aaj Ka Horoscope – آج کا برج اور فلکیاتی رہنمائی
              </h2>
              <p className="text-sm sm:text-base text-[#4A5A53] mt-3">
                Drag or swipe the Zodiac Wheel below—or select your sign—to inspect today&apos;s
                calculated astronomical placements and reflective sign insights.
              </p>
            </div>
            <Link
              to="/tools/birth-chart"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#164E3C] hover:text-[#C6A15B] whitespace-nowrap shrink-0"
            >
              <span>Create My Free Birth Chart</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <ZodiacWheel
                selectedSlug={selectedZodiacSlug}
                onSelect={setSelectedZodiacSlug}
                size="interactive"
                theme="light"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              {/* Selected Sign Daily Horoscope & Reflection Panel */}
              <div className="bg-white border border-[#C6A15B]/45 p-7 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-[#EAD9AD]">
                  <div>
                    <p className="text-xs text-[#164E3C] font-semibold tabular-nums-mono">
                      {activeZodiac.startDegree}° – {activeZodiac.startDegree + 30}° Ecliptic ·{' '}
                      {loc(activeZodiac.dateRange)}
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#15243A] mt-1">
                      <span className="text-[#C6A15B] me-2.5">{activeZodiac.symbol}</span>
                      {loc(activeZodiac.name)}
                    </h3>
                  </div>
                  <div className="text-xs text-[#4A5A53] font-medium">
                    {loc(activeZodiac.element)} · {loc(activeZodiac.modality)} ·{' '}
                    {loc(activeZodiac.rulingPlanet)}
                  </div>
                </div>

                {/* Live Ephemeris Alignment Context */}
                <div className="mt-4 p-3.5 bg-[#F1F5EF] border border-[#164E3C]/15 text-xs text-[#26332D] flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="font-semibold text-[#164E3C]">Today&apos;s Sky Context:</span>
                  <span className="tabular-nums-mono">
                    Sun in {cosmic.sun.position.signSymbol} {cosmic.sun.position.signName} (
                    {cosmic.sun.position.formattedDegree})
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums-mono">
                    Moon in {cosmic.moon.position.signSymbol} {cosmic.moon.position.signName} (
                    {cosmic.moonPhase.illuminationPercent}% Lit)
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#26332D] mt-5 leading-relaxed">
                  {loc(activeZodiac.summary)}
                </p>

                <p className="text-base italic font-display text-[#164E3C] mt-4">
                  “{loc(activeZodiac.reflectionPrompt)}”
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/zodiac/${activeZodiac.slug}`}
                    className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#164E3C] text-white font-semibold text-xs hover:bg-[#26745A] transition-colors"
                  >
                    <span>{t.sections.exploreSign}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      openBooking({
                        serviceSlug: 'astrology',
                        language: lang,
                        initialNote: `Horoscope & chart consultation for ${activeZodiac.name.en}.`,
                      })
                    }
                    className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#FAF8F2] border border-[#C6A15B]/55 text-[#15243A] font-semibold text-xs hover:border-[#164E3C] transition-colors cursor-pointer"
                  >
                    <span>Consult an Astrologer</span>
                  </button>
                </div>
              </div>

              {/* Compact 12-Sign Selector Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {ZODIAC_SIGNS.map((sign) => (
                  <button
                    key={sign.slug}
                    type="button"
                    onClick={() => setSelectedZodiacSlug(sign.slug)}
                    className={`py-2.5 px-2 text-center border transition-all cursor-pointer ${
                      sign.slug === selectedZodiacSlug
                        ? 'bg-[#164E3C] text-white border-[#164E3C] font-semibold'
                        : 'bg-white text-[#26332D] border-[#C6A15B]/35 hover:border-[#164E3C]'
                    }`}
                  >
                    <span className="block text-base leading-none">{sign.symbol}</span>
                    <span className="block text-[11px] mt-1 truncate">{loc(sign.name)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: TODAY'S CALCULATED SKY & LUNAR INSIGHTS (MEASURED COSMIC NAVY CONTRAST SECTION) */}
      <section className="relative py-20 bg-[#15243A] text-[#FAF8F2] overflow-hidden">
        <CelestialBackdrop density="subtle" theme="dark" />
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#EAD9AD] mb-3">
                Live Astronomical Ephemeris
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
                {t.sections.cosmicTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#CBD5E1] mt-3">{t.sections.cosmicSubtitle}</p>
            </div>
            <Link
              to="/tools/birth-chart"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#EAD9AD] hover:underline whitespace-nowrap shrink-0"
            >
              <span>{t.sections.openDetailedSky}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Moon Phase & Primary Luminaries */}
            <div className="lg:col-span-5 bg-[#0D1828]/85 border border-[#C6A15B]/35 p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div className="flex items-center gap-5">
                <MoonPhaseVisual phaseAngle={cosmic.moonPhase.phaseAngle} size={86} />
                <div>
                  <p className="text-xs text-[#CBD5E1]">{t.sections.moonPhase}</p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-0.5">
                    {moonPhaseLocalized}
                  </h3>
                  <p className="text-xs text-[#EAD9AD] tabular-nums-mono mt-1">
                    {t.sections.illumination}: {cosmic.moonPhase.illuminationPercent}% ·{' '}
                    {cosmic.moonPhase.phaseAngle.toFixed(1)}°
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-[#C6A15B]/20">
                <div>
                  <p className="text-xs text-[#CBD5E1]">{t.sections.sunPosition}</p>
                  <p className="font-display text-xl font-semibold text-white mt-1">
                    {cosmic.sun.position.signSymbol} {cosmic.sun.position.signName}
                  </p>
                  <p className="tabular-nums-mono text-xs text-[#EAD9AD]">
                    {cosmic.sun.position.formattedDegree}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#CBD5E1]">{t.sections.moonPosition}</p>
                  <p className="font-display text-xl font-semibold text-white mt-1">
                    {cosmic.moon.position.signSymbol} {cosmic.moon.position.signName}
                  </p>
                  <p className="tabular-nums-mono text-xs text-[#EAD9AD]">
                    {cosmic.moon.position.formattedDegree}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#C6A15B]/20 text-[11.5px] text-[#A9B2BE] space-y-1.5">
                <p className="tabular-nums-mono text-[#CBD5E1]">
                  {t.sections.calculatedAt}: {cosmic.calculatedAtUtc.replace('T', ' ').slice(0, 19)} UTC
                </p>
                <p className="leading-relaxed">{t.sections.cosmicMethodology}</p>
              </div>
            </div>

            {/* Real-Time Planetary Ecliptic Longitude Table */}
            <div className="lg:col-span-7 bg-[#0D1828]/85 border border-[#C6A15B]/35 p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#C6A15B]/20">
                <span className="text-xs uppercase tracking-[0.14em] text-[#EAD9AD]">
                  Geocentric Ecliptic Longitudes (Tropical)
                </span>
                <Compass className="w-4 h-4 text-[#C6A15B]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {cosmic.planets.map((p) => (
                  <div
                    key={p.body}
                    className="flex items-center justify-between py-2 border-b border-[#C6A15B]/15 text-sm"
                  >
                    <span className="text-white">
                      <span className="text-[#EAD9AD] me-2">{p.symbol}</span>
                      {p.body}
                    </span>
                    <span className="tabular-nums-mono text-xs text-[#E2E8F0]">
                      {p.position.signSymbol} {p.position.signName}{' '}
                      <span className="text-[#EAD9AD] ms-1">{p.position.formattedDegree}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FREE ASTROLOGY, ABJAD & CALENDAR TOOLS (WARM IVORY) */}
      <section className="py-20 bg-[#FAF8F2]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
                Free Online Calculators · Private Browser Execution
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#15243A]">
                {t.sections.toolsTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#4A5A53] mt-3 leading-relaxed">
                {t.sections.toolsSubtitle}
              </p>
            </div>
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#164E3C] hover:text-[#C6A15B] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.sections.viewAllTools}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS_CATALOG.slice(0, 9).map((tool, idx) => (
              <InteractiveTiltCard key={tool.slug} maxTilt={3.5} className="h-full">
                <Link
                  to={`/tools/${tool.slug}`}
                  className="group h-full p-6 bg-white gold-hairline flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="tabular-nums-mono font-semibold text-[#C6A15B]">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="capitalize text-[#6E7E77]">{tool.category}</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#15243A] group-hover:text-[#164E3C] transition-colors">
                      {loc(tool.title)}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A5A53] mt-2.5 leading-relaxed">
                      {loc(tool.shortDescription)}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#EAD9AD]/70 flex items-center justify-between text-xs font-semibold text-[#164E3C] group-hover:text-[#C6A15B]">
                    <span>{t.sections.openTool}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </InteractiveTiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: HOW IT WORKS + WHY CHOOSE ASTROTALK PK (DEEP EMERALD LUXURY FEATURE SECTION) */}
      <section className="py-20 bg-[#164E3C] text-white islamic-lattice-bg">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="text-xs tracking-[0.18em] uppercase text-[#EAD9AD] font-semibold mb-3">
                Institutional Standard
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                {t.sections.whyChooseTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#D8E5DF] mt-4 leading-relaxed">
                {t.sections.whyChooseSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openBooking({ language: lang })}
                  className="min-h-[44px] px-6 py-3 bg-[#C6A15B] text-[#15243A] text-sm font-semibold hover:bg-[#EAD9AD] transition-colors cursor-pointer"
                >
                  {t.nav.bookConsultation}
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {t.sections.whyPoints.map((pt, idx) => (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
                  className="pt-5 border-t border-[#EAD9AD]/25"
                >
                  <span className="tabular-nums-mono text-xs text-[#EAD9AD] font-semibold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-white mt-1.5">
                    {pt.title}
                  </h3>
                  <p className="text-sm text-[#D8E5DF] mt-2 leading-relaxed">{pt.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: HONEST TESTIMONIALS & VERIFICATION POLICY (WARM IVORY) */}
      <section className="py-16 bg-[#FAF8F2] border-b border-[#EAD9AD]/70">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-2">
                Integrity &amp; Transparency
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#15243A]">
                {t.sections.testimonialsTitle}
              </h2>
              <p className="text-sm text-[#4A5A53] mt-2">{t.sections.testimonialsSubtitle}</p>
            </div>
            <div className="lg:col-span-7 bg-white border border-[#C6A15B]/40 p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start">
              <ShieldCheck className="w-7 h-7 text-[#164E3C] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#15243A]">
                  {t.sections.testimonialsPolicyTitle}
                </h3>
                <p className="text-sm text-[#4A5A53] mt-2.5 leading-relaxed">
                  {t.sections.testimonialsPolicyBody}
                </p>
                <Link
                  to="/disclaimer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#164E3C] hover:text-[#C6A15B] mt-4"
                >
                  <span>{t.sections.testimonialsPolicyAction}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: KNOWLEDGE CENTER (CRISP WHITE) */}
      <section className="py-20 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
                Editorial Library
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#15243A]">
                {t.sections.knowledgeTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#4A5A53] mt-3">
                {t.sections.knowledgeSubtitle}
              </p>
            </div>
            <Link
              to="/knowledge"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#164E3C] hover:text-[#C6A15B] whitespace-nowrap shrink-0"
            >
              <span>{t.sections.viewKnowledge}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KNOWLEDGE_ARTICLES.slice(0, 3).map((article) => (
              <InteractiveTiltCard key={article.slug} maxTilt={3} className="h-full">
                <article className="group h-full bg-[#FAF8F2] gold-hairline flex flex-col overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden bg-[#F1F5EF]">
                    <EditorialImage
                      src={article.image}
                      alt={loc(article.title)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      fallbackTitle={loc(article.title)}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#6E7E77]">
                        <span className="font-semibold text-[#164E3C]">{loc(article.categoryLabel)}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {article.readMinutes} {t.common.minRead}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#15243A] mt-2 leading-snug">
                        <Link
                          to={`/knowledge/${article.slug}`}
                          className="hover:text-[#164E3C] transition-colors"
                        >
                          {loc(article.title)}
                        </Link>
                      </h3>
                      <p className="text-sm text-[#4A5A53] mt-2.5 leading-relaxed line-clamp-3">
                        {loc(article.excerpt)}
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-[#EAD9AD]/70">
                      <Link
                        to={`/knowledge/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#164E3C] hover:text-[#C6A15B]"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{t.sections.readArticle}</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </InteractiveTiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: INTERNATIONAL AUDIENCE (SOFT SAGE) */}
      <section className="py-20 bg-[#F1F5EF] border-t border-[#C6A15B]/30">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold">
                Global Diaspora Access
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#15243A] leading-tight">
                {t.sections.internationalTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#26332D] leading-relaxed">
                {t.sections.internationalSubtitle}
              </p>
              <p className="text-xs text-[#4A5A53] leading-relaxed pt-3 border-t border-[#C6A15B]/35">
                {t.sections.internationalNote}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openBooking({ language: lang })}
                  className="min-h-[44px] px-6 py-3 bg-[#164E3C] text-white font-semibold text-sm hover:bg-[#26745A] transition-colors cursor-pointer"
                >
                  {t.nav.bookConsultation}
                </button>
                <button
                  type="button"
                  onClick={openChat}
                  className="min-h-[44px] px-6 py-3 bg-white border border-[#C6A15B]/55 text-[#164E3C] font-semibold text-sm hover:border-[#164E3C] transition-colors cursor-pointer"
                >
                  {t.hero.chatCta}
                </button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-[#15243A] border border-[#C6A15B]/45 p-3 sm:p-5 shadow-md">
                <InternationalMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: FINAL CONVERSION CALL TO ACTION (WHATSAPP, CALL, LIVE CHAT & BOOKING) */}
      <section className="py-20 bg-[#FAF8F2] islamic-lattice-ivory border-t border-[#C6A15B]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#15243A] leading-tight text-balance">
            {t.sections.finalCtaHeadline}
          </h2>
          <p className="text-base text-[#4A5A53] max-w-2xl mx-auto leading-relaxed">
            {t.sections.finalCtaSubtext}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={centralWaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[48px] px-7 py-3.5 bg-[#164E3C] text-white font-semibold text-sm hover:bg-[#26745A] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#EAD9AD]" />
              <span>WhatsApp Consultation</span>
            </a>
            <a
              href={`tel:${CENTRAL_PHONE_NUMBER.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3.5 bg-white border border-[#C6A15B]/65 text-[#15243A] font-semibold text-sm hover:border-[#164E3C] hover:text-[#164E3C] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#164E3C]" />
              <span>Call an Expert</span>
            </a>
            <button
              type="button"
              onClick={() => openBooking({ language: lang, consultationType: 'appointment' })}
              className="min-h-[48px] px-7 py-3.5 bg-[#C6A15B] text-[#15243A] font-semibold text-sm hover:bg-[#EAD9AD] transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
