import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { EXPERTS } from '../data/experts';
import { SERVICES } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import { ExpertCard } from '../components/ExpertCard';
import { SeoHead } from '../components/SeoHead';
import type { ConsultationMethod, Language } from '../types';

export function ExpertsPage() {
  const { t, loc } = useLanguage();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState(searchParams.get('service') || 'all');
  const [langFilter, setLangFilter] = useState(searchParams.get('langFilter') || 'all');
  const [methodFilter, setMethodFilter] = useState(searchParams.get('method') || 'all');
  const [minExp, setMinExp] = useState<number>(0);
  const [maxFee, setMaxFee] = useState<number>(10000);
  const [onlyBookable, setOnlyBookable] = useState<boolean>(false);

  const filtered = useMemo(() => {
    return EXPERTS.filter((e) => {
      if (serviceFilter !== 'all' && !e.serviceSlugs.includes(serviceFilter)) return false;
      if (langFilter !== 'all' && !e.languages.includes(langFilter as Language)) return false;
      if (
        methodFilter !== 'all' &&
        !e.consultationMethods.includes(methodFilter as ConsultationMethod)
      ) {
        return false;
      }
      if (e.experienceYears < minExp) return false;
      if (e.feePkr > maxFee) return false;
      if (onlyBookable && !e.availableForBooking) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const text = `${e.name.en} ${e.name.ur} ${e.primarySpeciality.en} ${e.title.en} ${e.bio.en}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [query, serviceFilter, langFilter, methodFilter, minExp, maxFee, onlyBookable]);

  const resetAll = () => {
    setQuery('');
    setServiceFilter('all');
    setLangFilter('all');
    setMethodFilter('all');
    setMinExp(0);
    setMaxFee(10000);
    setOnlyBookable(false);
  };

  return (
    <div className="pt-24 pb-20 bg-[#091426] min-h-screen">
      <SeoHead
        title="Our Experts — International Consultation Directory"
        description="Filter specialists across astrology, Online Rohani Ilaj, Istikhara, Numerology, and Family Guidance by language, consultation method, and schedule."
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl pb-10 border-b border-[#C6A35A]/20">
          <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A] mb-3">
            Hybrid Expert Marketplace
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F6F2E9]">
            {t.nav.ourExperts}
          </h1>
          <p className="text-base text-[#A9B2BE] mt-3 leading-relaxed">
            {t.sections.expertsSubtitle}
          </p>
        </header>

        {/* Honest Sample Template Disclosure */}
        <div className="mt-6 p-4 bg-[#0C3028]/50 border border-[#C6A35A]/25 text-xs text-[#D6DCE5] leading-relaxed">
          {t.sections.sampleNotice}
        </div>

        {/* Multi-Dimensional Filter Panel */}
        <div className="mt-8 p-5 sm:p-6 bg-[#0C192F] border border-[#C6A35A]/20 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-[#C6A35A] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.expertActions.searchPlaceholder}
                className="w-full h-11 ps-10 pe-4 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9] placeholder:text-[#7F8B99] focus:border-[#E5CD91] focus:outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <select
                aria-label="Filter by service"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9] focus:border-[#E5CD91] focus:outline-none"
              >
                <option value="all">{t.expertActions.filterAllServices}</option>
                {SERVICES.map((svc) => (
                  <option key={svc.slug} value={svc.slug}>
                    {loc(svc.title)}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                aria-label="Filter by language"
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9] focus:border-[#E5CD91] focus:outline-none"
              >
                <option value="all">{t.expertActions.filterAllLanguages}</option>
                <option value="en">{t.common.english}</option>
                <option value="ur">{t.common.urdu}</option>
                <option value="ar">{t.common.arabic}</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                aria-label="Filter by consultation method"
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9] focus:border-[#E5CD91] focus:outline-none"
              >
                <option value="all">{t.expertActions.filterAllMethods}</option>
                <option value="whatsapp">{t.finder.types.whatsapp}</option>
                <option value="phone">{t.finder.types.phone}</option>
                <option value="appointment">{t.finder.types.appointment}</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-[#C6A35A]/15 flex flex-wrap items-center justify-between gap-4 text-xs text-[#D6DCE5]">
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2">
                <span className="text-[#A9B2BE]">{t.expertActions.experience}:</span>
                <select
                  value={minExp}
                  onChange={(e) => setMinExp(Number(e.target.value))}
                  className="bg-[#091426] border border-[#C6A35A]/25 px-2.5 py-1.5 text-xs text-[#F6F2E9]"
                >
                  <option value={0}>{t.expertActions.filterAnyExperience}</option>
                  <option value={10}>10+ yrs</option>
                  <option value={14}>14+ yrs</option>
                </select>
              </label>

              <label className="flex items-center gap-2">
                <span className="text-[#A9B2BE]">Max Base Fee:</span>
                <select
                  value={maxFee}
                  onChange={(e) => setMaxFee(Number(e.target.value))}
                  className="bg-[#091426] border border-[#C6A35A]/25 px-2.5 py-1.5 text-xs text-[#F6F2E9] tabular-nums-mono"
                >
                  <option value={10000}>Any (PKR)</option>
                  <option value={5000}>Up to PKR 5,000</option>
                  <option value={6500}>Up to PKR 6,500</option>
                </select>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyBookable}
                  onChange={(e) => setOnlyBookable(e.target.checked)}
                  className="accent-[#C6A35A]"
                />
                <span>Open for Scheduled Requests</span>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <span className="tabular-nums-mono text-[#A9B2BE]">
                {filtered.length} / {EXPERTS.length}
              </span>
              <button
                type="button"
                onClick={resetAll}
                className="text-[#E5CD91] hover:underline cursor-pointer"
              >
                {t.expertActions.clearFilters}
              </button>
            </div>
          </div>
        </div>

        {/* Directory Results */}
        <div className="mt-10">
          {filtered.length === 0 ? (
            <div className="p-12 text-center border border-[#C6A35A]/20 bg-[#0C192F]">
              <p className="text-sm text-[#A9B2BE]">{t.expertActions.noResults}</p>
              <button
                type="button"
                onClick={resetAll}
                className="mt-4 px-5 py-2.5 bg-[#C6A35A] text-[#091426] font-semibold text-xs cursor-pointer"
              >
                {t.expertActions.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((expert) => (
                <ExpertCard key={expert.slug} expert={expert} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
