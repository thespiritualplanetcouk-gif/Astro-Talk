import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronDown, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { getServiceBySlug, SERVICES } from '../data/services';
import { getExpertsForService } from '../data/experts';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { EditorialImage } from '../components/EditorialImage';
import { ExpertCard } from '../components/ExpertCard';
import { SeoHead } from '../components/SeoHead';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, loc } = useLanguage();
  const { openBooking } = useBooking();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return (
      <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center">
        <h1 className="font-display text-4xl text-[#F6F2E9]">Service Not Found</h1>
        <Link
          to="/services"
          className="inline-block mt-6 px-6 py-3 bg-[#C6A35A] text-[#091426] font-semibold text-sm"
        >
          {t.sections.viewAllServices}
        </Link>
      </div>
    );
  }

  const matchedExperts = getExpertsForService(service.slug);
  const relatedServices = service.relatedSlugs
    .map((rs) => SERVICES.find((s) => s.slug === rs))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="pt-16 bg-[#091426] min-h-screen">
      <SeoHead title={loc(service.title)} description={loc(service.shortDescription)} />

      {/* Service Hero */}
      <section className="relative py-20 lg:py-24 overflow-hidden border-b border-[#C6A35A]/20">
        <div className="absolute inset-0">
          <EditorialImage
            src={service.image}
            alt={loc(service.title)}
            objectPosition={service.imagePosition}
            priority
            className="w-full h-full object-cover opacity-22"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091426] via-[#091426]/90 to-[#091426]/70" />
          <div className="absolute inset-0 islamic-lattice-bg opacity-60" />
        </div>

        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs text-[#E5CD91]">
                <Link to="/services" className="hover:underline">
                  {t.nav.allServices}
                </Link>
                <span aria-hidden="true">/</span>
                <span className="tabular-nums-mono">{service.order}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F6F2E9] leading-tight">
                {loc(service.title)}
              </h1>

              <p className="text-base sm:text-lg text-[#C7D0DC] leading-relaxed max-w-2xl">
                {loc(service.heroLead)}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openBooking({
                      serviceSlug: service.slug,
                      language: lang,
                      consultationType: 'appointment',
                    })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C6A35A] text-[#091426] font-semibold text-sm hover:bg-[#E5CD91] transition-colors cursor-pointer"
                >
                  <span>{t.nav.bookConsultation}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
                <Link
                  to={`/experts?service=${service.slug}`}
                  className="px-6 py-3.5 border border-[#C6A35A]/40 text-[#F6F2E9] text-sm font-medium hover:border-[#E5CD91] hover:text-[#E5CD91] transition-colors"
                >
                  {t.common.availableSpecialists}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] overflow-hidden border border-[#C6A35A]/30 bg-[#0C192F]">
                <EditorialImage
                  src={service.image}
                  alt={loc(service.title)}
                  objectPosition={service.imagePosition}
                  className="w-full h-full object-cover"
                  fallbackTitle={loc(service.title)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Introduction & Key Pillars */}
      <section className="py-16 lg:py-20 bg-[#F6F2E9] text-[#091426]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 space-y-5">
              {service.introduction.map((para, i) => (
                <p
                  key={i}
                  className="text-base text-[#243244] leading-[1.8] max-w-prose"
                >
                  {loc(para)}
                </p>
              ))}

              {/* Responsible Guidance Charter Box (subtle hairline border — no thick left stripe) */}
              <div className="mt-8 p-6 bg-white border border-[#0C3028]/20 flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-[#0C3028] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#0C3028]">
                    {t.common.responsibleGuidanceTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#3A495C] mt-1.5 leading-relaxed">
                    {loc(service.ethicalBoundary)}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              {service.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-[#091426]/12"
                >
                  <span className="tabular-nums-mono text-xs text-[#8D6E2E]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-[#091426] mt-1">
                    {loc(pillar.title)}
                  </h3>
                  <p className="text-sm text-[#3A495C] mt-2 leading-relaxed">
                    {loc(pillar.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Arabic + Urdu Dua & Wazifa Reference Section (when applicable) */}
      {service.duaReferences && service.duaReferences.length > 0 && (
        <section className="py-16 bg-[#0C3028] border-y border-[#C6A35A]/25 islamic-lattice-bg">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F6F2E9]">
              Authentic Quranic &amp; Prophetic References
            </h2>

            {service.duaReferences.map((dua, i) => (
              <div
                key={i}
                className="bg-[#091426]/95 border border-[#C6A35A]/30 p-7 sm:p-9 space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#C6A35A]/15">
                  <h3 className="font-display text-2xl font-semibold text-[#E5CD91]">
                    {loc(dua.title)}
                  </h3>
                  <span className="text-xs text-[#A9B2BE]">{dua.reference}</span>
                </div>

                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl sm:text-3xl text-[#F6F2E9] leading-[2.1] text-end"
                >
                  {dua.arabic}
                </p>

                <p className="text-xs italic text-[#C6A35A] leading-relaxed">
                  {dua.transliteration}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#C6A35A]/15">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#A9B2BE] mb-1.5">
                      English Meaning
                    </p>
                    <p className="text-sm text-[#D6DCE5] leading-relaxed">
                      {dua.englishTranslation}
                    </p>
                  </div>
                  <div dir="rtl" lang="ur">
                    <p className="text-xs text-[#A9B2BE] mb-1.5 font-urdu">اردو ترجمہ</p>
                    <p className="text-sm text-[#F6F2E9] font-urdu leading-[2.2]">
                      {dua.urduTranslation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Consultation Steps */}
      <section className="py-16 bg-[#091426]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-[#F6F2E9] mb-8">
            {t.sections.howItWorksTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.processSteps.map((step, i) => (
              <div key={i} className="p-6 bg-[#0C192F] border border-[#C6A35A]/20">
                <span className="tabular-nums-mono text-xs text-[#E5CD91]">
                  0{i + 1}
                </span>
                <p className="text-sm sm:text-base text-[#F6F2E9] mt-3 leading-relaxed">
                  {loc(step)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Matched Specialists */}
      <section className="py-16 bg-[#07101F] border-y border-[#C6A35A]/15">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F6F2E9]">
                {t.common.availableSpecialists}
              </h2>
              <p className="text-xs text-[#A9B2BE] mt-2">{t.sections.sampleNotice}</p>
            </div>
            <Link
              to="/experts"
              className="text-xs font-semibold text-[#E5CD91] hover:underline whitespace-nowrap"
            >
              {t.sections.viewAllExperts}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedExperts.map((exp) => (
              <ExpertCard key={exp.slug} expert={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQs & Related Services */}
      <section className="py-16 bg-[#091426]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-semibold text-[#F6F2E9] mb-6">
              {t.common.faqHeading}
            </h2>
            <div className="divide-y divide-[#C6A35A]/20 border-y border-[#C6A35A]/20">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-start cursor-pointer"
                    >
                      <span className="text-base font-medium text-[#F6F2E9]">
                        {loc(faq.question)}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#C6A35A] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="text-sm text-[#A9B2BE] mt-3 leading-relaxed">
                        {loc(faq.answer)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <h2 className="font-display text-3xl font-semibold text-[#F6F2E9]">
              {t.common.relatedServices}
            </h2>
            <div className="space-y-3">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  className="block p-5 bg-[#0C192F] gold-hairline"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-xl font-semibold text-[#F6F2E9]">
                      {loc(rel.title)}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#C6A35A]" />
                  </div>
                  <p className="text-xs text-[#A9B2BE] mt-1.5 line-clamp-2">
                    {loc(rel.shortDescription)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
