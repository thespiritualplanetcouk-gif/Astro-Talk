import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, Globe, MapPin, MessageCircle, Phone, ShieldCheck, MessageSquare } from 'lucide-react';
import { getExpertBySlug } from '../data/experts';
import { SERVICES } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useChat } from '../context/ChatContext';
import { EditorialImage } from '../components/EditorialImage';
import { SeoHead } from '../components/SeoHead';
import { buildTelUrl, buildWhatsAppUrl } from '../utils/international';

export function ExpertProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, loc } = useLanguage();
  const { openBooking } = useBooking();
  const { openChat } = useChat();

  const expert = slug ? getExpertBySlug(slug) : undefined;

  if (!expert) {
    return (
      <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center bg-[#FAF8F2] min-h-screen">
        <h1 className="font-display text-4xl text-[#15243A]">Specialist Profile Not Found</h1>
        <Link
          to="/experts"
          className="inline-block mt-6 px-6 py-3 bg-[#164E3C] text-white font-semibold text-sm"
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
    <div className="pt-24 pb-20 bg-[#FAF8F2] min-h-screen text-[#26332D]">
      <SeoHead title={loc(expert.name)} description={loc(expert.bio)} />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-xs text-[#6E7E77]">
          <Link to="/experts" className="text-[#164E3C] font-semibold hover:underline">
            {t.nav.ourExperts}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{loc(expert.primarySpeciality)}</span>
        </div>

        {expert.isSampleProfile && (
          <div className="mb-8 p-4 bg-[#F1F5EF] border border-[#164E3C]/20 text-xs text-[#26332D]">
            {t.sections.sampleNotice}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Portrait & Direct Booking Panel */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="aspect-[3/4] overflow-hidden border border-[#C6A15B]/45 bg-white shadow-sm">
              <EditorialImage
                src={expert.photo}
                alt={loc(expert.name)}
                priority
                className="w-full h-full object-cover object-top"
                fallbackTitle={loc(expert.name)}
              />
            </div>

            <div className="bg-white border border-[#C6A15B]/40 p-6 space-y-5 shadow-xs">
              <div className="flex items-baseline justify-between pb-4 border-b border-[#EAD9AD]">
                <span className="text-xs text-[#6E7E77]">{t.expertActions.consultationFee}</span>
                <div className="text-end">
                  <span className="tabular-nums-mono text-2xl font-semibold text-[#15243A]">
                    PKR {expert.feePkr.toLocaleString()}
                  </span>
                  <span className="block text-[11px] text-[#6E7E77]">
                    {expert.sessionDurationMinutes} min · Disclosed Before Confirmation
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] py-3 px-4 bg-[#164E3C] text-white text-sm font-semibold hover:bg-[#26745A] flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#EAD9AD]" />
                  <span>{t.expertActions.whatsapp}</span>
                </a>

                {expert.consultationMethods.includes('phone') && (
                  <a
                    href={buildTelUrl(expert.phoneNumber)}
                    className="w-full min-h-[46px] py-3 px-4 bg-[#FAF8F2] border border-[#C6A15B]/55 text-[#164E3C] text-sm font-semibold hover:border-[#164E3C] flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#C6A15B]" />
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
                  className="w-full min-h-[46px] py-3 px-4 bg-[#C6A15B] text-[#15243A] text-sm font-semibold hover:bg-[#EAD9AD] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.expertActions.bookAppointment}</span>
                </button>

                <button
                  type="button"
                  onClick={openChat}
                  className="w-full min-h-[44px] py-2.5 px-4 bg-[#F1F5EF] border border-[#164E3C]/20 text-[#164E3C] text-xs font-semibold hover:bg-[#164E3C] hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{t.hero.chatCta}</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: Full Dossier */}
          <div className="lg:col-span-8 space-y-10">
            <header className="pb-8 border-b border-[#C6A15B]/35">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs tracking-[0.16em] uppercase text-[#164E3C] font-semibold">
                  {loc(expert.primarySpeciality)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#26745A]">
                  <span className="w-2 h-2 rounded-full bg-[#26745A] animate-status-pulse" />
                  Accepting Requests
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#15243A] mt-2">
                {loc(expert.name)}
              </h1>
              <p className="text-base text-[#4A5A53] mt-2">{loc(expert.title)}</p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#4A5A53]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                  {loc(expert.location)}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
                  {loc(expert.availabilityLabel)}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#C6A15B]" />
                  {expert.languages
                    .map((l) => (l === 'en' ? 'English' : l === 'ur' ? 'اردو' : 'العربية'))
                    .join(' / ')}
                </span>
              </div>
            </header>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-[#164E3C]">
                Introduction &amp; Consultation Approach
              </h2>
              <p className="text-base text-[#26332D] leading-relaxed">{loc(expert.bio)}</p>
              <p className="text-sm text-[#4A5A53] leading-relaxed">{loc(expert.approach)}</p>
            </section>

            <section className="space-y-4 pt-6 border-t border-[#EAD9AD]">
              <h2 className="font-display text-2xl font-semibold text-[#164E3C]">
                Qualifications &amp; Experience Criteria
              </h2>
              <ul className="space-y-3 text-sm text-[#26332D]">
                <li className="pb-2 border-b border-[#EAD9AD]/70">
                  {t.expertActions.experience}: {loc(expert.yearsExperienceLabel)}
                </li>
                {expert.qualifications.map((q, idx) => (
                  <li key={idx} className="pb-2 border-b border-[#EAD9AD]/70">
                    {loc(q)}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4 pt-6 border-t border-[#EAD9AD]">
              <h2 className="font-display text-2xl font-semibold text-[#164E3C]">
                Associated Consultation Categories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {associatedServices.map((svc) => (
                  <Link
                    key={svc.slug}
                    to={`/services/${svc.slug}`}
                    className="p-4 bg-white gold-hairline block"
                  >
                    <span className="font-display text-lg font-semibold text-[#15243A]">
                      {loc(svc.title)}
                    </span>
                    <p className="text-xs text-[#4A5A53] mt-1 line-clamp-2">
                      {loc(svc.shortDescription)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Genuine Reviews Verification Policy */}
            <section className="p-6 bg-[#F1F5EF] border border-[#164E3C]/20 flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-[#164E3C] shrink-0 mt-0.5" />
              <div>
                <h2 className="font-display text-xl font-semibold text-[#15243A]">
                  Verified Client Reviews
                </h2>
                <p className="text-xs sm:text-sm text-[#4A5A53] mt-1.5 leading-relaxed">
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
