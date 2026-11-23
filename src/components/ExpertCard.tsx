import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import type { ExpertProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { EditorialImage } from './EditorialImage';
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
    <article className="group bg-[#0C192F] gold-hairline flex flex-col overflow-hidden">
      {/* Editorial Portrait Header */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#081223]">
        <EditorialImage
          src={expert.photo}
          alt={loc(expert.name)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          fallbackTitle={loc(expert.name)}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#091426] via-[#091426]/25 to-transparent"
        />
        <div className="absolute bottom-3 inset-x-4 flex items-end justify-between gap-2">
          <span className="text-[11px] tracking-wide text-[#E5CD91]">
            {loc(expert.primarySpeciality)}
          </span>
          <span className="text-[11px] text-[#D6DCE5] tabular-nums-mono">
            PKR {expert.feePkr.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Quiet unboxed sample notice — zero pill boxes */}
        {expert.isSampleProfile && (
          <p className="text-[11px] tracking-wide text-[#C6A35A]/85 mb-1.5">
            {t.expertActions.sampleProfileTag}
          </p>
        )}

        <h3 className="font-display text-xl font-semibold text-[#F6F2E9] leading-snug">
          <Link to={`/experts/${expert.slug}`} className="hover:text-[#E5CD91] transition-colors">
            {loc(expert.name)}
          </Link>
        </h3>
        <p className="text-xs text-[#A9B2BE] mt-1">{loc(expert.title)}</p>

        {/* Clean Unboxed Metadata Row with typographic separators */}
        <dl className="mt-4 pt-4 border-t border-[#C6A35A]/15 space-y-2 text-xs">
          <div className="flex items-center justify-between gap-2">
            <dt className="text-[#8F9BA9]">{t.expertActions.experience}</dt>
            <dd className="text-[#F6F2E9] text-end">{loc(expert.yearsExperienceLabel)}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-[#8F9BA9]">{t.expertActions.languages}</dt>
            <dd className="text-[#F6F2E9] text-end">{langLabels}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-[#8F9BA9]">{t.expertActions.availability}</dt>
            <dd className="text-[#D6DCE5] text-end truncate max-w-[62%]">{expert.availabilityWindowPkt}</dd>
          </div>
        </dl>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-[#C6A35A]/15 space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium bg-[#0C3028] text-[#F6F2E9] border border-[#C6A35A]/30 hover:bg-[#123D32] hover:border-[#E5CD91] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#E5CD91]" />
              <span>{t.expertActions.whatsapp}</span>
            </a>

            {expert.consultationMethods.includes('phone') ? (
              <a
                href={buildTelUrl(expert.phoneNumber)}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium bg-[#091426] text-[#F6F2E9] border border-[#C6A35A]/25 hover:border-[#E5CD91] transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#C6A35A]" />
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
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium bg-[#091426] text-[#F6F2E9] border border-[#C6A35A]/25 hover:border-[#E5CD91] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C6A35A]" />
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
              className="text-xs font-medium text-[#E5CD91] hover:underline cursor-pointer"
            >
              {t.expertActions.bookAppointment}
            </button>
            <Link
              to={`/experts/${expert.slug}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#F6F2E9] hover:text-[#E5CD91] transition-colors"
            >
              <span>{t.sections.viewProfile}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
