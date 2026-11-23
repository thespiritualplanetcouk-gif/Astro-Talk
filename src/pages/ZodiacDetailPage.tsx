import { Link, useParams } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getZodiacBySlug, ZODIAC_SIGNS } from '../data/zodiac';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useChat } from '../context/ChatContext';
import { SeoHead } from '../components/SeoHead';

export function ZodiacDetailPage() {
  const { sign } = useParams<{ sign: string }>();
  const { lang, t, loc } = useLanguage();
  const { openBooking } = useBooking();
  const { openChat } = useChat();

  const data = sign ? getZodiacBySlug(sign) : ZODIAC_SIGNS[0];

  if (!data) {
    return (
      <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center bg-[#FAF8F2] min-h-screen">
        <h1 className="font-display text-4xl text-[#15243A]">Zodiac Sign Not Found</h1>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-[#164E3C] text-white font-semibold text-sm rounded-sm"
        >
          {t.common.backToHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-[#FAF8F2] text-[#26332D] min-h-screen">
      <SeoHead
        title={`${loc(data.name)} (${loc(data.dateRange)})`}
        description={loc(data.summary)}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal Sign Switcher */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-[#C6A15B]/30">
          {ZODIAC_SIGNS.map((z) => (
            <Link
              key={z.slug}
              to={`/zodiac/${z.slug}`}
              className={`min-h-[40px] inline-flex items-center px-3.5 py-1.5 text-xs transition-all whitespace-nowrap rounded-sm ${
                z.slug === data.slug
                  ? 'bg-[#164E3C] text-white font-semibold shadow-sm'
                  : 'bg-white text-[#26332D] border border-[#C6A15B]/35 hover:border-[#164E3C]'
              }`}
            >
              {z.symbol} {loc(z.name)}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <header className="space-y-3">
              <p className="tabular-nums-mono text-xs font-semibold text-[#164E3C]">
                {data.startDegree}° – {data.startDegree + 30}° Tropical Ecliptic · {loc(data.dateRange)}
              </p>
              <h1 className="font-display text-5xl sm:text-6xl font-semibold text-[#15243A]">
                <span className="text-[#C6A15B] me-3">{data.symbol}</span>
                {loc(data.name)}
              </h1>
              <p className="text-base sm:text-lg text-[#4B5C55] leading-relaxed max-w-2xl">
                {loc(data.summary)}
              </p>
            </header>

            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-[#C6A15B]/30 py-6">
              <div className="p-4 bg-white border border-[#C6A15B]/30 rounded-sm">
                <dt className="text-xs text-[#566760]">Element</dt>
                <dd className="font-display text-2xl font-semibold text-[#15243A] mt-1">
                  {loc(data.element)}
                </dd>
              </div>
              <div className="p-4 bg-white border border-[#C6A15B]/30 rounded-sm">
                <dt className="text-xs text-[#566760]">Modality</dt>
                <dd className="font-display text-2xl font-semibold text-[#15243A] mt-1">
                  {loc(data.modality)}
                </dd>
              </div>
              <div className="p-4 bg-white border border-[#C6A15B]/30 rounded-sm">
                <dt className="text-xs text-[#566760]">Ruling Planet</dt>
                <dd className="font-display text-2xl font-semibold text-[#15243A] mt-1">
                  {loc(data.rulingPlanet)}
                </dd>
              </div>
            </dl>

            <section className="space-y-4">
              <h2 className="font-display text-3xl font-semibold text-[#164E3C]">
                Classical Symbolic Strengths
              </h2>
              <ul className="space-y-3">
                {data.strengths.map((s, idx) => (
                  <li
                    key={idx}
                    className="p-4 bg-white border border-[#C6A15B]/30 text-sm text-[#26332D] rounded-sm shadow-xs"
                  >
                    {loc(s)}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-6 bg-[#F1F5EF] border border-[#164E3C]/25 rounded-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#164E3C]">
                Reflective Question
              </p>
              <p className="font-display text-2xl italic text-[#15243A] mt-2">
                “{loc(data.reflectionPrompt)}”
              </p>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#164E3C] text-white border border-[#C6A15B]/40 space-y-4 rounded-sm shadow-sm">
              <h2 className="font-display text-2xl font-semibold text-white">
                Explore Your Full Natal Chart
              </h2>
              <p className="text-xs sm:text-sm text-[#DCE7E1] leading-relaxed">
                Sun sign is only one placement. Compute your exact Moon Sign, Rising Sign, and all
                10 planetary positions using our ephemeris Birth Chart tool.
              </p>
              <Link
                to="/tools/birth-chart"
                className="w-full min-h-[44px] py-3 px-4 bg-[#C6A15B] text-[#15243A] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#EAD9AD] transition-colors rounded-sm"
              >
                <span>Open Birth Chart Generator</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <button
                type="button"
                onClick={() => openBooking({ serviceSlug: 'astrology', language: lang })}
                className="w-full min-h-[44px] py-3 px-4 border border-[#EAD9AD]/50 text-[#FAF8F2] text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer rounded-sm"
              >
                {t.nav.bookConsultation}
              </button>
              <button
                type="button"
                onClick={openChat}
                className="w-full min-h-[40px] py-2 px-4 text-xs text-[#EAD9AD] hover:underline flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{t.hero.chatCta}</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
