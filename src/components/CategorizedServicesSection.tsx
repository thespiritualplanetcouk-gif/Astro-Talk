import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, MessageCircle, ShieldCheck } from 'lucide-react';
import {
  CENTRAL_WHATSAPP_NUMBER,
  HOMEPAGE_SERVICE_GROUPS,
  type HomepageServiceGroup,
} from '../data/homepageContent';
import { useBooking } from '../context/BookingContext';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/international';
import { EditorialImage } from './EditorialImage';
import { InteractiveTiltCard } from './InteractiveTiltCard';

export function CategorizedServicesSection() {
  const { lang } = useLanguage();
  const { openBooking } = useBooking();
  const [activeGroup, setActiveGroup] = useState<'all' | HomepageServiceGroup['id']>('all');

  const visibleGroups =
    activeGroup === 'all'
      ? HOMEPAGE_SERVICE_GROUPS
      : HOMEPAGE_SERVICE_GROUPS.filter((g) => g.id === activeGroup);

  const filterButtons: { id: 'all' | HomepageServiceGroup['id']; label: string }[] = [
    { id: 'all', label: 'All Services (5 Categories)' },
    { id: 'astrology', label: 'Astrology' },
    { id: 'rohani', label: 'Rohani Guidance' },
    { id: 'marriage-istikhara', label: 'Marriage & Istikhara' },
    { id: 'business-personal', label: 'Business & Personal' },
    { id: 'health-wellbeing', label: 'Health & Wellbeing' },
  ];

  const surfaceClass = (style: HomepageServiceGroup['accentStyle']) => {
    if (style === 'sage') return 'bg-[#F1F5EF] border-y border-[#C6A15B]/30';
    if (style === 'white') return 'bg-white border-y border-[#EAD9AD]/70';
    return 'bg-[#FAF8F2]';
  };

  return (
    <div id="services-catalog">
      {/* Interactive Category Navigation Bar */}
      <div className="bg-[#FAF8F2] border-b border-[#C6A15B]/30 pt-4 pb-8">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#164E3C] mb-2">
                Dedicated Specialist Disciplines · Astrology &amp; Islamic Guidance Kept Separate
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#15243A]">
                Explore Consultation Services – ہماری خدمات
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#164E3C] hover:text-[#C6A15B] transition-colors whitespace-nowrap shrink-0"
            >
              <span>View Full Services Guide</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setActiveGroup(btn.id)}
                className={`min-h-[44px] px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeGroup === btn.id
                    ? 'bg-[#164E3C] text-white shadow-xs'
                    : 'bg-white text-[#26332D] border border-[#C6A15B]/40 hover:border-[#164E3C]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render Each Service Group as Its Own Spacious Section */}
      {visibleGroups.map((group) => (
        <section
          key={group.id}
          id={`service-group-${group.id}`}
          className={`py-16 lg:py-20 ${surfaceClass(group.accentStyle)}`}
        >
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#164E3C] mb-2">
                  {group.number} · {group.domainTag}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#15243A] leading-snug">
                  {group.title}
                </h3>
                <p className="text-sm sm:text-base text-[#4A5A53] mt-2.5 leading-relaxed">
                  {group.subtitle}
                </p>
              </div>
              <span className="text-xs text-[#6E7E77] md:hidden">
                Swipe horizontally to explore →
              </span>
            </div>

            {/* Mandatory Ethical / Medical Care Notice where applicable */}
            {group.ethicalNotice && (
              <div className="mb-8 p-4 sm:p-5 bg-white border border-[#164E3C]/25 flex items-start gap-3 text-xs sm:text-sm text-[#26332D] leading-relaxed">
                <ShieldCheck className="w-5 h-5 text-[#164E3C] shrink-0 mt-0.5" />
                <p>{group.ethicalNotice}</p>
              </div>
            )}

            {/* Mobile Swipeable Carousel -> Tablet 2-Col -> Desktop 3-Col */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 no-scrollbar">
              {group.cards.map((card, idx) => {
                const waHref = buildWhatsAppUrl(CENTRAL_WHATSAPP_NUMBER, card.whatsappText);
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                    className="shrink-0 w-[84vw] max-w-[330px] sm:w-auto sm:max-w-none snap-start"
                  >
                    <InteractiveTiltCard maxTilt={3.5} className="h-full">
                      <article className="group h-full bg-white gold-hairline flex flex-col overflow-hidden">
                        {/* Unique Service Photo */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#F1F5EF]">
                          <EditorialImage
                            src={card.image}
                            alt={card.imageAlt}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                            fallbackTitle={card.headline}
                          />
                        </div>

                        {/* Card Copy & Dual Conversion Actions */}
                        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-display text-xl sm:text-[22px] font-semibold text-[#15243A] leading-snug group-hover:text-[#164E3C] transition-colors">
                              <Link to={card.actionRoute}>{card.headline}</Link>
                            </h4>
                            <p className="text-xs sm:text-sm text-[#4A5A53] mt-2.5 leading-relaxed">
                              {card.description}
                            </p>
                          </div>

                          <div className="mt-5 pt-4 border-t border-[#EAD9AD]/70 space-y-2.5">
                            <div className="grid grid-cols-2 gap-2">
                              <a
                                href={waHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-h-[42px] px-3 py-2 bg-[#164E3C] text-white hover:bg-[#26745A] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-[#EAD9AD] shrink-0" />
                                <span>WhatsApp</span>
                              </a>
                              <button
                                type="button"
                                onClick={() =>
                                  openBooking({
                                    serviceSlug: card.serviceSlug,
                                    language: lang,
                                    initialNote: `Consultation enquiry: ${card.headline}`,
                                  })
                                }
                                className="min-h-[42px] px-3 py-2 bg-[#FAF8F2] border border-[#C6A15B]/50 text-[#15243A] hover:border-[#164E3C] hover:text-[#164E3C] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                              >
                                <Calendar className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                                <span>Book Now</span>
                              </button>
                            </div>

                            <Link
                              to={card.actionRoute}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#164E3C] hover:text-[#C6A15B] transition-colors"
                            >
                              <span>{card.actionLabel}</span>
                              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </InteractiveTiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
