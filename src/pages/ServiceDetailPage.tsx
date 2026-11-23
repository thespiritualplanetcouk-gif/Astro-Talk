import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronDown, ShieldCheck, ArrowUpRight, MessageSquare } from 'lucide-react';
import { getServiceBySlug, SERVICES } from '../data/services';
import { getExpertsForService } from '../data/experts';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useChat } from '../context/ChatContext';
import { EditorialImage } from '../components/EditorialImage';
import { ExpertCard } from '../components/ExpertCard';
import { SeoHead } from '../components/SeoHead';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, loc } = useLanguage();
  const { openBooking } = useBooking();
  const { openChat } = useChat();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return (
      <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center bg-[#FAF8F2] min-h-screen">
        <h1 className="font-display text-4xl text-[#15243A]">Service Not Found</h1>
        <Link
          to="/services"
          className="inline-block mt-6 px-6 py-3 bg-[#164E3C] text-white font-semibold text-sm"
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
    <div className="pt-16 bg-[#FAF8F2] min-h-screen text-[#26332D]">
      <SeoHead title={loc(service.title)} description={loc(service.shortDescription)} />

      {/* Light Luxury Service Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-[#FAF8F2] to-[#F1F5EF] border-b border-[#C6A15B]/30 islamic-lattice-ivory">
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs text-[#164E3C] font-semibold">
                <Link to="/services" className="hover:underline">
                  {t.nav.allServices}
                </Link>
                <span aria-hidden="true">/</span>
                <span className="tabular-nums-mono text-[#C6A15B]">{service.order}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#15243A] leading-tight">
                {loc(service.title)}
              </h1>

              <p className="text-base sm:text-lg text-[#4A5A53] leading-relaxed max-w-2xl">
                {loc(service.heroLead)}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() =>
                    openBooking({
                      serviceSlug: service.slug,
                      language: lang,
                      consultationType: 'appointment',
                    })
                  }
                  className="inline-flex items-center gap-2 min-h-[46px] px-6 py-3.5 bg-[#164E3C] text-white font-semibold text-sm hover:bg-[#26745A] transition-colors cursor-pointer"
                >
                  <span>{t.nav.bookConsultation}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
                <Link
                  to={`/experts?service=${service.slug}`}
                  className="inline-flex items-center min-h-[46px] px-6 py-3.5 bg-white border border-[#C6A15B]/60 text-[#15243A] text-sm font-semibold hover:border-[#164E3C] hover:text-[#164E3C] transition-colors"
                >
                  {t.common.availableSpecialists}
                </Link>
                <button
                  type="button"
                  onClick={openChat}
                  className="inline-flex items-center gap-2 min-h-[46px] px-5 py-3.5 bg-[#FAF8F2] border border-[#164E3C]/25 text-[#164E3C] text-sm font-semibold hover:bg-[#164E3C] hover:text-white transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#C6A15B]" />
                  <span>{t.hero.chatCta}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] overflow-hidden border border-[#C6A15B]/45 bg-white shadow-lg">
                <EditorialImage
                  src={service.image}
                  alt={loc(service.title)}
                  objectPosition={service.imagePosition}
                  priority
                  className="w-full h-full object-cover"
                  fallbackTitle={loc(service.title)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Introduction & Key Pillars */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 space-y-5">
              {service.introduction.map((para, i) => (
                <p key={i} className="text-base text-[#26332D] leading-[1.85] max-w-prose">
                  {loc(para)}
                </p>
              ))}

              <div className="mt-8 p-6 bg-[#F1F5EF] border border-[#164E3C]/20 flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-[#164E3C] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#164E3C]">
                    {t.common.responsibleGuidanceTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4A5A53] mt-1.5 leading-relaxed">
                    {loc(service.ethicalBoundary)}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              {service.pillars.map((pillar, idx) => (
                <div key={idx} className="p-6 bg-[#FAF8F2] gold-hairline">
                  <span className="tabular-nums-mono text-xs font-semibold text-[#C6A15B]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-[#15243A] mt-1">
                    {loc(pillar.title)}
                  </h3>
                  <p className="text-sm text-[#4A5A53] mt-2 leading-relaxed">
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
        <section className="py-16 bg-[#164E3C] border-y border-[#C6A15B]/35 islamic-lattice-bg text-white">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
              Authentic Quranic &amp; Prophetic References
            </h2>

            {service.duaReferences.map((dua, i) => (
              <div
                key={i}
                className="bg-[#FAF8F2] text-[#26332D] border border-[#C6A15B]/50 p-7 sm:p-9 space-y-5 shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#EAD9AD]">
                  <h3 className="font-display text-2xl font-semibold text-[#164E3C]">
                    {loc(dua.title)}
                  </h3>
                  <span className="text-xs text-[#6E7E77] font-medium">{dua.reference}</span>
                </div>

                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl sm:text-3xl text-[#15243A] leading-[2.1] text-end"
                >
                  {dua.arabic}
                </p>

                <p className="text-xs italic text-[#164E3C] font-medium leading-relaxed">
                  {dua.transliteration}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#EAD9AD]">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#6E7E77] mb-1.5">
                      English Meaning
                    </p>
                    <p className="text-sm text-[#26332D] leading-relaxed">
                      {dua.englishTranslation}
                    </p>
                  </div>
                  <div dir="rtl" lang="ur">
                    <p className="text-xs text-[#6E7E77] mb-1.5 font-urdu">اردو ترجمہ</p>
                    <p className="text-sm text-[#26332D] font-urdu leading-[2.2]">
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
      <section className="py-16 bg-[#FAF8F2]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-[#15243A] mb-8">
            {t.sections.howItWorksTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.processSteps.map((step, i) => (
              <div key={i} className="p-6 bg-white gold-hairline">
                <span className="tabular-nums-mono text-xs font-semibold text-[#C6A15B]">
                  0{i + 1}
                </span>
                <p className="text-sm sm:text-base text-[#26332D] mt-3 leading-relaxed">
                  {loc(step)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Matched Specialists */}
      <section className="py-16 bg-[#F1F5EF] border-y border-[#C6A15B]/30">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#15243A]">
                {t.common.availableSpecialists}
              </h2>
              <p className="text-xs text-[#4A5A53] mt-2">{t.sections.sampleNotice}</p>
            </div>
            <Link
              to="/experts"
              className="text-xs font-semibold text-[#164E3C] hover:underline whitespace-nowrap"
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
      <section className="py-16 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-semibold text-[#15243A] mb-6">
              {t.common.faqHeading}
            </h2>
            <div className="divide-y divide-[#EAD9AD] border-y border-[#EAD9AD]">
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
                      <span className="text-base font-medium text-[#15243A]">
                        {loc(faq.question)}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#164E3C] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="text-sm text-[#4A5A53] mt-3 leading-relaxed">
                        {loc(faq.answer)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Post-FAQ Conversion Strip */}
            <div className="mt-8 p-6 bg-[#F1F5EF] border border-[#C6A15B]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-display text-xl font-semibold text-[#15243A]">
                  Ready to discuss your questions privately?
                </p>
                <p className="text-xs text-[#4A5A53] mt-0.5">
                  Request a session in your local time zone or start a live chat with our team.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openBooking({
                    serviceSlug: service.slug,
                    language: lang,
                    consultationType: 'appointment',
                  })
                }
                className="px-5 py-3 bg-[#164E3C] text-white text-xs font-semibold hover:bg-[#26745A] transition-colors whitespace-nowrap cursor-pointer"
              >
                {t.nav.bookConsultation}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <h2 className="font-display text-3xl font-semibold text-[#15243A]">
              {t.common.relatedServices}
            </h2>
            <div className="space-y-3">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  className="block p-5 bg-[#FAF8F2] gold-hairline"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-xl font-semibold text-[#15243A]">
                      {loc(rel.title)}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#C6A15B]" />
                  </div>
                  <p className="text-xs text-[#4A5A53] mt-1.5 line-clamp-2">
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
