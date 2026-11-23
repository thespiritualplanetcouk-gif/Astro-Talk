import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import type { ExpertProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { EditorialImage } from './EditorialImage';
import { InteractiveTiltCard } from './InteractiveTiltCard';
import { buildTelUrl, buildWhatsAppUrl } from '../utils/international';

interface ExpertCardProps {
  expert: ExpertProfile;
}

export function ExpertCard({ expert }: ExpertCardProps) {
  const { t, loc, lang } = useLanguage();
  const { openBooking } = useBooking();

  const langLabels = expert.languages
    .map((l) => (l === 'en' ? 'EN' : l === 'ur' ? 'اردو' : 'العربية'))
    .join(' · ');

  const waMessage = `Assalam-o-Alaikum, I saw the profile of ${expert.name.en} (${expert.primarySpeciality.en}) on ASTROTALK PK and would like to enquire about a private consultation.`;
  const waHref = buildWhatsAppUrl(expert.whatsappNumber, waMessage);

  return (
    <InteractiveTiltCard maxTilt={3.2} className="h-full">
      <article className="group h-full bg-white gold-hairline flex flex-col overflow-hidden">
        {/* Editorial Portrait Header with smooth hover zoom */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F1F5EF]">
          <EditorialImage
            src={expert.photo}
            alt={loc(expert.name)}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            fallbackTitle={loc(expert.name)}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#15243A]/85 via-[#15243A]/20 to-transparent"
          />

          {/* Subtle real bookable availability indicator top-start */}
          <div className="absolute top-3 start-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F2]/92 backdrop-blur-xs border border-[#C6A15B]/40 text-[10.5px] font-medium text-[#164E3C]">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-[#26745A] animate-status-pulse"
            />
            <span>{lang === 'ur' ? 'بکنگ دستیاب' : lang === 'ar' ? 'الحجز متاح' : 'Accepting Bookings'}</span>
          </div>

          <div className="absolute bottom-3 inset-x-4 flex items-end justify-between gap-2">
            <span className="text-[11px] font-medium tracking-wide text-[#EAD9AD]">
              {loc(expert.primarySpeciality)}
            </span>
            <span className="text-[11px] text-white tabular-nums-mono font-medium">
              PKR {expert.feePkr.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          {expert.isSampleProfile && (
            <p className="text-[11px] tracking-wide text-[#C6A15B] font-medium mb-1">
              {t.expertActions.sampleProfileTag}
            </p>
          )}

          <h3 className="font-display text-2xl font-semibold text-[#15243A] leading-snug">
            <Link to={`/experts/${expert.slug}`} className="hover:text-[#164E3C] transition-colors">
              {loc(expert.name)}
            </Link>
          </h3>
          <p className="text-xs text-[#4A5A53] mt-1">{loc(expert.title)}</p>

          {/* Clean Unboxed Metadata Row */}
          <dl className="mt-4 pt-4 border-t border-[#EAD9AD]/70 space-y-2 text-xs">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-[#6E7E77]">{t.expertActions.experience}</dt>
              <dd className="text-[#26332D] font-medium text-end">{loc(expert.yearsExperienceLabel)}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-[#6E7E77]">{t.expertActions.languages}</dt>
              <dd className="text-[#26332D] font-medium text-end">{langLabels}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-[#6E7E77]">{t.expertActions.availability}</dt>
              <dd className="text-[#4A5A53] text-end truncate max-w-[62%]">{expert.availabilityWindowPkt}</dd>
            </div>
          </dl>

          {/* Consultation Action Buttons with animated hover/press states */}
          <div className="mt-6 pt-4 border-t border-[#EAD9AD]/70 space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 px-3 text-xs font-semibold bg-[#164E3C] text-white border border-[#164E3C] hover:bg-[#26745A] active:scale-[0.98] transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#EAD9AD]" />
                <span>{t.expertActions.whatsapp}</span>
              </a>

              {expert.consultationMethods.includes('phone') ? (
                <a
                  href={buildTelUrl(expert.phoneNumber)}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 px-3 text-xs font-semibold bg-[#FAF8F2] text-[#164E3C] border border-[#C6A15B]/55 hover:bg-[#F1F5EF] hover:border-[#164E3C] active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{t.expertActions.call}</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    openBooking({
                      expertSlug: expert.slug,
                      serviceSlug: expert.serviceSlugs[0],
                      language: lang,
                      consultationType: 'appointment',
                    })
                  }
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 px-3 text-xs font-semibold bg-[#FAF8F2] text-[#164E3C] border border-[#C6A15B]/55 hover:bg-[#F1F5EF] hover:border-[#164E3C] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{t.expertActions.bookAppointment}</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() =>
                  openBooking({
                    expertSlug: expert.slug,
                    serviceSlug: expert.serviceSlugs[0],
                    language: lang,
                    consultationType: 'appointment',
                  })
                }
                className="text-xs font-semibold text-[#164E3C] hover:text-[#C6A15B] transition-colors cursor-pointer py-1"
              >
                {t.expertActions.bookAppointment}
              </button>
              <Link
                to={`/experts/${expert.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#15243A] hover:text-[#164E3C] transition-colors py-1"
              >
                <span>{t.sections.viewProfile}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </InteractiveTiltCard>
  );
}
