import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import { EditorialImage } from '../components/EditorialImage';
import { SeoHead } from '../components/SeoHead';

export function ServicesOverviewPage() {
  const { t, loc } = useLanguage();

  const groups: { key: 'islamic-spiritual' | 'astrology' | 'counseling'; label: string }[] = [
    { key: 'islamic-spiritual', label: 'Quran & Sunnah-Informed Spiritual Guidance' },
    { key: 'astrology', label: 'Classical Astrology & Abjad Studies' },
    { key: 'counseling', label: 'Marriage & Diaspora Family Guidance' },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#091426] min-h-screen">
      <SeoHead
        title="Consultation Services & Disciplines"
        description="Explore all 10 dedicated consultation categories across classical astrology, Online Rohani Ilaj, Istikhara, Dua & Wazifa, Numerology, and Family Guidance."
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl pb-12 border-b border-[#C6A35A]/20">
          <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A] mb-3">
            {t.nav.allServices}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F6F2E9]">
            {t.sections.servicesTitle}
          </h1>
          <p className="text-base text-[#A9B2BE] mt-4 leading-relaxed">
            {t.sections.servicesSubtitle}
          </p>
        </header>

        <div className="mt-14 space-y-16">
          {groups.map((grp) => {
            const items = SERVICES.filter((s) => s.domain === grp.key);
            return (
              <section key={grp.key}>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#E5CD91] mb-6 pb-3 border-b border-[#C6A35A]/15">
                  {grp.label}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((svc) => (
                    <article
                      key={svc.slug}
                      className="group bg-[#0C192F] gold-hairline flex flex-col overflow-hidden"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-[#081223]">
                        <EditorialImage
                          src={svc.image}
                          alt={loc(svc.title)}
                          objectPosition={svc.imagePosition}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          fallbackTitle={loc(svc.title)}
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="tabular-nums-mono text-xs text-[#C6A35A]">
                            {svc.order}
                          </span>
                          <h3 className="font-display text-2xl font-semibold text-[#F6F2E9] mt-1">
                            <Link
                              to={`/services/${svc.slug}`}
                              className="hover:text-[#E5CD91] transition-colors"
                            >
                              {loc(svc.title)}
                            </Link>
                          </h3>
                          <p className="text-sm text-[#A9B2BE] mt-2.5 leading-relaxed">
                            {loc(svc.shortDescription)}
                          </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-[#C6A35A]/15">
                          <Link
                            to={`/services/${svc.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E5CD91] hover:underline"
                          >
                            <span>{t.sections.exploreService}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
