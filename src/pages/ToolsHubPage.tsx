import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { TOOLS_CATALOG } from '../data/knowledge';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';

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
    <div className="pt-24 pb-20 bg-[#091426] min-h-screen">
      <SeoHead
        title="Free Astronomy, Abjad & Calendar Tools"
        description="Use real ephemeris-based Birth Chart, Sun, Moon, Rising Sign, Eastern Abjad, Life Path, Hijri Calendar, and Moon Phase calculators privately in your browser."
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl pb-10 border-b border-[#C6A35A]/20">
          <p className="text-xs tracking-[0.16em] uppercase text-[#C6A35A] mb-3">
            Interactive Instruments · Real Calculations
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F6F2E9]">
            {t.sections.toolsTitle}
          </h1>
          <p className="text-base text-[#A9B2BE] mt-3 leading-relaxed">
            {t.sections.toolsSubtitle}
          </p>
        </header>

        {/* Privacy & Scientific Transparency Bar */}
        <div className="mt-6 p-4 bg-[#0C3028]/45 border border-[#C6A35A]/25 flex items-start gap-3 text-xs text-[#D6DCE5]">
          <ShieldCheck className="w-4 h-4 text-[#E5CD91] shrink-0 mt-0.5" />
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
              className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                catFilter === tab.key
                  ? 'bg-[#C6A35A] text-[#091426] font-semibold'
                  : 'bg-[#0C192F] text-[#D6DCE5] border border-[#C6A35A]/20 hover:border-[#E5CD91]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tools Catalog Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((tool, idx) => (
            <Link
              key={tool.slug}
              to={`/tools/${tool.slug}`}
              className="group bg-[#0C192F] gold-hairline p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#C6A35A] mb-3">
                  <span className="tabular-nums-mono">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="capitalize text-[#A9B2BE]">{tool.category}</span>
                </div>
                <h2 className="font-display text-2xl font-semibold text-[#F6F2E9] group-hover:text-[#E5CD91] transition-colors">
                  {loc(tool.title)}
                </h2>
                <p className="text-sm text-[#A9B2BE] mt-2.5 leading-relaxed">
                  {loc(tool.shortDescription)}
                </p>
                <p className="text-[11px] text-[#8F9BA9] mt-4 pt-3 border-t border-[#C6A35A]/10 leading-relaxed">
                  {loc(tool.methodologyNote)}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#C6A35A]/15 flex items-center justify-between text-xs font-semibold text-[#E5CD91]">
                <span>{t.sections.openTool}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
