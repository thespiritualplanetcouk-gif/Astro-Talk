import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Compass,
  Gift,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react';
import {
  CENTRAL_PHONE_NUMBER,
  CENTRAL_WHATSAPP_NUMBER,
  HERO_SLIDES,
  type HeroSlideItem,
} from '../data/homepageContent';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { buildWhatsAppUrl } from '../utils/international';
import { EditorialImage } from './EditorialImage';
import { MagneticButton } from './MagneticButton';

export function HeroSlider() {
  const { lang } = useLanguage();
  const { openBooking } = useBooking();
  const navigate = useNavigate();

  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const slideCount = HERO_SLIDES.length;
  const activeSlide = HERO_SLIDES[activeIdx];

  // Auto-advance every 6.5s unless hovered, focused, or user prefers reduced motion
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || prefersReduced) return;

    const timer = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slideCount);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused, slideCount]);

  const goPrev = () => setActiveIdx((prev) => (prev - 1 + slideCount) % slideCount);
  const goNext = () => setActiveIdx((prev) => (prev + 1) % slideCount);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const delta = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) > 48) {
      if (delta < 0) goNext();
      else goPrev();
    }
  };

  const scrollToHoroscope = () => {
    const target = document.getElementById('zodiac-horoscope');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/zodiac/aries');
    }
  };

  const handlePrimaryAction = (slide: HeroSlideItem) => {
    if (slide.ctaAction === 'scroll-horoscope') {
      scrollToHoroscope();
      return;
    }
    if (slide.ctaAction === 'booking-first-reading') {
      openBooking({
        language: lang,
        consultationType: 'whatsapp',
        initialNote:
          'Requesting information on a Free Initial Reading (First-Time Client Orientation, subject to participating specialist availability).',
      });
      return;
    }
    if (slide.ctaTarget) {
      navigate(slide.ctaTarget);
    }
  };

  const centralWaHref = buildWhatsAppUrl(
    CENTRAL_WHATSAPP_NUMBER,
    'Assalam-o-Alaikum ASTROTALK PK, I would like to arrange a consultation with a specialist.'
  );

  return (
    <section
      aria-label="Featured Services Slider"
      className="relative pt-16 lg:pt-[76px] bg-[#FAF8F2]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Full-Width Responsive Touch-Swipeable Hero Banner */}
      <div
        className="relative w-full min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] overflow-hidden bg-[#15243A] select-none touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0.25, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <EditorialImage
              src={activeSlide.image}
              alt={activeSlide.imageAlt}
              priority
              className="w-full h-full object-cover object-center"
              fallbackTitle={activeSlide.headline}
            />
            {/* Measured High-Contrast Readability Scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#0E1B2B]/92 via-[#15243A]/72 to-[#15243A]/28"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0E1B2B]/85 via-transparent to-[#0E1B2B]/30"
            />
          </motion.div>
        </AnimatePresence>

        {/* Slide Copy & Controls */}
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between py-10 sm:py-14 lg:py-16">
          {/* Top Domain Metadata Row (Unboxed Clean Typography) */}
          <div className="flex items-center justify-between gap-4 text-xs text-[#EAD9AD]">
            <span className="font-medium tracking-[0.14em] uppercase">
              {activeSlide.eyebrow}
            </span>
            <span className="hidden sm:inline tabular-nums-mono text-[#D6DCE5]">
              0{activeIdx + 1} / 0{slideCount} · {activeSlide.domainLabel}
            </span>
          </div>

          {/* Center Editorial Message */}
          <div className="my-auto py-6 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <h1 className="font-display text-[clamp(2rem,4.4vw,3.85rem)] leading-[1.2] font-semibold text-white text-balance">
                  {activeSlide.headline}
                </h1>

                <p className="text-base sm:text-lg text-[#E6ECF2] leading-relaxed max-w-2xl">
                  {activeSlide.supportingText}
                </p>

                {/* Primary + Secondary CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <MagneticButton>
                    <button
                      type="button"
                      onClick={() => handlePrimaryAction(activeSlide)}
                      className="inline-flex items-center gap-2.5 min-h-[48px] px-7 py-3.5 bg-[#C6A15B] text-[#15243A] font-semibold text-sm tracking-wide hover:bg-[#EAD9AD] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-lg"
                    >
                      <span>{activeSlide.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  </MagneticButton>

                  <Link
                    to={activeSlide.secondaryTarget}
                    className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3.5 bg-white/12 backdrop-blur-sm border border-[#EAD9AD]/55 text-white text-sm font-semibold hover:bg-white hover:text-[#15243A] transition-all whitespace-nowrap"
                  >
                    <span>{activeSlide.secondaryLabel}</span>
                  </Link>
                </div>

                {/* Transparent First Reading Free Conditions Notice */}
                {activeSlide.conditionNote && (
                  <p className="text-xs text-[#EAD9AD]/95 leading-relaxed max-w-2xl pt-1 border-t border-[#EAD9AD]/25">
                    {activeSlide.conditionNote}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Slider Indicators & Arrows */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
            {/* Slide Selector Tabs */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar max-w-full">
              {HERO_SLIDES.map((s, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`Go to slide ${idx + 1}: ${s.ctaLabel}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`min-h-[40px] px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap cursor-pointer border-b-2 ${
                      isActive
                        ? 'text-[#EAD9AD] border-[#C6A15B] font-semibold'
                        : 'text-[#CBD5E1] border-transparent hover:text-white'
                    }`}
                  >
                    <span className="tabular-nums-mono me-1.5 opacity-80">0{idx + 1}</span>
                    <span className="hidden md:inline">{s.ctaLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous slide"
                className="w-11 h-11 inline-flex items-center justify-center bg-white/12 hover:bg-[#C6A15B] text-white hover:text-[#15243A] border border-white/25 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next slide"
                className="w-11 h-11 inline-flex items-center justify-center bg-white/12 hover:bg-[#C6A15B] text-white hover:text-[#15243A] border border-white/25 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width 6-Action Conversion Bar Directly Below Hero */}
      <div className="bg-white border-b border-[#C6A15B]/35 shadow-xs">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-6 gap-2.5 no-scrollbar">
            <a
              href={centralWaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 min-h-[46px] px-4 py-2.5 bg-[#164E3C] text-white hover:bg-[#26745A] text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#EAD9AD] shrink-0" />
              <span>WhatsApp Consultation</span>
            </a>

            <a
              href={`tel:${CENTRAL_PHONE_NUMBER.replace(/\s+/g, '')}`}
              className="shrink-0 min-h-[46px] px-4 py-2.5 bg-[#FAF8F2] border border-[#C6A15B]/45 text-[#15243A] hover:border-[#164E3C] hover:text-[#164E3C] text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#164E3C] shrink-0" />
              <span>Call an Expert</span>
            </a>

            <button
              type="button"
              onClick={() =>
                openBooking({
                  language: lang,
                  consultationType: 'whatsapp',
                  initialNote:
                    'Free First Reading enquiry (First-time client brief orientation, subject to participating specialist availability).',
                })
              }
              className="shrink-0 min-h-[46px] px-4 py-2.5 bg-[#F1F5EF] border border-[#164E3C]/25 text-[#164E3C] hover:bg-[#164E3C] hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Gift className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>Free First Reading</span>
            </button>

            <Link
              to="/tools/birth-chart"
              className="shrink-0 min-h-[46px] px-4 py-2.5 bg-[#FAF8F2] border border-[#C6A15B]/45 text-[#15243A] hover:border-[#164E3C] hover:text-[#164E3C] text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <Compass className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>Free Birth Chart</span>
            </Link>

            <button
              type="button"
              onClick={scrollToHoroscope}
              className="shrink-0 min-h-[46px] px-4 py-2.5 bg-[#FAF8F2] border border-[#C6A15B]/45 text-[#15243A] hover:border-[#164E3C] hover:text-[#164E3C] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>Today&apos;s Horoscope</span>
            </button>

            <button
              type="button"
              onClick={() => openBooking({ language: lang, consultationType: 'appointment' })}
              className="shrink-0 min-h-[46px] px-4 py-2.5 bg-[#C6A15B] text-[#15243A] hover:bg-[#EAD9AD] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Book an Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
