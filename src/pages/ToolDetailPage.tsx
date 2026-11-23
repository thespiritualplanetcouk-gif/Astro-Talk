import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { getToolBySlug, TOOLS_CATALOG } from '../data/knowledge';
import { ZODIAC_SIGNS } from '../data/zodiac';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import {
  calculateAscendant,
  calculateCosmicSnapshot,
  convertToHijri,
  getUpcomingLunarPhases,
  GLOBAL_CITIES,
} from '../utils/astronomy';
import {
  calculateAbjad,
  calculateLifePath,
  calculateNameCompatibility,
} from '../utils/numerology';
import { BirthChartWheel } from '../components/BirthChartWheel';
import { MoonPhaseVisual } from '../components/MoonPhaseVisual';
import { SeoHead } from '../components/SeoHead';

export function ToolDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, loc } = useLanguage();
  const { openBooking } = useBooking();

  const tool = slug ? getToolBySlug(slug) : undefined;

  // Shared Astronomical Inputs
  const [birthDate, setBirthDate] = useState('1994-06-15');
  const [birthTime, setBirthTime] = useState('14:30');
  const [utcOffsetHours, setUtcOffsetHours] = useState<number>(5); // Default PKT UTC+5
  const [cityId, setCityId] = useState('lahore');

  // Abjad & Numerology Inputs
  const [abjadInput, setAbjadInput] = useState('محمد علی');
  const [firstName, setFirstName] = useState('Amina');
  const [secondName, setSecondName] = useState('Zain');

  // Zodiac Compatibility Inputs
  const [signA, setSignA] = useState('aries');
  const [signB, setSignB] = useState('sagittarius');

  // Calendar Date Input
  const [calendarDate, setCalendarDate] = useState(() => new Date().toISOString().slice(0, 10));

  const selectedCity = useMemo(
    () => GLOBAL_CITIES.find((c) => c.id === cityId) ?? GLOBAL_CITIES[0],
    [cityId]
  );

  // Convert local birth date/time + manual UTC offset into exact UTC Date
  const computedBirthUtc = useMemo(() => {
    const [y, m, d] = birthDate.split('-').map(Number);
    const [hh, mm] = (birthTime || '12:00').split(':').map(Number);
    if (!y || !m || !d) return new Date();
    const utcMs = Date.UTC(y, m - 1, d, (hh || 0) - utcOffsetHours, mm || 0, 0);
    return new Date(utcMs);
  }, [birthDate, birthTime, utcOffsetHours]);

  const birthSnapshot = useMemo(
    () => calculateCosmicSnapshot(computedBirthUtc),
    [computedBirthUtc]
  );

  const ascendant = useMemo(
    () => calculateAscendant(computedBirthUtc, selectedCity.lat, selectedCity.lon),
    [computedBirthUtc, selectedCity]
  );

  const abjadResult = useMemo(() => calculateAbjad(abjadInput), [abjadInput]);
  const lifePathResult = useMemo(() => calculateLifePath(birthDate), [birthDate]);
  const nameHarmony = useMemo(
    () => calculateNameCompatibility(firstName, secondName),
    [firstName, secondName]
  );

  const selectedCalDate = useMemo(() => {
    const parsed = new Date(`${calendarDate}T12:00:00Z`);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [calendarDate]);

  const hijriResult = useMemo(() => convertToHijri(selectedCalDate), [selectedCalDate]);
  const upcomingMoons = useMemo(() => getUpcomingLunarPhases(selectedCalDate, 8), [selectedCalDate]);

  if (!tool) {
    return (
      <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center">
        <h1 className="font-display text-4xl text-[#F6F2E9]">Tool Not Found</h1>
        <Link
          to="/tools"
          className="inline-block mt-6 px-6 py-3 bg-[#C6A35A] text-[#091426] font-semibold text-sm"
        >
          {t.sections.viewAllTools}
        </Link>
      </div>
    );
  }

  const zodiacObjA = ZODIAC_SIGNS.find((z) => z.slug === signA) ?? ZODIAC_SIGNS[0];
  const zodiacObjB = ZODIAC_SIGNS.find((z) => z.slug === signB) ?? ZODIAC_SIGNS[8];

  const isChartTool =
    tool.slug === 'birth-chart' ||
    tool.slug === 'sun-sign' ||
    tool.slug === 'moon-sign' ||
    tool.slug === 'rising-sign';

  const elementNames = ['Fire (آتشی / ناري)', 'Earth (خاکی / ترابي)', 'Air (بادی / هوائي)', 'Water (آبی / مائي)'];

  return (
    <div className="pt-24 pb-20 bg-[#091426] min-h-screen">
      <SeoHead title={loc(tool.title)} description={loc(tool.shortDescription)} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#A9B2BE]">
          <Link to="/tools" className="text-[#E5CD91] hover:underline">
            {t.nav.freeTools}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{loc(tool.title)}</span>
        </div>

        <header className="max-w-3xl pb-8 border-b border-[#C6A35A]/20">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F6F2E9]">
            {loc(tool.title)}
          </h1>
          <p className="text-base text-[#A9B2BE] mt-3 leading-relaxed">
            {loc(tool.shortDescription)}
          </p>
        </header>

        {/* Main Interactive Tool Canvas */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* 1. BIRTH CHART / SUN / MOON / RISING CALCULATORS */}
            {isChartTool && (
              <div className="space-y-8">
                <div className="bg-[#0C192F] border border-[#C6A35A]/25 p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="tool-bdate" className="block text-xs text-[#E5CD91] mb-1.5">
                        Date of Birth
                      </label>
                      <input
                        id="tool-bdate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full h-11 px-3 text-sm tabular-nums-mono bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9]"
                      />
                    </div>
                    <div>
                      <label htmlFor="tool-btime" className="block text-xs text-[#E5CD91] mb-1.5">
                        Time of Birth (Local)
                      </label>
                      <input
                        id="tool-btime"
                        type="time"
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        className="w-full h-11 px-3 text-sm tabular-nums-mono bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9]"
                      />
                    </div>
                    <div>
                      <label htmlFor="tool-city" className="block text-xs text-[#E5CD91] mb-1.5">
                        Birth City
                      </label>
                      <select
                        id="tool-city"
                        value={cityId}
                        onChange={(e) => {
                          const next = GLOBAL_CITIES.find((c) => c.id === e.target.value);
                          setCityId(e.target.value);
                          if (next) {
                            const approxOffset = Math.round(next.lon / 15);
                            setUtcOffsetHours(
                              next.country === 'Pakistan'
                                ? 5
                                : next.country === 'United Kingdom'
                                  ? 0
                                  : next.country === 'United Arab Emirates'
                                    ? 4
                                    : next.country === 'Saudi Arabia'
                                      ? 3
                                      : approxOffset
                            );
                          }
                        }}
                        className="w-full h-11 px-3 text-sm bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9]"
                      >
                        {GLOBAL_CITIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}, {c.country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="tool-offset" className="block text-xs text-[#E5CD91] mb-1.5">
                        Birth UTC Offset
                      </label>
                      <select
                        id="tool-offset"
                        value={utcOffsetHours}
                        onChange={(e) => setUtcOffsetHours(Number(e.target.value))}
                        className="w-full h-11 px-3 text-sm tabular-nums-mono bg-[#091426] border border-[#C6A35A]/25 text-[#F6F2E9]"
                      >
                        {[-8, -7, -6, -5, -4, 0, 1, 2, 3, 4, 5, 8, 10, 11].map((off) => (
                          <option key={off} value={off}>
                            UTC {off >= 0 ? `+${off}` : off}:00
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="text-[11.5px] text-[#8F9BA9] tabular-nums-mono">
                    Calculated UTC Instant: {computedBirthUtc.toISOString().replace('T', ' ').slice(0, 19)} UTC ·{' '}
                    {selectedCity.name} ({selectedCity.lat.toFixed(2)}°N, {selectedCity.lon.toFixed(2)}°E)
                  </p>
                </div>

                {/* Primary Big Three Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    className={`p-5 border ${
                      tool.slug === 'sun-sign'
                        ? 'bg-[#0C3028] border-[#E5CD91]'
                        : 'bg-[#0C192F] border-[#C6A35A]/25'
                    }`}
                  >
                    <p className="text-xs text-[#A9B2BE]">Sun Sign (☉)</p>
                    <p className="font-display text-3xl font-semibold text-[#F6F2E9] mt-1">
                      {birthSnapshot.sun.position.signSymbol} {birthSnapshot.sun.position.signName}
                    </p>
                    <p className="tabular-nums-mono text-xs text-[#E5CD91] mt-1">
                      {birthSnapshot.sun.position.formattedDegree}
                    </p>
                  </div>

                  <div
                    className={`p-5 border ${
                      tool.slug === 'moon-sign'
                        ? 'bg-[#0C3028] border-[#E5CD91]'
                        : 'bg-[#0C192F] border-[#C6A35A]/25'
                    }`}
                  >
                    <p className="text-xs text-[#A9B2BE]">Moon Sign (☽)</p>
                    <p className="font-display text-3xl font-semibold text-[#F6F2E9] mt-1">
                      {birthSnapshot.moon.position.signSymbol} {birthSnapshot.moon.position.signName}
                    </p>
                    <p className="tabular-nums-mono text-xs text-[#E5CD91] mt-1">
                      {birthSnapshot.moon.position.formattedDegree} · {birthSnapshot.moonPhase.illuminationPercent}% Lit
                    </p>
                  </div>

                  <div
                    className={`p-5 border ${
                      tool.slug === 'rising-sign'
                        ? 'bg-[#0C3028] border-[#E5CD91]'
                        : 'bg-[#0C192F] border-[#C6A35A]/25'
                    }`}
                  >
                    <p className="text-xs text-[#A9B2BE]">Rising Sign / Ascendant</p>
                    <p className="font-display text-3xl font-semibold text-[#F6F2E9] mt-1">
                      {ascendant.signSymbol} {ascendant.signName}
                    </p>
                    <p className="tabular-nums-mono text-xs text-[#E5CD91] mt-1">
                      {ascendant.formattedDegree}
                    </p>
                  </div>
                </div>

                {/* Natal Wheel + Planetary Table */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#0C192F] border border-[#C6A35A]/25 p-6">
                  <div className="md:col-span-6 flex items-center justify-center">
                    <BirthChartWheel planets={birthSnapshot.planets} ascendant={ascendant} />
                  </div>
                  <div className="md:col-span-6">
                    <h2 className="text-xs uppercase tracking-[0.14em] text-[#E5CD91] pb-3 mb-3 border-b border-[#C6A35A]/15">
                      Calculated Planetary Placements
                    </h2>
                    <div className="divide-y divide-[#C6A35A]/10 text-sm">
                      {birthSnapshot.planets.map((p) => (
                        <div key={p.body} className="py-2 flex items-center justify-between">
                          <span className="text-[#F6F2E9]">
                            <span className="text-[#E5CD91] me-2">{p.symbol}</span>
                            {p.body}
                          </span>
                          <span className="tabular-nums-mono text-xs text-[#D6DCE5]">
                            {p.position.signSymbol} {p.position.signName}{' '}
                            <span className="text-[#C6A35A] ms-1">{p.position.formattedDegree}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ABJAD CALCULATOR */}
            {tool.slug === 'abjad-numerology' && (
              <div className="bg-[#0C192F] border border-[#C6A35A]/25 p-6 sm:p-8 space-y-6">
                <div>
                  <label htmlFor="abjad-text" className="block text-xs text-[#E5CD91] mb-2">
                    Enter Name or Phrase (Urdu / Arabic recommended, or English)
                  </label>
                  <input
                    id="abjad-text"
                    type="text"
                    value={abjadInput}
                    onChange={(e) => setAbjadInput(e.target.value)}
                    placeholder="مثال: محمد علی یا فاطمہ"
                    className="w-full px-4 py-3 text-lg bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9] focus:border-[#E5CD91] focus:outline-none"
                  />
                  {abjadResult.usedPhoneticFallback && (
                    <p className="text-xs text-[#E5CD91] mt-2">
                      Note: Latin letters are mapped via phonetic approximation. Enter the exact
                      Arabic or Urdu spelling for classical Hisab al-Jummal precision.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-5 bg-[#091426] border border-[#C6A35A]/20">
                    <p className="text-xs text-[#A9B2BE]">Abjad Total (عددِ کبیر)</p>
                    <p className="tabular-nums-mono text-4xl font-semibold text-[#E5CD91] mt-1">
                      {abjadResult.total}
                    </p>
                  </div>
                  <div className="p-5 bg-[#091426] border border-[#C6A35A]/20">
                    <p className="text-xs text-[#A9B2BE]">Reduced Root (مفرد عدد)</p>
                    <p className="tabular-nums-mono text-4xl font-semibold text-[#F6F2E9] mt-1">
                      {abjadResult.reducedRoot}
                    </p>
                  </div>
                  <div className="p-5 bg-[#091426] border border-[#C6A35A]/20">
                    <p className="text-xs text-[#A9B2BE]">Classical Element (Mod 4)</p>
                    <p className="text-base font-medium text-[#F6F2E9] mt-2">
                      {abjadResult.total > 0 ? elementNames[abjadResult.elementIndex] : '—'}
                    </p>
                  </div>
                </div>

                {abjadResult.breakdown.length > 0 && (
                  <div className="pt-4 border-t border-[#C6A35A]/15">
                    <h2 className="text-xs uppercase tracking-[0.14em] text-[#C6A35A] mb-3">
                      Letter-by-Letter Verification
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {abjadResult.breakdown.map((item, i) => (
                        <div
                          key={i}
                          className="px-3 py-2 bg-[#091426] border border-[#C6A35A]/20 text-center min-w-[54px]"
                        >
                          <span className="block text-base text-[#F6F2E9]">{item.char}</span>
                          <span className="block tabular-nums-mono text-[11px] text-[#E5CD91]">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. LIFE PATH CALCULATOR */}
            {tool.slug === 'life-path' && (
              <div className="bg-[#0C192F] border border-[#C6A35A]/25 p-6 sm:p-8 space-y-6">
                <div>
                  <label htmlFor="lp-date" className="block text-xs text-[#E5CD91] mb-2">
                    Select Date of Birth
                  </label>
                  <input
                    id="lp-date"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full max-w-xs h-11 px-3.5 text-sm tabular-nums-mono bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9]"
                  />
                </div>

                {lifePathResult && (
                  <div className="space-y-5">
                    <div className="p-6 bg-[#0C3028]/60 border border-[#C6A35A]/30 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-[#E5CD91]">Calculated Life Path Number</p>
                        <p className="tabular-nums-mono text-5xl font-semibold text-[#F6F2E9] mt-1">
                          {lifePathResult.lifePathNumber}
                        </p>
                      </div>
                      {lifePathResult.isMasterNumber && (
                        <span className="text-xs text-[#E5CD91] border border-[#E5CD91]/40 px-3 py-1.5">
                          Master Number Preserved
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-[#091426] border border-[#C6A35A]/15">
                        <span className="block text-xs text-[#A9B2BE]">Year Sum</span>
                        <span className="tabular-nums-mono text-xl text-[#F6F2E9] mt-1 block">
                          {lifePathResult.yearSum}
                        </span>
                      </div>
                      <div className="p-4 bg-[#091426] border border-[#C6A35A]/15">
                        <span className="block text-xs text-[#A9B2BE]">Month Sum</span>
                        <span className="tabular-nums-mono text-xl text-[#F6F2E9] mt-1 block">
                          {lifePathResult.monthSum}
                        </span>
                      </div>
                      <div className="p-4 bg-[#091426] border border-[#C6A35A]/15">
                        <span className="block text-xs text-[#A9B2BE]">Day Sum</span>
                        <span className="tabular-nums-mono text-xl text-[#F6F2E9] mt-1 block">
                          {lifePathResult.daySum}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. NAME COMPATIBILITY */}
            {tool.slug === 'name-compatibility' && (
              <div className="bg-[#0C192F] border border-[#C6A35A]/25 p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nc-first" className="block text-xs text-[#E5CD91] mb-1.5">
                      First Name (English, Urdu, or Arabic)
                    </label>
                    <input
                      id="nc-first"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full h-11 px-3.5 text-sm bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9]"
                    />
                  </div>
                  <div>
                    <label htmlFor="nc-second" className="block text-xs text-[#E5CD91] mb-1.5">
                      Second Name (English, Urdu, or Arabic)
                    </label>
                    <input
                      id="nc-second"
                      type="text"
                      value={secondName}
                      onChange={(e) => setSecondName(e.target.value)}
                      className="w-full h-11 px-3.5 text-sm bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9]"
                    />
                  </div>
                </div>

                {nameHarmony && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-[#091426] border border-[#C6A35A]/20">
                        <span className="text-xs text-[#A9B2BE] block truncate">{firstName}</span>
                        <span className="tabular-nums-mono text-3xl text-[#E5CD91] font-semibold mt-1 block">
                          {nameHarmony.firstNumber}
                        </span>
                      </div>
                      <div className="p-4 bg-[#091426] border border-[#C6A35A]/20">
                        <span className="text-xs text-[#A9B2BE] block truncate">{secondName}</span>
                        <span className="tabular-nums-mono text-3xl text-[#E5CD91] font-semibold mt-1 block">
                          {nameHarmony.secondNumber}
                        </span>
                      </div>
                      <div className="p-4 bg-[#0C3028]/60 border border-[#C6A35A]/30">
                        <span className="text-xs text-[#E5CD91] block">Combined Root</span>
                        <span className="tabular-nums-mono text-3xl text-[#F6F2E9] font-semibold mt-1 block">
                          {nameHarmony.combinedRoot}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#D6DCE5] leading-relaxed p-5 bg-[#091426] border border-[#C6A35A]/15">
                      {lang === 'ur'
                        ? nameHarmony.summaryUr
                        : lang === 'ar'
                          ? nameHarmony.summaryAr
                          : nameHarmony.summaryEn}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 5. ZODIAC COMPATIBILITY */}
            {tool.slug === 'zodiac-compatibility' && (
              <div className="bg-[#0C192F] border border-[#C6A35A]/25 p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zc-a" className="block text-xs text-[#E5CD91] mb-1.5">
                      First Zodiac Sign
                    </label>
                    <select
                      id="zc-a"
                      value={signA}
                      onChange={(e) => setSignA(e.target.value)}
                      className="w-full h-11 px-3 text-sm bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9]"
                    >
                      {ZODIAC_SIGNS.map((z) => (
                        <option key={z.slug} value={z.slug}>
                          {z.symbol} {loc(z.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="zc-b" className="block text-xs text-[#E5CD91] mb-1.5">
                      Second Zodiac Sign
                    </label>
                    <select
                      id="zc-b"
                      value={signB}
                      onChange={(e) => setSignB(e.target.value)}
                      className="w-full h-11 px-3 text-sm bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9]"
                    >
                      {ZODIAC_SIGNS.map((z) => (
                        <option key={z.slug} value={z.slug}>
                          {z.symbol} {loc(z.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-6 bg-[#091426] border border-[#C6A35A]/20 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#C6A35A]/15">
                    <h2 className="font-display text-2xl sm:text-3xl text-[#F6F2E9]">
                      {zodiacObjA.symbol} {loc(zodiacObjA.name)} &amp; {zodiacObjB.symbol}{' '}
                      {loc(zodiacObjB.name)}
                    </h2>
                    <span className="text-xs text-[#E5CD91]">
                      {loc(zodiacObjA.element)} × {loc(zodiacObjB.element)}
                    </span>
                  </div>
                  <p className="text-sm text-[#D6DCE5] leading-relaxed">
                    {zodiacObjA.compatibleSlugs.includes(zodiacObjB.slug) ||
                    zodiacObjA.slug === zodiacObjB.slug
                      ? `Classical elemental analysis places ${zodiacObjA.name.en} (${zodiacObjA.element.en}) and ${zodiacObjB.name.en} (${zodiacObjB.element.en}) in a naturally cooperative elemental pairing, often sharing compatible pacing and outlook.`
                      : `${zodiacObjA.name.en} (${zodiacObjA.element.en}, ${zodiacObjA.modality.en}) and ${zodiacObjB.name.en} (${zodiacObjB.element.en}, ${zodiacObjB.modality.en}) bring contrasting elemental perspectives—inviting patient dialogue and appreciation of differing strengths.`}
                  </p>
                </div>
              </div>
            )}

            {/* 6. HIJRI CALENDAR */}
            {tool.slug === 'hijri-calendar' && (
              <div className="bg-[#0C192F] border border-[#C6A35A]/25 p-6 sm:p-8 space-y-6">
                <div>
                  <label htmlFor="hj-date" className="block text-xs text-[#E5CD91] mb-2">
                    Select Gregorian Date
                  </label>
                  <input
                    id="hj-date"
                    type="date"
                    value={calendarDate}
                    onChange={(e) => setCalendarDate(e.target.value)}
                    className="w-full max-w-xs h-11 px-3.5 text-sm tabular-nums-mono bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9]"
                  />
                </div>

                <div className="p-6 bg-[#0C3028]/60 border border-[#C6A35A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <p className="text-xs text-[#E5CD91]">Umm al-Qura Hijri Date</p>
                    <p className="font-display text-3xl text-[#F6F2E9] font-semibold">
                      {hijriResult.formattedEn}
                    </p>
                    <p dir="rtl" lang="ar" className="font-arabic text-xl text-[#E5CD91]">
                      {hijriResult.formattedAr}
                    </p>
                    <p dir="rtl" lang="ur" className="font-urdu text-base text-[#D6DCE5]">
                      {hijriResult.formattedUr}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <MoonPhaseVisual phaseAngle={hijriResult.moonPhase.phaseAngle} size={82} />
                    <span className="tabular-nums-mono text-xs text-[#E5CD91]">
                      {hijriResult.moonPhase.illuminationPercent}% Illuminated
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 7. MOON PHASE CALENDAR */}
            {tool.slug === 'moon-phase' && (
              <div className="bg-[#0C192F] border border-[#C6A35A]/25 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#C6A35A]/15">
                  <div className="flex items-center gap-5">
                    <MoonPhaseVisual phaseAngle={hijriResult.moonPhase.phaseAngle} size={84} />
                    <div>
                      <p className="text-xs text-[#A9B2BE]">Selected Date Lunar Phase</p>
                      <h2 className="font-display text-3xl font-semibold text-[#F6F2E9]">
                        {lang === 'ur'
                          ? hijriResult.moonPhase.phaseNameUr
                          : lang === 'ar'
                            ? hijriResult.moonPhase.phaseNameAr
                            : hijriResult.moonPhase.phaseNameEn}
                      </h2>
                      <p className="tabular-nums-mono text-xs text-[#E5CD91] mt-1">
                        {hijriResult.moonPhase.illuminationPercent}% Lit · Phase Angle{' '}
                        {hijriResult.moonPhase.phaseAngle.toFixed(1)}°
                      </p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="mp-date" className="block text-xs text-[#A9B2BE] mb-1">
                      Reference Start Date
                    </label>
                    <input
                      id="mp-date"
                      type="date"
                      value={calendarDate}
                      onChange={(e) => setCalendarDate(e.target.value)}
                      className="h-10 px-3 text-xs tabular-nums-mono bg-[#091426] border border-[#C6A35A]/30 text-[#F6F2E9]"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.14em] text-[#E5CD91] mb-4">
                    Next 8 Exact Astronomical Lunar Quarters
                  </h3>
                  <div className="divide-y divide-[#C6A35A]/15 border-y border-[#C6A35A]/15">
                    {upcomingMoons.map((q, idx) => (
                      <div
                        key={idx}
                        className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm"
                      >
                        <span className="font-medium text-[#F6F2E9]">
                          {lang === 'ur' ? q.nameUr : lang === 'ar' ? q.nameAr : q.nameEn}
                        </span>
                        <span className="tabular-nums-mono text-xs text-[#E5CD91]">
                          {q.date.toISOString().replace('T', ' ').slice(0, 16)} UTC
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Methodology & Responsible Use Disclosure */}
            <div className="p-5 bg-[#0C3028]/40 border border-[#C6A35A]/20 flex items-start gap-3 text-xs text-[#D6DCE5]">
              <ShieldCheck className="w-4 h-4 text-[#E5CD91] shrink-0 mt-0.5" />
              <p className="leading-relaxed">{loc(tool.methodologyNote)}</p>
            </div>
          </div>

          {/* Right Sidebar: Tool Switcher & Specialist CTA */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#0C192F] border border-[#C6A35A]/25 p-6 space-y-4">
              <h2 className="font-display text-2xl font-semibold text-[#F6F2E9]">
                Prefer Personal Specialist Interpretation?
              </h2>
              <p className="text-xs sm:text-sm text-[#A9B2BE] leading-relaxed">
                Speak privately with a specialist in English, Urdu, or Arabic for nuanced context on
                your chart, naming question, or personal decision.
              </p>
              <button
                type="button"
                onClick={() =>
                  openBooking({
                    serviceSlug: tool.category === 'numerology' ? 'numerology' : 'astrology',
                    language: lang,
                  })
                }
                className="w-full py-3 px-4 bg-[#C6A35A] text-[#091426] font-semibold text-sm hover:bg-[#E5CD91] transition-colors cursor-pointer"
              >
                {t.nav.bookConsultation}
              </button>
            </div>

            <div className="bg-[#0C192F] border border-[#C6A35A]/20 p-6">
              <h3 className="text-xs uppercase tracking-[0.14em] text-[#C6A35A] mb-4">
                All 10 Free Tools
              </h3>
              <ul className="space-y-2.5 text-sm">
                {TOOLS_CATALOG.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/tools/${item.slug}`}
                      className={`block py-1 transition-colors ${
                        item.slug === tool.slug
                          ? 'text-[#E5CD91] font-semibold'
                          : 'text-[#A9B2BE] hover:text-[#F6F2E9]'
                      }`}
                    >
                      {loc(item.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
