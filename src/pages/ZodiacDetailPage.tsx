import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getZodiacBySlug, ZODIAC_SIGNS } from '../data/zodiac';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { SeoHead } from '../components/SeoHead';

export function ZodiacDetailPage() {
  const { sign } = useParams<{ sign: string }>();
  const { lang, t, loc } = useLanguage();
  const { openBooking } = useBooking();

  const data = sign ? getZodiacBySlug(sign) : ZODIAC_SIGNS[0];

  if (!data) {
    return (
      <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center">
        <h1 className="font-display text-4xl text-[#F6F2E9]">Zodiac Sign Not Found</h1>
        <Link to="/" className="inline-block mt-6 px-6 py-3 bg-[#C6A35A] text-[#091426] font-semibold text-sm">
          {t.common.backToHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-[#091426] min-h-screen">
      <SeoHead
        title={`${loc(data.name)} (${loc(data.dateRange)})`}
        description={loc(data.summary)}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal Sign Switcher */}
        <div className="flex flex-wrap gap-1.5 pb-8 border-b border-[#C6A35A]/20">
          {ZODIAC_SIGNS.map((z) => (
            <Link
              key={z.slug}
              to={`/zodiac/${z.slug}`}
              className={`px-3 py-1.5 text-xs transition-colors whitespace-nowrap ${
                z.slug === data.slug
                  ? 'bg-[#C6A35A] text-[#091426] font-semibold'
                  : 'bg-[#0C192F] text-[#D6DCE5] border border-[#C6A35A]/20 hover:border-[#E5CD91]'
              }`}
            >
              {z.symbol} {loc(z.name)}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <header className="space-y-3">
              <p className="tabular-nums-mono text-xs text-[#C6A35A]">
                {data.startDegree}° – {data.startDegree + 30}° Tropical Ecliptic · {loc(data.dateRange)}
              </p>
              <h1 className="font-display text-5xl sm:text-6xl font-semibold text-[#F6F2E9]">
                <span className="text-[#E5CD91] me-3">{data.symbol}</span>
                {loc(data.name)}
              </h1>
              <p className="text-base sm:text-lg text-[#C7D0DC] leading-relaxed max-w-2xl">
                {loc(data.summary)}
              </p>
            </header>

            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-[#C6A35A]/20 py-6">
              <div>
                <dt className="text-xs text-[#A9B2BE]">Element</dt>
                <dd className="font-display text-2xl text-[#F6F2E9] mt-1">{loc(data.element)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#A9B2BE]">Modality</dt>
                <dd className="font-display text-2xl text-[#F6F2E9] mt-1">{loc(data.modality)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#A9B2BE]">Ruling Planet</dt>
                <dd className="font-display text-2xl text-[#F6F2E9] mt-1">{loc(data.rulingPlanet)}</dd>
              </div>
            </dl>

            <section className="space-y-4">
              <h2 className="font-display text-3xl text-[#E5CD91]">Classical Symbolic Strengths</h2>
              <ul className="space-y-3">
                {data.strengths.map((s, idx) => (
                  <li key={idx} className="p-4 bg-[#0C192F] border border-[#C6A35A]/15 text-sm text-[#D6DCE5]">
                    {loc(s)}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-6 bg-[#0C3028]/50 border border-[#C6A35A]/25">
              <p className="text-xs uppercase tracking-[0.14em] text-[#E5CD91]">Reflective Question</p>
              <p className="font-display text-2xl italic text-[#F6F2E9] mt-2">
                “{loc(data.reflectionPrompt)}”
              </p>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#0C192F] border border-[#C6A35A]/25 space-y-4">
              <h2 className="font-display text-2xl text-[#F6F2E9]">Explore Your Full Natal Chart</h2>
              <p className="text-xs sm:text-sm text-[#A9B2BE] leading-relaxed">
                Sun sign is only one placement. Compute your exact Moon Sign, Rising Sign, and all
                10 planetary positions using our ephemeris Birth Chart tool.
              </p>
              <Link
                to="/tools/birth-chart"
                className="w-full py-3 px-4 bg-[#C6A35A] text-[#091426] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#E5CD91] transition-colors"
              >
                <span>Open Birth Chart Generator</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <button
                type="button"
                onClick={() => openBooking({ serviceSlug: 'astrology', language: lang })}
                className="w-full py-3 px-4 border border-[#C6A35A]/35 text-[#F6F2E9] text-sm hover:border-[#E5CD91] transition-colors cursor-pointer"
              >
                {t.nav.bookConsultation}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
