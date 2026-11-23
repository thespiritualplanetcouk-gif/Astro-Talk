import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
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
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const activeFilterCount =
    (serviceFilter !== 'all' ? 1 : 0) +
    (langFilter !== 'all' ? 1 : 0) +
    (methodFilter !== 'all' ? 1 : 0) +
    (minExp > 0 ? 1 : 0) +
    (maxFee < 10000 ? 1 : 0) +
    (onlyBookable ? 1 : 0);

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
    <div className="pt-24 pb-20 bg-[#FAF8F2] min-h-screen text-[#26332D]">
      <SeoHead
        title="Our Experts — International Consultation Directory"
        description="Filter specialists across astrology, Online Rohani Ilaj, Istikhara, Numerology, and Family Guidance by language, consultation method, and schedule."
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl pb-10 border-b border-[#C6A15B]/35">
          <p className="text-xs tracking-[0.18em] uppercase text-[#164E3C] font-semibold mb-3">
            Hybrid Expert Marketplace
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#15243A]">
            {t.nav.ourExperts}
          </h1>
          <p className="text-base text-[#4A5A53] mt-3 leading-relaxed">
            {t.sections.expertsSubtitle}
          </p>
        </header>

        {/* Honest Sample Template Disclosure */}
        <div className="mt-6 p-4 bg-[#F1F5EF] border border-[#164E3C]/20 text-xs text-[#26332D] leading-relaxed">
          {t.sections.sampleNotice}
        </div>

        {/* Mobile Search + Bottom-Sheet Filter Trigger */}
        <div className="mt-6 flex items-center gap-2.5 md:hidden">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-[#164E3C] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.expertActions.searchPlaceholder}
              className="w-full h-12 ps-10 pe-4 text-sm bg-white border border-[#C6A15B]/45 text-[#26332D] placeholder:text-[#6E7E77] focus:border-[#164E3C] focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="h-12 px-4 bg-[#164E3C] text-white text-xs font-semibold inline-flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#EAD9AD]" />
            <span>Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}</span>
          </button>
        </div>

        {/* Desktop Multi-Dimensional Filter Panel */}
        <div className="hidden md:block mt-8 p-6 bg-white border border-[#C6A15B]/35 shadow-xs space-y-4">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-4 relative">
              <Search className="w-4 h-4 text-[#164E3C] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.expertActions.searchPlaceholder}
                className="w-full h-11 ps-10 pe-4 text-sm bg-[#FAF8F2] border border-[#C6A15B]/40 text-[#26332D] placeholder:text-[#6E7E77] focus:border-[#164E3C] focus:outline-none"
              />
            </div>

            <div className="col-span-3">
              <select
                aria-label="Filter by service"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-[#FAF8F2] border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
              >
                <option value="all">{t.expertActions.filterAllServices}</option>
                {SERVICES.map((svc) => (
                  <option key={svc.slug} value={svc.slug}>
                    {loc(svc.title)}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <select
                aria-label="Filter by language"
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-[#FAF8F2] border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
              >
                <option value="all">{t.expertActions.filterAllLanguages}</option>
                <option value="en">{t.common.english}</option>
                <option value="ur">{t.common.urdu}</option>
                <option value="ar">{t.common.arabic}</option>
              </select>
            </div>

            <div className="col-span-3">
              <select
                aria-label="Filter by consultation method"
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-[#FAF8F2] border border-[#C6A15B]/40 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
              >
                <option value="all">{t.expertActions.filterAllMethods}</option>
                <option value="whatsapp">{t.finder.types.whatsapp}</option>
                <option value="phone">{t.finder.types.phone}</option>
                <option value="appointment">{t.finder.types.appointment}</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-[#EAD9AD] flex flex-wrap items-center justify-between gap-4 text-xs text-[#26332D]">
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2">
                <span className="text-[#6E7E77]">{t.expertActions.experience}:</span>
                <select
                  value={minExp}
                  onChange={(e) => setMinExp(Number(e.target.value))}
                  className="bg-[#FAF8F2] border border-[#C6A15B]/40 px-2.5 py-1.5 text-xs text-[#26332D]"
                >
                  <option value={0}>{t.expertActions.filterAnyExperience}</option>
                  <option value={10}>10+ yrs</option>
                  <option value={14}>14+ yrs</option>
                </select>
              </label>

              <label className="flex items-center gap-2">
                <span className="text-[#6E7E77]">Max Base Fee:</span>
                <select
                  value={maxFee}
                  onChange={(e) => setMaxFee(Number(e.target.value))}
                  className="bg-[#FAF8F2] border border-[#C6A15B]/40 px-2.5 py-1.5 text-xs text-[#26332D] tabular-nums-mono"
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
                  className="accent-[#164E3C]"
                />
                <span>Open for Scheduled Requests</span>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <span className="tabular-nums-mono text-[#6E7E77]">
                {filtered.length} / {EXPERTS.length}
              </span>
              <button
                type="button"
                onClick={resetAll}
                className="text-[#164E3C] font-semibold hover:underline cursor-pointer"
              >
                {t.expertActions.clearFilters}
              </button>
            </div>
          </div>
        </div>

        {/* App-Like Mobile Filter Bottom Sheet */}
        <AnimatePresence>
          {mobileFilterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileFilterOpen(false)}
                className="md:hidden fixed inset-0 z-50 bg-[#15243A]/50 backdrop-blur-xs"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#FAF8F2] border-t border-[#C6A15B]/50 p-5 pb-8 max-h-[82vh] overflow-y-auto shadow-2xl space-y-4"
              >
                <div className="w-10 h-1 bg-[#C6A15B]/45 rounded-full mx-auto" />
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl font-semibold text-[#15243A]">Filter Specialists</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-2 text-[#4A5A53]"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="w-full h-12 px-3.5 text-sm bg-white border border-[#C6A15B]/45 text-[#26332D]"
                  >
                    <option value="all">{t.expertActions.filterAllServices}</option>
                    {SERVICES.map((svc) => (
                      <option key={svc.slug} value={svc.slug}>
                        {loc(svc.title)}
                      </option>
                    ))}
                  </select>

                  <select
                    value={langFilter}
                    onChange={(e) => setLangFilter(e.target.value)}
                    className="w-full h-12 px-3.5 text-sm bg-white border border-[#C6A15B]/45 text-[#26332D]"
                  >
                    <option value="all">{t.expertActions.filterAllLanguages}</option>
                    <option value="en">{t.common.english}</option>
                    <option value="ur">{t.common.urdu}</option>
                    <option value="ar">{t.common.arabic}</option>
                  </select>

                  <select
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                    className="w-full h-12 px-3.5 text-sm bg-white border border-[#C6A15B]/45 text-[#26332D]"
                  >
                    <option value="all">{t.expertActions.filterAllMethods}</option>
                    <option value="whatsapp">{t.finder.types.whatsapp}</option>
                    <option value="phone">{t.finder.types.phone}</option>
                    <option value="appointment">{t.finder.types.appointment}</option>
                  </select>

                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={minExp}
                      onChange={(e) => setMinExp(Number(e.target.value))}
                      className="h-12 px-3 text-xs bg-white border border-[#C6A15B]/45 text-[#26332D]"
                    >
                      <option value={0}>{t.expertActions.filterAnyExperience}</option>
                      <option value={10}>10+ yrs</option>
                      <option value={14}>14+ yrs</option>
                    </select>
                    <select
                      value={maxFee}
                      onChange={(e) => setMaxFee(Number(e.target.value))}
                      className="h-12 px-3 text-xs bg-white border border-[#C6A15B]/45 text-[#26332D]"
                    >
                      <option value={10000}>Any Fee (PKR)</option>
                      <option value={5000}>Up to PKR 5,000</option>
                      <option value={6500}>Up to PKR 6,500</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2.5 text-sm text-[#26332D] py-1">
                    <input
                      type="checkbox"
                      checked={onlyBookable}
                      onChange={(e) => setOnlyBookable(e.target.checked)}
                      className="accent-[#164E3C] w-4 h-4"
                    />
                    <span>Open for Scheduled Requests</span>
                  </label>
                </div>

                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="flex-1 h-12 border border-[#C6A15B]/60 bg-white text-xs font-semibold text-[#26332D]"
                  >
                    {t.expertActions.clearFilters}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="flex-1 h-12 bg-[#164E3C] text-white text-xs font-semibold"
                  >
                    Show {filtered.length} Experts
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Directory Results */}
        <div className="mt-10">
          {filtered.length === 0 ? (
            <div className="p-12 text-center border border-[#C6A15B]/35 bg-white">
              <p className="text-sm text-[#4A5A53]">{t.expertActions.noResults}</p>
              <button
                type="button"
                onClick={resetAll}
                className="mt-4 px-5 py-2.5 bg-[#164E3C] text-white font-semibold text-xs cursor-pointer"
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
