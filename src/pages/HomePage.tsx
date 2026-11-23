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
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useChat } from '../context/ChatContext';
import { SERVICES } from '../data/services';
import { EXPERTS } from '../data/experts';
import { ZODIAC_SIGNS } from '../data/zodiac';
import { KNOWLEDGE_ARTICLES, TOOLS_CATALOG } from '../data/knowledge';
import { calculateCosmicSnapshot } from '../utils/astronomy';
import { CelestialBackdrop } from '../components/CelestialBackdrop';
import { ZodiacWheel } from '../components/ZodiacWheel';
import { MoonPhaseVisual } from '../components/MoonPhaseVisual';
import { InternationalMap } from '../components/InternationalMap';
import { ExpertCard } from '../components/ExpertCard';
import { EditorialImage } from '../components/EditorialImage';
import { InteractiveTiltCard } from '../components/InteractiveTiltCard';
import { MagneticButton } from '../components/MagneticButton';
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

  // Featured Experts inline filters
  const [expService, setExpService] = useState<string>('all');
  const [expLang, setExpLang] = useState<string>('all');
  const [expQuery, setExpQuery] = useState<string>('');

  // Interactive Zodiac wheel state
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

  return (
    <>
      <SeoHead
        title="ASTROTALK PK — International Astrology & Spiritual Consultation Platform"
        description="Discover astrology, spiritual guidance and personal consultations through a platform designed to connect you with specialists in English, Urdu, and Arabic from anywhere in the world."
      />

      {/* SECTION 1: LIGHT LUXURY INTERACTIVE CELESTIAL HERO */}
      <section className="relative min-h-[88vh] pt-24 pb-20 lg:pb-24 flex items-center overflow-hidden bg-gradient-to-b from-[#FAF8F2] via-[#F7F5EE] to-[#F1F5EF]">
        {/* Subtle Warm Gold & Botanical Radial Light Layers */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 end-0 w-[560px] h-[560px] rounded-full bg-radial from-[#EAD9AD]/45 via-[#FAF8F2]/10 to-transparent blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 start-0 w-[480px] h-[480px] rounded-full bg-radial from-[#164E3C]/10 via-transparent to-transparent blur-3xl"
        />
        <div className="pointer-events-none absolute inset-0 islamic-lattice-gold-light opacity-75" />

        {/* Interactive Pointer & Touch-Reactive Celestial Starfield */}
        <CelestialBackdrop density="hero" theme="light" />

        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Editorial Copy Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-[#164E3C] font-semibold">
                {t.hero.eyebrow}
              </p>

              <h1 className="font-display text-[clamp(2.45rem,4.7vw,4.5rem)] leading-[1.06] font-semibold text-[#15243A] max-w-2xl">
                {t.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-[#4A5A53] leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </p>

              {/* Magnetic Primary CTA + Secondary Services CTA + Live Chat Trigger */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <MagneticButton>
                  <Link
                    to="/experts"
                    className="inline-flex items-center gap-2.5 min-h-[48px] px-7 py-3.5 bg-[#164E3C] text-white font-semibold text-sm tracking-wide hover:bg-[#26745A] shadow-[0_14px_30px_-14px_rgba(22,78,60,0.55)] active:scale-[0.98] transition-all whitespace-nowrap"
                  >
                    <span>{t.hero.primaryCta}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </MagneticButton>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3.5 bg-white border border-[#C6A15B]/65 text-[#15243A] text-sm font-semibold hover:border-[#164E3C] hover:text-[#164E3C] active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  <span>{t.hero.secondaryCta}</span>
                </Link>

                <button
                  type="button"
                  onClick={openChat}
                  className="inline-flex items-center gap-2 min-h-[48px] px-5 py-3.5 bg-[#F1F5EF] border border-[#164E3C]/25 text-[#164E3C] text-sm font-semibold hover:bg-[#164E3C] hover:text-white active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#C6A15B]" />
                  <span>{t.hero.chatCta}</span>
                </button>
              </div>

              {/* Compact Unboxed Trust Strip */}
              <div className="pt-6 border-t border-[#C6A15B]/35 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#4A5A53]">
                {t.hero.trustItems.map((item, idx) => (
                  <span key={item} className="inline-flex items-center gap-5">
                    <span className="text-[#164E3C] font-medium">{item}</span>
                    {idx < t.hero.trustItems.length - 1 && (
                      <span aria-hidden="true" className="text-[#C6A15B]">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Draggable / Swipeable Interactive Light-Luxury Zodiac Wheel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <ZodiacWheel
                selectedSlug={selectedZodiacSlug}
                onSelect={(slug) => setSelectedZodiacSlug(slug)}
                size="hero"
                theme="light"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK CONSULTATION FINDER (DEEP EMERALD JEWEL ANCHOR) */}
      <section className="relative z-20 -mt-10 pb-16 bg-[#FAF8F2]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#164E3C] border border-[#C6A15B]/50 p-6 sm:p-8 shadow-[0_24px_50px_-24px_rgba(22,78,60,0.45)] islamic-lattice-bg">
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

      {/* SECTION 3: POPULAR SERVICES (BRIGHT WARM IVORY + INTERACTIVE TILT + MOBILE SWIPE CAROUSEL) */}
      <section className="py-16 lg:py-20 bg-[#FAF8F2]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
                01 — {t.nav.allServices}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#15243A]">
                {t.sections.servicesTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#4A5A53] mt-3 leading-relaxed">
                {t.sections.servicesSubtitle}
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#164E3C] hover:text-[#C6A15B] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.sections.viewAllServices}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Lead 2 Marquee Services (Asymmetric Split with Interactive Tilt) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {SERVICES.slice(0, 2).map((svc, idx) => (
              <motion.div
                key={svc.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <InteractiveTiltCard maxTilt={3.5} className="h-full">
                  <article className="group h-full relative overflow-hidden bg-white gold-hairline grid grid-cols-1 sm:grid-cols-12">
                    <div className="sm:col-span-5 relative aspect-[4/3] sm:aspect-auto overflow-hidden bg-[#F1F5EF]">
                      <EditorialImage
                        src={svc.image}
                        alt={loc(svc.title)}
                        objectPosition={svc.imagePosition}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        fallbackTitle={loc(svc.title)}
                      />
                    </div>
                    <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                      <div>
                        <span className="tabular-nums-mono text-xs text-[#C6A15B] font-semibold">
                          {svc.order} · {svc.domain === 'astrology' ? 'Astronomy & Chart' : 'Quran & Sunnah'}
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#15243A] mt-2">
                          <Link to={`/services/${svc.slug}`} className="hover:text-[#164E3C] transition-colors">
                            {loc(svc.title)}
                          </Link>
                        </h3>
                        <p className="text-sm text-[#4A5A53] mt-3 leading-relaxed">
                          {loc(svc.shortDescription)}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-[#EAD9AD]/70">
                        <Link
                          to={`/services/${svc.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#164E3C] group-hover:text-[#C6A15B] group-hover:gap-3 transition-all"
                        >
                          <span>{t.sections.exploreService}</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </InteractiveTiltCard>
              </motion.div>
            ))}
          </div>

          {/* Remaining 8 Services: Swipeable Carousel on Mobile, 4-Column Luxury Grid on Desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 no-scrollbar">
            {SERVICES.slice(2).map((svc, idx) => (
              <motion.div
                key={svc.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.06 }}
                className="shrink-0 w-[80vw] max-w-[300px] sm:w-auto sm:max-w-none snap-start"
              >
                <InteractiveTiltCard maxTilt={4} className="h-full">
                  <article className="group h-full bg-white gold-hairline flex flex-col overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#F1F5EF]">
                      <EditorialImage
                        src={svc.image}
                        alt={loc(svc.title)}
                        objectPosition={svc.imagePosition}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                        fallbackTitle={loc(svc.title)}
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="tabular-nums-mono text-[11px] font-semibold text-[#C6A15B]">
                          {svc.order}
                        </span>
                        <h3 className="font-display text-xl font-semibold text-[#15243A] mt-1">
                          <Link to={`/services/${svc.slug}`} className="hover:text-[#164E3C] transition-colors">
                            {loc(svc.title)}
                          </Link>
                        </h3>
                        <p className="text-xs text-[#4A5A53] mt-2 leading-relaxed line-clamp-3">
                          {loc(svc.shortDescription)}
                        </p>
                      </div>
                      <div className="mt-5 pt-3 border-t border-[#EAD9AD]/70">
                        <Link
                          to={`/services/${svc.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#164E3C] group-hover:text-[#C6A15B] transition-colors"
                        >
                          <span>{t.sections.exploreService}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </InteractiveTiltCard>
              </motion.div>
            ))}
          </div>

          {/* Post-Services Gentle Conversion Banner */}
          <div className="mt-10 p-6 sm:p-7 bg-[#F1F5EF] border border-[#C6A15B]/35 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-3.5">
              <Sparkles className="w-5 h-5 text-[#C6A15B] shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#15243A]">
                  {lang === 'ur'
                    ? 'سمجھ نہیں آ رہا کہ کون سی خدمت آپ کے لیے موزوں ہے؟'
                    : lang === 'ar'
                      ? 'هل تحتار في اختيار التخصص الأنسب لحالتك؟'
                      : 'Unsure Which Service Suits Your Situation Best?'}
                </h3>
                <p className="text-sm text-[#4A5A53] mt-1">
                  {lang === 'ur'
                    ? 'ہماری سپورٹ ٹیم آپ کو مناسب شعبے اور ماہر کے انتخاب میں فوری رہنمائی فراہم کر سکتی ہے۔'
                    : lang === 'ar'
                      ? 'فريق التنسيق جاهز لمساعدتك في اختيار المختص المناسب بخصوصية تامة.'
                      : 'Speak with our coordination desk via live chat or request a private consultation slot.'}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={openChat}
                className="min-h-[44px] px-5 py-2.5 bg-white border border-[#164E3C]/30 text-[#164E3C] text-xs font-semibold hover:bg-[#164E3C] hover:text-white transition-colors cursor-pointer"
              >
                {t.hero.chatCta}
              </button>
              <button
                type="button"
                onClick={() => openBooking({ language: lang })}
                className="min-h-[44px] px-5 py-2.5 bg-[#164E3C] text-white text-xs font-semibold hover:bg-[#26745A] transition-colors cursor-pointer"
              >
                {t.nav.bookConsultation}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED EXPERTS MARKETPLACE (WHITE SURFACE + MOBILE SWIPE CAROUSEL) */}
      <section className="py-20 bg-white border-y border-[#EAD9AD]/70">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
                02 — {t.nav.ourExperts}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#15243A]">
                {t.sections.expertsTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#4A5A53] mt-3">
                {t.sections.expertsSubtitle}
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

          {/* Transparent Editorial Sample Disclosure */}
          <div className="mb-8 px-4 py-3 bg-[#F1F5EF] border border-[#164E3C]/20 text-xs text-[#26332D] leading-relaxed">
            {t.sections.sampleNotice}
          </div>

          {/* Interactive Filter & Search Controls */}
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

      {/* SECTION 5: AUTHENTIC QURANIC INSPIRATION SECTION */}
      <QuranInspirationSection />

      {/* SECTION 6: HOW IT WORKS (THREE-STEP ARCHITECTURAL PROGRESSION ON WARM IVORY) */}
      <section className="py-20 bg-[#FAF8F2]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
              03 — Process
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#15243A]">
              {t.sections.howItWorksTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#4A5A53] mt-3">{t.sections.howItWorksSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 relative">
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-11 inset-x-12 h-px bg-gradient-to-r from-[#C6A15B]/20 via-[#C6A15B] to-[#C6A15B]/20"
            />
            {t.sections.steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative bg-white gold-hairline p-7"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#164E3C] border border-[#C6A15B]/60 tabular-nums-mono text-sm font-semibold text-[#EAD9AD] mb-6">
                  {step.num}
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#15243A]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4A5A53] mt-3 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE ASTROTALK PK (DEEP EMERALD LUXURY FEATURE SECTION) */}
      <section className="py-20 bg-[#164E3C] text-white islamic-lattice-bg">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="text-xs tracking-[0.18em] uppercase text-[#EAD9AD] font-semibold mb-3">
                04 — Institutional Standard
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
                  className="px-6 py-3.5 bg-[#C6A15B] text-[#15243A] text-sm font-semibold hover:bg-[#EAD9AD] transition-colors cursor-pointer"
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

      {/* SECTION 8: FREE ASTROLOGY, ABJAD & CALENDAR TOOLS (WARM IVORY) */}
      <section className="py-20 bg-[#FAF8F2]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
                05 — Interactive Instruments
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

      {/* SECTION 9: INTERACTIVE 12-SIGN ZODIAC EXPERIENCE (SOFT SAGE) */}
      <section className="py-20 bg-[#F1F5EF] border-y border-[#C6A15B]/30 islamic-lattice-ivory">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
              06 — Twelve Ecliptic Divisions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#15243A]">
              {t.sections.zodiacTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#4A5A53] mt-3">{t.sections.zodiacSubtitle}</p>
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
              {/* Selected Sign Editorial Panel */}
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

                <p className="text-sm sm:text-base text-[#26332D] mt-5 leading-relaxed">
                  {loc(activeZodiac.summary)}
                </p>

                <p className="text-base italic font-display text-[#164E3C] mt-4">
                  “{loc(activeZodiac.reflectionPrompt)}”
                </p>

                <div className="mt-6">
                  <Link
                    to={`/zodiac/${activeZodiac.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#164E3C] text-white font-semibold text-xs hover:bg-[#26745A] transition-colors"
                  >
                    <span>{t.sections.exploreSign}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
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

      {/* SECTION 10: TODAY'S CALCULATED SKY & LUNAR INSIGHTS (MEASURED COSMIC NAVY CONTRAST SECTION) */}
      <section className="relative py-20 bg-[#15243A] text-[#FAF8F2] overflow-hidden">
        <CelestialBackdrop density="subtle" theme="dark" />
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#EAD9AD] mb-3">
                07 — Live Astronomical Ephemeris
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

      {/* SECTION 11: HONEST TESTIMONIALS & VERIFICATION POLICY (WARM IVORY) */}
      <section className="py-16 bg-[#FAF8F2] border-b border-[#EAD9AD]/70">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-2">
                08 — Integrity &amp; Transparency
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

      {/* SECTION 12: KNOWLEDGE CENTER (CRISP WHITE) */}
      <section className="py-20 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
                09 — Editorial Library
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

      {/* SECTION 13: INTERNATIONAL AUDIENCE (SOFT SAGE) */}
      <section className="py-20 bg-[#F1F5EF] border-t border-[#C6A15B]/30">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold">
                10 — Global Diaspora Access
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
                  className="px-6 py-3.5 bg-[#164E3C] text-white font-semibold text-sm hover:bg-[#26745A] transition-colors cursor-pointer"
                >
                  {t.nav.bookConsultation}
                </button>
                <button
                  type="button"
                  onClick={openChat}
                  className="px-6 py-3.5 bg-white border border-[#C6A15B]/55 text-[#164E3C] font-semibold text-sm hover:border-[#164E3C] transition-colors cursor-pointer"
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

      {/* SECTION 14: FINAL CONVERSION CALL TO ACTION */}
      <section className="py-20 bg-[#FAF8F2] islamic-lattice-ivory border-t border-[#C6A15B]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#15243A] leading-tight">
            {t.sections.finalCtaHeadline}
          </h2>
          <p className="text-base text-[#4A5A53] max-w-2xl mx-auto leading-relaxed">
            {t.sections.finalCtaSubtext}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/experts"
              className="px-7 py-3.5 bg-[#164E3C] text-white font-semibold text-sm hover:bg-[#26745A] transition-colors"
            >
              {t.sections.findAnExpert}
            </Link>
            <button
              type="button"
              onClick={openChat}
              className="px-7 py-3.5 bg-white border border-[#C6A15B]/65 text-[#15243A] font-semibold text-sm hover:border-[#164E3C] hover:text-[#164E3C] transition-colors cursor-pointer"
            >
              {t.hero.chatCta}
            </button>
            <Link
              to="/contact"
              className="px-7 py-3.5 bg-[#F1F5EF] border border-[#164E3C]/25 text-[#164E3C] font-semibold text-sm hover:bg-[#164E3C] hover:text-white transition-colors"
            >
              {t.sections.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
