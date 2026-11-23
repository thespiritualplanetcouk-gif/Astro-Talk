import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import { useChat } from '../context/ChatContext';
import { EditorialImage } from '../components/EditorialImage';
import { InteractiveTiltCard } from '../components/InteractiveTiltCard';
import { SeoHead } from '../components/SeoHead';

export function ServicesOverviewPage() {
  const { t, loc } = useLanguage();
  const { openChat } = useChat();

  const groups: { key: 'islamic-spiritual' | 'astrology' | 'counseling'; label: string }[] = [
    { key: 'islamic-spiritual', label: 'Quran & Sunnah-Informed Spiritual Guidance' },
    { key: 'astrology', label: 'Classical Astrology & Abjad Studies' },
    { key: 'counseling', label: 'Marriage & Diaspora Family Guidance' },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F2] min-h-screen">
      <SeoHead
        title="Consultation Services & Disciplines"
        description="Explore all 10 dedicated consultation categories across classical astrology, Online Rohani Ilaj, Istikhara, Dua & Wazifa, Numerology, and Family Guidance."
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl pb-12 border-b border-[#C6A15B]/35">
          <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
            {t.nav.allServices}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#15243A]">
            {t.sections.servicesTitle}
          </h1>
          <p className="text-base text-[#4A5A53] mt-4 leading-relaxed">
            {t.sections.servicesSubtitle}
          </p>
        </header>

        <div className="mt-14 space-y-16">
          {groups.map((grp) => {
            const items = SERVICES.filter((s) => s.domain === grp.key);
            return (
              <section key={grp.key}>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#164E3C] mb-6 pb-3 border-b border-[#EAD9AD]">
                  {grp.label}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((svc) => (
                    <InteractiveTiltCard key={svc.slug} maxTilt={3.5} className="h-full">
                      <article className="group h-full bg-white gold-hairline flex flex-col overflow-hidden">
                        <div className="aspect-[16/10] overflow-hidden bg-[#F1F5EF]">
                          <EditorialImage
                            src={svc.image}
                            alt={loc(svc.title)}
                            objectPosition={svc.imagePosition}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                            fallbackTitle={loc(svc.title)}
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="tabular-nums-mono text-xs font-semibold text-[#C6A15B]">
                              {svc.order}
                            </span>
                            <h3 className="font-display text-2xl font-semibold text-[#15243A] mt-1">
                              <Link
                                to={`/services/${svc.slug}`}
                                className="hover:text-[#164E3C] transition-colors"
                              >
                                {loc(svc.title)}
                              </Link>
                            </h3>
                            <p className="text-sm text-[#4A5A53] mt-2.5 leading-relaxed">
                              {loc(svc.shortDescription)}
                            </p>
                          </div>
                          <div className="mt-6 pt-4 border-t border-[#EAD9AD]/70">
                            <Link
                              to={`/services/${svc.slug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#164E3C] group-hover:text-[#C6A15B]"
                            >
                              <span>{t.sections.exploreService}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </InteractiveTiltCard>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom Consultation Help Band */}
        <div className="mt-16 p-7 sm:p-9 bg-[#164E3C] text-white border border-[#C6A15B]/45 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">
              Need Help Choosing the Right Specialist?
            </h2>
            <p className="text-sm text-[#D8E5DF] mt-1.5">
              Start a live chat with our coordination desk or browse our transparent specialist directory.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={openChat}
              className="px-5 py-3 bg-[#C6A15B] text-[#15243A] font-semibold text-xs hover:bg-[#EAD9AD] transition-colors cursor-pointer"
            >
              {t.hero.chatCta}
            </button>
            <Link
              to="/experts"
              className="px-5 py-3 border border-[#EAD9AD]/50 text-white font-semibold text-xs hover:bg-white/10 transition-colors"
            >
              {t.nav.ourExperts}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
