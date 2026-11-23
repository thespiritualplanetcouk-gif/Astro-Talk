import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, Globe, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { getExpertBySlug } from '../data/experts';
import { SERVICES } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { EditorialImage } from '../components/EditorialImage';
import { SeoHead } from '../components/SeoHead';
import { buildTelUrl, buildWhatsAppUrl } from '../utils/international';

export function ExpertProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, loc } = useLanguage();
  const { openBooking } = useBooking();

  const expert = slug ? getExpertBySlug(slug) : undefined;

  if (!expert) {
    return (
      <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center">
        <h1 className="font-display text-4xl text-[#F6F2E9]">Specialist Profile Not Found</h1>
        <Link
          to="/experts"
          className="inline-block mt-6 px-6 py-3 bg-[#C6A35A] text-[#091426] font-semibold text-sm"
        >
          {t.sections.viewAllExperts}
        </Link>
      </div>
    );
  }

  const associatedServices = SERVICES.filter((s) => expert.serviceSlugs.includes(s.slug));
  const waHref = buildWhatsAppUrl(
    expert.whatsappNumber,
    `Assalam-o-Alaikum, I would like to enquire about a private ${expert.primarySpeciality.en} consultation with ${expert.name.en} via ASTROTALK PK.`
  );

  return (
    <div className="pt-24 pb-20 bg-[#091426] min-h-screen">
      <SeoHead title={loc(expert.name)} description={loc(expert.bio)} />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-xs text-[#A9B2BE]">
          <Link to="/experts" className="text-[#E5CD91] hover:underline">
            {t.nav.ourExperts}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{loc(expert.primarySpeciality)}</span>
        </div>

        {expert.isSampleProfile && (
          <div className="mb-8 p-4 bg-[#0C3028]/55 border border-[#C6A35A]/30 text-xs text-[#E5CD91]">
            {t.sections.sampleNotice}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Portrait & Direct Booking Panel */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="aspect-[3/4] overflow-hidden border border-[#C6A35A]/30 bg-[#0C192F]">
              <EditorialImage
                src={expert.photo}
                alt={loc(expert.name)}
                priority
                className="w-full h-full object-cover object-top"
                fallbackTitle={loc(expert.name)}
              />
            </div>

            <div className="bg-[#0C192F] border border-[#C6A35A]/25 p-6 space-y-5">
              <div className="flex items-baseline justify-between pb-4 border-b border-[#C6A35A]/15">
                <span className="text-xs text-[#A9B2BE]">{t.expertActions.consultationFee}</span>
                <div className="text-end">
                  <span className="tabular-nums-mono text-2xl font-semibold text-[#F6F2E9]">
                    PKR {expert.feePkr.toLocaleString()}
                  </span>
                  <span className="block text-[11px] text-[#A9B2BE]">
                    {expert.sessionDurationMinutes} min · Disclosed Before Confirmation
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#0C3028] border border-[#C6A35A]/40 text-[#F6F2E9] text-sm font-semibold hover:bg-[#123D32] flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#E5CD91]" />
                  <span>{t.expertActions.whatsapp}</span>
                </a>

                {expert.consultationMethods.includes('phone') && (
                  <a
                    href={buildTelUrl(expert.phoneNumber)}
                    className="w-full py-3 px-4 bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9] text-sm font-medium hover:border-[#E5CD91] flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#C6A35A]" />
                    <span>{t.expertActions.call}</span>
                  </a>
                )}

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
                  className="w-full py-3 px-4 bg-[#C6A35A] text-[#091426] text-sm font-semibold hover:bg-[#E5CD91] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.expertActions.bookAppointment}</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: Full Dossier */}
          <div className="lg:col-span-8 space-y-10">
            <header className="pb-8 border-b border-[#C6A35A]/20">
              <p className="text-xs tracking-[0.14em] uppercase text-[#C6A35A]">
                {loc(expert.primarySpeciality)}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F6F2E9] mt-2">
                {loc(expert.name)}
              </h1>
              <p className="text-base text-[#C7D0DC] mt-2">{loc(expert.title)}</p>

              {/* Clean unboxed metadata strip */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#A9B2BE]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A35A]" />
                  {loc(expert.location)}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C6A35A]" />
                  {loc(expert.availabilityLabel)}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#C6A35A]" />
                  {expert.languages
                    .map((l) => (l === 'en' ? 'English' : l === 'ur' ? 'اردو' : 'العربية'))
                    .join(' / ')}
                </span>
              </div>
            </header>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-[#E5CD91]">
                Introduction &amp; Consultation Approach
              </h2>
              <p className="text-base text-[#D6DCE5] leading-relaxed">{loc(expert.bio)}</p>
              <p className="text-sm text-[#A9B2BE] leading-relaxed">{loc(expert.approach)}</p>
            </section>

            <section className="space-y-4 pt-6 border-t border-[#C6A35A]/15">
              <h2 className="font-display text-2xl font-semibold text-[#E5CD91]">
                Qualifications &amp; Experience Criteria
              </h2>
              <ul className="space-y-3 text-sm text-[#D6DCE5]">
                <li className="pb-2 border-b border-[#C6A35A]/10">
                  {t.expertActions.experience}: {loc(expert.yearsExperienceLabel)}
                </li>
                {expert.qualifications.map((q, idx) => (
                  <li key={idx} className="pb-2 border-b border-[#C6A35A]/10">
                    {loc(q)}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4 pt-6 border-t border-[#C6A35A]/15">
              <h2 className="font-display text-2xl font-semibold text-[#E5CD91]">
                Associated Consultation Categories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {associatedServices.map((svc) => (
                  <Link
                    key={svc.slug}
                    to={`/services/${svc.slug}`}
                    className="p-4 bg-[#0C192F] gold-hairline block"
                  >
                    <span className="font-display text-lg font-semibold text-[#F6F2E9]">
                      {loc(svc.title)}
                    </span>
                    <p className="text-xs text-[#A9B2BE] mt-1 line-clamp-2">
                      {loc(svc.shortDescription)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Genuine Reviews Verification Policy */}
            <section className="p-6 bg-[#0C192F] border border-[#C6A35A]/20 flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-[#C6A35A] shrink-0 mt-0.5" />
              <div>
                <h2 className="font-display text-xl font-semibold text-[#F6F2E9]">
                  Verified Client Reviews
                </h2>
                <p className="text-xs sm:text-sm text-[#A9B2BE] mt-1.5 leading-relaxed">
                  {t.sections.testimonialsPolicyBody}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
