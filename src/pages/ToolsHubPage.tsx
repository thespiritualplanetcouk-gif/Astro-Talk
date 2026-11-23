import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { TOOLS_CATALOG } from '../data/knowledge';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';
import { InteractiveTiltCard } from '../components/InteractiveTiltCard';

export function ToolsHubPage() {
  const { t, loc } = useLanguage();
  const [catFilter, setCatFilter] = useState<'all' | 'astronomy' | 'numerology' | 'calendar'>('all');

  const visible =
    catFilter === 'all'
      ? TOOLS_CATALOG
      : TOOLS_CATALOG.filter((item) => item.category === catFilter);

  const tabs: { key: 'all' | 'astronomy' | 'numerology' | 'calendar'; label: string }[] = [
    { key: 'all', label: 'All 10 Instruments' },
    { key: 'astronomy', label: 'Astronomy & Charts' },
    { key: 'numerology', label: 'Abjad & Numerology' },
    { key: 'calendar', label: 'Hijri & Lunar Calendars' },
  ];

  return (
    <div className="pt-24 pb-24 bg-[#FAF8F2] text-[#26332D] min-h-screen">
      <SeoHead
        title="Free Astronomy, Abjad & Calendar Tools"
        description="Use real ephemeris-based Birth Chart, Sun, Moon, Rising Sign, Eastern Abjad, Life Path, Hijri Calendar, and Moon Phase calculators privately in your browser."
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl pb-10 border-b border-[#C6A15B]/30">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#164E3C] mb-3">
            Interactive Instruments · Real Calculations
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#15243A]">
            {t.sections.toolsTitle}
          </h1>
          <p className="text-base text-[#566760] mt-3 leading-relaxed">
            {t.sections.toolsSubtitle}
          </p>
        </header>

        {/* Privacy & Scientific Transparency Bar */}
        <div className="mt-6 p-4 bg-[#F1F5EF] border border-[#164E3C]/20 flex items-start gap-3 text-xs text-[#26332D] rounded-sm">
          <ShieldCheck className="w-4 h-4 text-[#164E3C] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            All planetary coordinates and lunar phases are computed directly in your browser using
            VSOP87/ELP2000 astronomical formulas. Your birth date, birth time, and name inputs are
            never published or exposed publicly.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setCatFilter(tab.key)}
              className={`min-h-[44px] px-4 py-2 text-xs font-medium transition-all cursor-pointer whitespace-nowrap rounded-sm ${
                catFilter === tab.key
                  ? 'bg-[#164E3C] text-white font-semibold shadow-sm'
                  : 'bg-white text-[#26332D] border border-[#C6A15B]/35 hover:border-[#164E3C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tools Catalog Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((tool, idx) => (
            <InteractiveTiltCard key={tool.slug} className="h-full">
              <Link
                to={`/tools/${tool.slug}`}
                className="group h-full bg-white border border-[#C6A15B]/35 hover:border-[#C6A15B] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all rounded-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="tabular-nums-mono font-semibold text-[#C6A15B]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="capitalize text-[#566760] font-medium">{tool.category}</span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-[#15243A] group-hover:text-[#164E3C] transition-colors">
                    {loc(tool.title)}
                  </h2>
                  <p className="text-sm text-[#566760] mt-2.5 leading-relaxed">
                    {loc(tool.shortDescription)}
                  </p>
                  <p className="text-[11.5px] text-[#6A7B73] mt-4 pt-3 border-t border-[#C6A15B]/20 leading-relaxed">
                    {loc(tool.methodologyNote)}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#C6A15B]/25 flex items-center justify-between text-xs font-semibold text-[#164E3C]">
                  <span>{t.sections.openTool}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </InteractiveTiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
