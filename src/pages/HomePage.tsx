import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Search,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { ASSETS, SERVICES } from '../data/services';
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
import { SeoHead } from '../components/SeoHead';
import type { ConsultationMethod, Language } from '../types';

export function HomePage() {
  const { lang, t, loc } = useLanguage();
  const { openBooking } = useBooking();
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
        description="Explore astrology, Istikhara education, Islamic spiritual guidance, and private multilingual consultations in English, Urdu, and Arabic from anywhere in the world."
      />

      {/* SECTION 1: PREMIUM CINEMATIC HERO */}
      <section className="relative min-h-[88vh] pt-24 pb-20 flex items-center overflow-hidden bg-[#091426]">
        {/* Architectural Observatory Backdrop */}
        <div className="absolute inset-0 z-0">
          <EditorialImage
            src={ASSETS.heroObservatory}
            alt="Celestial observatory dome with brass armillary sphere"
            priority
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#091426]/85 via-[#091426]/75 to-[#091426]" />
          <div className="absolute inset-0 islamic-lattice-bg opacity-70" />
        </div>

        {/* Live Animated Starfield Canvas */}
        <CelestialBackdrop density="hero" />

        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Editorial Copy Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <p className="text-xs tracking-[0.18em] uppercase text-[#E5CD91]">
                {t.hero.eyebrow}
              </p>

              <h1 className="font-display text-[clamp(2.4rem,4.6vw,4.35rem)] leading-[1.08] font-semibold text-[#F6F2E9] max-w-2xl">
                {t.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-[#C7D0DC] leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/experts"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#C6A35A] text-[#091426] font-semibold text-sm tracking-wide hover:bg-[#E5CD91] transition-colors whitespace-nowrap"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#C6A35A]/40 text-[#F6F2E9] text-sm font-medium hover:border-[#E5CD91] hover:text-[#E5CD91] transition-colors whitespace-nowrap"
                >
                  <span>{t.hero.secondaryCta}</span>
                </Link>
              </div>

              {/* Compact Unboxed Trust Strip */}
              <div className="pt-6 border-t border-[#C6A35A]/20 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#A9B2BE]">
                {t.hero.trustItems.map((item, idx) => (
                  <span key={item} className="inline-flex items-center gap-5">
                    <span className="text-[#E5CD91]/90">{item}</span>
                    {idx < t.hero.trustItems.length - 1 && (
                      <span aria-hidden="true" className="text-[#C6A35A]/40">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Rotating Celestial Zodiac Wheel Focal Anchor */}
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
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK CONSULTATION FINDER */}
      <section className="relative z-20 -mt-8 pb-16">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0C3028] border border-[#C6A35A]/30 p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-6 border-b border-[#C6A35A]/20">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F6F2E9]">
                  {t.finder.title}
                </h2>
                <p className="text-sm text-[#C7D4CE] mt-1">{t.finder.subtitle}</p>
              </div>
              <span className="text-xs text-[#E5CD91] whitespace-nowrap">
                UK · Europe · USA · Canada · Australia · UAE · Saudi Arabia · Pakistan
              </span>
            </div>

            <form
              onSubmit={handleFinderSubmit}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
            >
              <div className="md:col-span-4">
                <label htmlFor="qf-service" className="block text-xs text-[#E5CD91] mb-2">
                  {t.finder.serviceLabel}
                </label>
                <select
                  id="qf-service"
                  value={finderService}
                  onChange={(e) => setFinderService(e.target.value)}
                  className="w-full h-11 px-3.5 text-sm bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9] focus:border-[#E5CD91] focus:outline-none"
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
                <label htmlFor="qf-lang" className="block text-xs text-[#E5CD91] mb-2">
                  {t.finder.languageLabel}
                </label>
                <select
                  id="qf-lang"
                  value={finderLang}
                  onChange={(e) => setFinderLang(e.target.value as Language)}
                  className="w-full h-11 px-3.5 text-sm bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9] focus:border-[#E5CD91] focus:outline-none"
                >
                  <option value="en">{t.common.english}</option>
                  <option value="ur">{t.common.urdu}</option>
                  <option value="ar">{t.common.arabic}</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label htmlFor="qf-type" className="block text-xs text-[#E5CD91] mb-2">
                  {t.finder.typeLabel}
                </label>
                <select
                  id="qf-type"
                  value={finderType}
                  onChange={(e) => setFinderType(e.target.value as ConsultationMethod)}
                  className="w-full h-11 px-3.5 text-sm bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9] focus:border-[#E5CD91] focus:outline-none"
                >
                  <option value="whatsapp">{t.finder.types.whatsapp}</option>
                  <option value="phone">{t.finder.types.phone}</option>
                  <option value="appointment">{t.finder.types.appointment}</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full h-11 px-5 bg-[#C6A35A] text-[#091426] font-semibold text-sm hover:bg-[#E5CD91] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {t.finder.searchButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 3: POPULAR SERVICES (ALL 10 CATEGORIES IN EDITORIAL ASYMMETRIC GRID) */}
      <section className="py-20 bg-[#091426]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A] mb-3">
                01 — {t.nav.allServices}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F6F2E9]">
                {t.sections.servicesTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#A9B2BE] mt-3 leading-relaxed">
                {t.sections.servicesSubtitle}
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#E5CD91] hover:underline whitespace-nowrap shrink-0"
            >
              <span>{t.sections.viewAllServices}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Lead 2 Marquee Services (Asymmetric Split) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {SERVICES.slice(0, 2).map((svc, idx) => (
              <motion.article
                key={svc.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative overflow-hidden bg-[#0D1B32] gold-hairline grid grid-cols-1 sm:grid-cols-12"
              >
                <div className="sm:col-span-5 relative aspect-[4/3] sm:aspect-auto overflow-hidden">
                  <EditorialImage
                    src={svc.image}
                    alt={loc(svc.title)}
                    objectPosition={svc.imagePosition}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    fallbackTitle={loc(svc.title)}
                  />
                </div>
                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <span className="tabular-nums-mono text-xs text-[#C6A35A]">
                      {svc.order} · {svc.domain === 'astrology' ? 'Astronomy & Chart' : 'Quran & Sunnah'}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F6F2E9] mt-2">
                      <Link to={`/services/${svc.slug}`} className="hover:text-[#E5CD91] transition-colors">
                        {loc(svc.title)}
                      </Link>
                    </h3>
                    <p className="text-sm text-[#A9B2BE] mt-3 leading-relaxed">
                      {loc(svc.shortDescription)}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#C6A35A]/15">
                    <Link
                      to={`/services/${svc.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#E5CD91] group-hover:gap-3 transition-all"
                    >
                      <span>{t.sections.exploreService}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Remaining 8 Services in Refined 4-Column Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.slice(2).map((svc, idx) => (
              <motion.article
                key={svc.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.06 }}
                className="group bg-[#0C192F] gold-hairline flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#081223]">
                  <EditorialImage
                    src={svc.image}
                    alt={loc(svc.title)}
                    objectPosition={svc.imagePosition}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    fallbackTitle={loc(svc.title)}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C192F] via-transparent to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="tabular-nums-mono text-[11px] text-[#C6A35A]">{svc.order}</span>
                    <h3 className="font-display text-xl font-semibold text-[#F6F2E9] mt-1">
                      <Link to={`/services/${svc.slug}`} className="hover:text-[#E5CD91] transition-colors">
                        {loc(svc.title)}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#A9B2BE] mt-2 leading-relaxed line-clamp-3">
                      {loc(svc.shortDescription)}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#C6A35A]/15">
                    <Link
                      to={`/services/${svc.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E5CD91] hover:underline"
                    >
                      <span>{t.sections.exploreService}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED EXPERTS MARKETPLACE */}
      <section className="py-20 bg-[#07101F] border-y border-[#C6A35A]/15">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A] mb-3">
                02 — {t.nav.ourExperts}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F6F2E9]">
                {t.sections.expertsTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#A9B2BE] mt-3">
                {t.sections.expertsSubtitle}
              </p>
            </div>
            <Link
              to="/experts"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#E5CD91] hover:underline whitespace-nowrap shrink-0"
            >
              <span>{t.sections.viewAllExperts}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Transparent Editorial Sample Disclosure */}
          <div className="mb-8 px-4 py-3 bg-[#0C3028]/45 border border-[#C6A35A]/25 text-xs text-[#D6DCE5] leading-relaxed">
            {t.sections.sampleNotice}
          </div>

          {/* Interactive Filter & Search Controls */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#C6A35A] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={expQuery}
                onChange={(e) => setExpQuery(e.target.value)}
                placeholder={t.expertActions.searchPlaceholder}
                className="w-full h-11 ps-10 pe-4 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9] placeholder:text-[#7F8B99] focus:border-[#E5CD91] focus:outline-none"
              />
            </div>

            <div className="md:col-span-4">
              <select
                aria-label={t.expertActions.filterAllServices}
                value={expService}
                onChange={(e) => setExpService(e.target.value)}
                className="w-full h-11 px-3.5 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9] focus:border-[#E5CD91] focus:outline-none"
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
                className="w-full h-11 px-3.5 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9] focus:border-[#E5CD91] focus:outline-none"
              >
                <option value="all">{t.expertActions.filterAllLanguages}</option>
                <option value="en">{t.common.english}</option>
                <option value="ur">{t.common.urdu}</option>
                <option value="ar">{t.common.arabic}</option>
              </select>
            </div>
          </div>

          {filteredExperts.length === 0 ? (
            <div className="p-10 text-center border border-[#C6A35A]/20 bg-[#091426]">
              <p className="text-sm text-[#A9B2BE]">{t.expertActions.noResults}</p>
              <button
                type="button"
                onClick={() => {
                  setExpService('all');
                  setExpLang('all');
                  setExpQuery('');
                }}
                className="mt-4 px-5 py-2 text-xs font-semibold bg-[#C6A35A] text-[#091426] cursor-pointer"
              >
                {t.expertActions.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperts.map((expert) => (
                <ExpertCard key={expert.slug} expert={expert} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS (THREE-STEP ARCHITECTURAL PROGRESSION) */}
      <section className="py-20 bg-[#091426]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A] mb-3">03 — Process</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F6F2E9]">
              {t.sections.howItWorksTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#A9B2BE] mt-3">{t.sections.howItWorksSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-8 inset-x-12 h-px bg-gradient-to-r from-[#C6A35A]/15 via-[#C6A35A]/45 to-[#C6A35A]/15"
            />
            {t.sections.steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative bg-[#0C192F] border border-[#C6A35A]/20 p-7"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0C3028] border border-[#C6A35A]/45 tabular-nums-mono text-sm font-semibold text-[#E5CD91] mb-6">
                  {step.num}
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#F6F2E9]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#A9B2BE] mt-3 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY CHOOSE ASTROTALK PK (WARM IVORY EDITORIAL CONTRAST SECTION) */}
      <section className="py-20 bg-[#F6F2E9] text-[#091426] islamic-lattice-ivory">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="text-xs tracking-[0.16em] uppercase text-[#0C3028] font-semibold mb-3">
                04 — Institutional Standard
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#091426] leading-tight">
                {t.sections.whyChooseTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#364457] mt-4 leading-relaxed">
                {t.sections.whyChooseSubtitle}
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => openBooking({ language: lang })}
                  className="px-6 py-3.5 bg-[#0C3028] text-[#F6F2E9] text-sm font-semibold hover:bg-[#123D32] transition-colors cursor-pointer"
                >
                  {t.nav.bookConsultation}
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {t.sections.whyPoints.map((pt, idx) => (
                <div
                  key={pt.title}
                  className="pt-5 border-t border-[#0C3028]/20"
                >
                  <span className="tabular-nums-mono text-xs text-[#8D6E2E] font-medium">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-[#091426] mt-1.5">
                    {pt.title}
                  </h3>
                  <p className="text-sm text-[#364457] mt-2 leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FREE ASTROLOGY, ABJAD & CALENDAR TOOLS */}
      <section className="py-20 bg-[#091426]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A] mb-3">
                05 — Interactive Instruments
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F6F2E9]">
                {t.sections.toolsTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#A9B2BE] mt-3 leading-relaxed">
                {t.sections.toolsSubtitle}
              </p>
            </div>
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#E5CD91] hover:underline whitespace-nowrap shrink-0"
            >
              <span>{t.sections.viewAllTools}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS_CATALOG.slice(0, 9).map((tool, idx) => (
              <Link
                key={tool.slug}
                to={`/tools/${tool.slug}`}
                className="group p-6 bg-[#0C192F] gold-hairline flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#C6A35A] mb-3">
                    <span className="tabular-nums-mono">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="capitalize text-[#A9B2BE]">{tool.category}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#F6F2E9] group-hover:text-[#E5CD91] transition-colors">
                    {loc(tool.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A9B2BE] mt-2.5 leading-relaxed">
                    {loc(tool.shortDescription)}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#C6A35A]/15 flex items-center justify-between text-xs font-medium text-[#E5CD91]">
                  <span>{t.sections.openTool}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: INTERACTIVE 12-SIGN ZODIAC EXPERIENCE */}
      <section className="py-20 bg-[#0C3028] border-y border-[#C6A35A]/20 islamic-lattice-bg">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs tracking-[0.16em] uppercase text-[#E5CD91] mb-3">
              06 — Twelve Ecliptic Divisions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F6F2E9]">
              {t.sections.zodiacTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#C7D4CE] mt-3">{t.sections.zodiacSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <ZodiacWheel
                selectedSlug={selectedZodiacSlug}
                onSelect={setSelectedZodiacSlug}
                size="interactive"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              {/* Selected Sign Editorial Panel */}
              <div className="bg-[#091426]/95 border border-[#C6A35A]/30 p-7 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-[#C6A35A]/20">
                  <div>
                    <p className="text-xs text-[#C6A35A] tabular-nums-mono">
                      {activeZodiac.startDegree}° – {activeZodiac.startDegree + 30}° Ecliptic ·{' '}
                      {loc(activeZodiac.dateRange)}
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#F6F2E9] mt-1">
                      <span className="text-[#E5CD91] me-2.5">{activeZodiac.symbol}</span>
                      {loc(activeZodiac.name)}
                    </h3>
                  </div>
                  <div className="text-xs text-[#A9B2BE]">
                    {loc(activeZodiac.element)} · {loc(activeZodiac.modality)} ·{' '}
                    {loc(activeZodiac.rulingPlanet)}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#D6DCE5] mt-5 leading-relaxed">
                  {loc(activeZodiac.summary)}
                </p>

                <p className="text-sm italic font-display text-[#E5CD91] mt-4">
                  “{loc(activeZodiac.reflectionPrompt)}”
                </p>

                <div className="mt-6">
                  <Link
                    to={`/zodiac/${activeZodiac.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C6A35A] text-[#091426] font-semibold text-xs hover:bg-[#E5CD91] transition-colors"
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
                    className={`py-2.5 px-2 text-center border transition-colors cursor-pointer ${
                      sign.slug === selectedZodiacSlug
                        ? 'bg-[#C6A35A] text-[#091426] border-[#E5CD91] font-semibold'
                        : 'bg-[#091426]/80 text-[#F6F2E9] border-[#C6A35A]/20 hover:border-[#E5CD91]/60'
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

      {/* SECTION 9: TODAY'S CALCULATED COSMIC INSIGHTS (REAL ASTRONOMY-ENGINE DATA) */}
      <section className="py-20 bg-[#091426]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A] mb-3">
                07 — Live Astronomical Ephemeris
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F6F2E9]">
                {t.sections.cosmicTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#A9B2BE] mt-3">{t.sections.cosmicSubtitle}</p>
            </div>
            <Link
              to="/tools/birth-chart"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#E5CD91] hover:underline whitespace-nowrap shrink-0"
            >
              <span>{t.sections.openDetailedSky}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Moon Phase & Primary Luminaries */}
            <div className="lg:col-span-5 bg-[#0C192F] border border-[#C6A35A]/25 p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div className="flex items-center gap-5">
                <MoonPhaseVisual phaseAngle={cosmic.moonPhase.phaseAngle} size={86} />
                <div>
                  <p className="text-xs text-[#A9B2BE]">{t.sections.moonPhase}</p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F6F2E9] mt-0.5">
                    {moonPhaseLocalized}
                  </h3>
                  <p className="text-xs text-[#E5CD91] tabular-nums-mono mt-1">
                    {t.sections.illumination}: {cosmic.moonPhase.illuminationPercent}% ·{' '}
                    {cosmic.moonPhase.phaseAngle.toFixed(1)}°
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-[#C6A35A]/15">
                <div>
                  <p className="text-xs text-[#A9B2BE]">{t.sections.sunPosition}</p>
                  <p className="font-display text-xl font-semibold text-[#F6F2E9] mt-1">
                    {cosmic.sun.position.signSymbol} {cosmic.sun.position.signName}
                  </p>
                  <p className="tabular-nums-mono text-xs text-[#E5CD91]">
                    {cosmic.sun.position.formattedDegree}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#A9B2BE]">{t.sections.moonPosition}</p>
                  <p className="font-display text-xl font-semibold text-[#F6F2E9] mt-1">
                    {cosmic.moon.position.signSymbol} {cosmic.moon.position.signName}
                  </p>
                  <p className="tabular-nums-mono text-xs text-[#E5CD91]">
                    {cosmic.moon.position.formattedDegree}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#C6A35A]/15 text-[11.5px] text-[#8F9BA9] space-y-1.5">
                <p className="tabular-nums-mono text-[#A9B2BE]">
                  {t.sections.calculatedAt}: {cosmic.calculatedAtUtc.replace('T', ' ').slice(0, 19)} UTC
                </p>
                <p className="leading-relaxed">{t.sections.cosmicMethodology}</p>
              </div>
            </div>

            {/* Real-Time Planetary Ecliptic Longitude Table */}
            <div className="lg:col-span-7 bg-[#0C192F] border border-[#C6A35A]/25 p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#C6A35A]/15">
                <span className="text-xs uppercase tracking-[0.14em] text-[#E5CD91]">
                  Geocentric Ecliptic Longitudes (Tropical)
                </span>
                <Compass className="w-4 h-4 text-[#C6A35A]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {cosmic.planets.map((p) => (
                  <div
                    key={p.body}
                    className="flex items-center justify-between py-2 border-b border-[#C6A35A]/10 text-sm"
                  >
                    <span className="text-[#F6F2E9]">
                      <span className="text-[#E5CD91] me-2">{p.symbol}</span>
                      {p.body}
                    </span>
                    <span className="tabular-nums-mono text-xs text-[#D6DCE5]">
                      {p.position.signSymbol} {p.position.signName}{' '}
                      <span className="text-[#C6A35A] ms-1">{p.position.formattedDegree}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: HONEST TESTIMONIALS & VERIFICATION POLICY */}
      <section className="py-16 bg-[#07101F] border-y border-[#C6A35A]/15">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A] mb-2">
                08 — Integrity & Transparency
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F6F2E9]">
                {t.sections.testimonialsTitle}
              </h2>
              <p className="text-sm text-[#A9B2BE] mt-2">{t.sections.testimonialsSubtitle}</p>
            </div>
            <div className="lg:col-span-7 bg-[#0C192F] border border-[#C6A35A]/25 p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start">
              <ShieldCheck className="w-7 h-7 text-[#C6A35A] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#F6F2E9]">
                  {t.sections.testimonialsPolicyTitle}
                </h3>
                <p className="text-sm text-[#A9B2BE] mt-2.5 leading-relaxed">
                  {t.sections.testimonialsPolicyBody}
                </p>
                <Link
                  to="/disclaimer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E5CD91] hover:underline mt-4"
                >
                  <span>{t.sections.testimonialsPolicyAction}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: KNOWLEDGE CENTER */}
      <section className="py-20 bg-[#F6F2E9] text-[#091426]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.16em] uppercase text-[#0C3028] font-semibold mb-3">
                09 — Editorial Library
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#091426]">
                {t.sections.knowledgeTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#364457] mt-3">
                {t.sections.knowledgeSubtitle}
              </p>
            </div>
            <Link
              to="/knowledge"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0C3028] hover:underline whitespace-nowrap shrink-0"
            >
              <span>{t.sections.viewKnowledge}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KNOWLEDGE_ARTICLES.slice(0, 3).map((article) => (
              <article
                key={article.slug}
                className="group bg-white border border-[#091426]/12 flex flex-col overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#EAE3D4]">
                  <EditorialImage
                    src={article.image}
                    alt={loc(article.title)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    fallbackTitle={loc(article.title)}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#556275]">
                      <span className="font-medium text-[#0C3028]">{loc(article.categoryLabel)}</span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {article.readMinutes} {t.common.minRead}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#091426] mt-2 leading-snug">
                      <Link
                        to={`/knowledge/${article.slug}`}
                        className="hover:text-[#0C3028] transition-colors"
                      >
                        {loc(article.title)}
                      </Link>
                    </h3>
                    <p className="text-sm text-[#435163] mt-2.5 leading-relaxed line-clamp-3">
                      {loc(article.excerpt)}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#091426]/10">
                    <Link
                      to={`/knowledge/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0C3028] hover:underline"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t.sections.readArticle}</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: INTERNATIONAL AUDIENCE */}
      <section className="py-20 bg-[#091426]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A]">
                10 — Global Diaspora Access
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F6F2E9] leading-tight">
                {t.sections.internationalTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#C7D0DC] leading-relaxed">
                {t.sections.internationalSubtitle}
              </p>
              <p className="text-xs text-[#A9B2BE] leading-relaxed pt-3 border-t border-[#C6A35A]/15">
                {t.sections.internationalNote}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openBooking({ language: lang })}
                  className="px-6 py-3 bg-[#C6A35A] text-[#091426] font-semibold text-sm hover:bg-[#E5CD91] transition-colors cursor-pointer"
                >
                  {t.nav.bookConsultation}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <InternationalMap />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: FINAL CTA */}
      <section className="py-24 bg-gradient-to-b from-[#0C3028] to-[#091426] border-t border-[#C6A35A]/25 islamic-lattice-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <Sparkles className="w-6 h-6 text-[#E5CD91] mx-auto" strokeWidth={1.3} />
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#F6F2E9] leading-tight">
            {t.sections.finalCtaHeadline}
          </h2>
          <p className="text-sm sm:text-base text-[#C7D4CE] leading-relaxed">
            {t.sections.finalCtaSubtext}
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/experts"
              className="px-7 py-3.5 bg-[#C6A35A] text-[#091426] font-semibold text-sm hover:bg-[#E5CD91] transition-colors"
            >
              {t.sections.findAnExpert}
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 border border-[#C6A35A]/45 text-[#F6F2E9] font-medium text-sm hover:border-[#E5CD91] hover:text-[#E5CD91] transition-colors"
            >
              {t.sections.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
