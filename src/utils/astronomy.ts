import * as Astronomy from 'astronomy-engine';

export interface ZodiacPosition {
  longitude: number;
  signIndex: number; // 0 = Aries .. 11 = Pisces
  signSlug: string;
  signName: string;
  signSymbol: string;
  degreeInSign: number;
  formattedDegree: string;
}

export interface PlanetPlacement {
  body: string;
  symbol: string;
  position: ZodiacPosition;
}

export interface MoonPhaseSnapshot {
  phaseAngle: number; // 0..360
  illuminationFraction: number; // 0..1
  illuminationPercent: number;
  phaseKey:
    | 'new-moon'
    | 'waxing-crescent'
    | 'first-quarter'
    | 'waxing-gibbous'
    | 'full-moon'
    | 'waning-gibbous'
    | 'last-quarter'
    | 'waning-crescent';
  phaseNameEn: string;
  phaseNameUr: string;
  phaseNameAr: string;
}

export interface CosmicSnapshot {
  calculatedAtUtc: string;
  planets: PlanetPlacement[];
  sun: PlanetPlacement;
  moon: PlanetPlacement;
  moonPhase: MoonPhaseSnapshot;
}

export interface CityCoordinate {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  timeZone: string;
}

export const GLOBAL_CITIES: CityCoordinate[] = [
  { id: 'lahore', name: 'Lahore', country: 'Pakistan', lat: 31.5204, lon: 74.3587, timeZone: 'Asia/Karachi' },
  { id: 'karachi', name: 'Karachi', country: 'Pakistan', lat: 24.8607, lon: 67.0011, timeZone: 'Asia/Karachi' },
  { id: 'islamabad', name: 'Islamabad', country: 'Pakistan', lat: 33.6844, lon: 73.0479, timeZone: 'Asia/Karachi' },
  { id: 'rawalpindi', name: 'Rawalpindi', country: 'Pakistan', lat: 33.5651, lon: 73.0169, timeZone: 'Asia/Karachi' },
  { id: 'faisalabad', name: 'Faisalabad', country: 'Pakistan', lat: 31.4504, lon: 73.135, timeZone: 'Asia/Karachi' },
  { id: 'multan', name: 'Multan', country: 'Pakistan', lat: 30.1575, lon: 71.5249, timeZone: 'Asia/Karachi' },
  { id: 'peshawar', name: 'Peshawar', country: 'Pakistan', lat: 34.0151, lon: 71.5249, timeZone: 'Asia/Karachi' },
  { id: 'quetta', name: 'Quetta', country: 'Pakistan', lat: 30.1798, lon: 66.975, timeZone: 'Asia/Karachi' },
  { id: 'london', name: 'London', country: 'United Kingdom', lat: 51.5072, lon: -0.1276, timeZone: 'Europe/London' },
  { id: 'birmingham', name: 'Birmingham', country: 'United Kingdom', lat: 52.4862, lon: -1.8904, timeZone: 'Europe/London' },
  { id: 'manchester', name: 'Manchester', country: 'United Kingdom', lat: 53.4808, lon: -2.2426, timeZone: 'Europe/London' },
  { id: 'bradford', name: 'Bradford', country: 'United Kingdom', lat: 53.796, lon: -1.7594, timeZone: 'Europe/London' },
  { id: 'glasgow', name: 'Glasgow', country: 'United Kingdom', lat: 55.8642, lon: -4.2518, timeZone: 'Europe/London' },
  { id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708, timeZone: 'Asia/Dubai' },
  { id: 'abudhabi', name: 'Abu Dhabi', country: 'United Arab Emirates', lat: 24.4539, lon: 54.3773, timeZone: 'Asia/Dubai' },
  { id: 'riyadh', name: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lon: 46.6753, timeZone: 'Asia/Riyadh' },
  { id: 'jeddah', name: 'Jeddah', country: 'Saudi Arabia', lat: 21.4858, lon: 39.1925, timeZone: 'Asia/Riyadh' },
  { id: 'doha', name: 'Doha', country: 'Qatar', lat: 25.2854, lon: 51.531, timeZone: 'Asia/Qatar' },
  { id: 'newyork', name: 'New York', country: 'United States', lat: 40.7128, lon: -74.006, timeZone: 'America/New_York' },
  { id: 'houston', name: 'Houston', country: 'United States', lat: 29.7604, lon: -95.3698, timeZone: 'America/Chicago' },
  { id: 'chicago', name: 'Chicago', country: 'United States', lat: 41.8781, lon: -87.6298, timeZone: 'America/Chicago' },
  { id: 'losangeles', name: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437, timeZone: 'America/Los_Angeles' },
  { id: 'toronto', name: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832, timeZone: 'America/Toronto' },
  { id: 'vancouver', name: 'Vancouver', country: 'Canada', lat: 49.2827, lon: -123.1207, timeZone: 'America/Vancouver' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, timeZone: 'Australia/Sydney' },
  { id: 'melbourne', name: 'Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631, timeZone: 'Australia/Melbourne' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', lat: 52.52, lon: 13.405, timeZone: 'Europe/Berlin' },
  { id: 'paris', name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, timeZone: 'Europe/Paris' },
  { id: 'oslo', name: 'Oslo', country: 'Norway', lat: 59.9139, lon: 10.7522, timeZone: 'Europe/Oslo' },
  { id: 'madrid', name: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038, timeZone: 'Europe/Madrid' },
];

const SIGN_META = [
  { slug: 'aries', name: 'Aries', symbol: '♈' },
  { slug: 'taurus', name: 'Taurus', symbol: '♉' },
  { slug: 'gemini', name: 'Gemini', symbol: '♊' },
  { slug: 'cancer', name: 'Cancer', symbol: '♋' },
  { slug: 'leo', name: 'Leo', symbol: '♌' },
  { slug: 'virgo', name: 'Virgo', symbol: '♍' },
  { slug: 'libra', name: 'Libra', symbol: '♎' },
  { slug: 'scorpio', name: 'Scorpio', symbol: '♏' },
  { slug: 'sagittarius', name: 'Sagittarius', symbol: '♐' },
  { slug: 'capricorn', name: 'Capricorn', symbol: '♑' },
  { slug: 'aquarius', name: 'Aquarius', symbol: '♒' },
  { slug: 'pisces', name: 'Pisces', symbol: '♓' },
];

export function normalizeDegrees(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

export function longitudeToZodiac(longitude: number): ZodiacPosition {
  const norm = normalizeDegrees(longitude);
  const signIndex = Math.floor(norm / 30) % 12;
  const degreeInSign = norm - signIndex * 30;
  const wholeDeg = Math.floor(degreeInSign);
  const mins = Math.floor((degreeInSign - wholeDeg) * 60);
  const meta = SIGN_META[signIndex];

  return {
    longitude: norm,
    signIndex,
    signSlug: meta.slug,
    signName: meta.name,
    signSymbol: meta.symbol,
    degreeInSign,
    formattedDegree: `${wholeDeg}° ${String(mins).padStart(2, '0')}'`,
  };
}

function getGeocentricEclipticLongitude(body: Astronomy.Body, date: Date): number {
  const vec = Astronomy.GeoVector(body, date, true);
  const ecl = Astronomy.Ecliptic(vec);
  return normalizeDegrees(ecl.elon);
}

export function getMoonPhaseSnapshot(date: Date): MoonPhaseSnapshot {
  const phaseAngle = normalizeDegrees(Astronomy.MoonPhase(date));
  const illum = Astronomy.Illumination(Astronomy.Body.Moon, date);
  const fraction = illum.phase_fraction;

  let phaseKey: MoonPhaseSnapshot['phaseKey'] = 'new-moon';
  let phaseNameEn = 'New Moon';
  let phaseNameUr = 'نیا چاند (ہلال آغاز)';
  let phaseNameAr = 'المحاق (هلال جديد)';

  if (phaseAngle < 22.5 || phaseAngle >= 337.5) {
    phaseKey = 'new-moon';
    phaseNameEn = 'New Moon';
    phaseNameUr = 'نیا چاند';
    phaseNameAr = 'المحاق';
  } else if (phaseAngle < 67.5) {
    phaseKey = 'waxing-crescent';
    phaseNameEn = 'Waxing Crescent';
    phaseNameUr = 'بڑھتا ہوا ہلال';
    phaseNameAr = 'الهلال المتزايد';
  } else if (phaseAngle < 112.5) {
    phaseKey = 'first-quarter';
    phaseNameEn = 'First Quarter';
    phaseNameUr = 'پہلی تربیع';
    phaseNameAr = 'التربيع الأول';
  } else if (phaseAngle < 157.5) {
    phaseKey = 'waxing-gibbous';
    phaseNameEn = 'Waxing Gibbous';
    phaseNameUr = 'بڑھتا ہوا بدر نما';
    phaseNameAr = 'الأحدب المتزايد';
  } else if (phaseAngle < 202.5) {
    phaseKey = 'full-moon';
    phaseNameEn = 'Full Moon';
    phaseNameUr = 'چودھویں کا چاند (بدر)';
    phaseNameAr = 'البدر المكتمل';
  } else if (phaseAngle < 247.5) {
    phaseKey = 'waning-gibbous';
    phaseNameEn = 'Waning Gibbous';
    phaseNameUr = 'گھٹتا ہوا بدر نما';
    phaseNameAr = 'الأحدب المتناقص';
  } else if (phaseAngle < 292.5) {
    phaseKey = 'last-quarter';
    phaseNameEn = 'Last Quarter';
    phaseNameUr = 'آخری تربیع';
    phaseNameAr = 'التربيع الأخير';
  } else {
    phaseKey = 'waning-crescent';
    phaseNameEn = 'Waning Crescent';
    phaseNameUr = 'گھٹتا ہوا ہلال';
    phaseNameAr = 'الهلال المتناقص';
  }

  return {
    phaseAngle,
    illuminationFraction: fraction,
    illuminationPercent: Math.round(fraction * 100),
    phaseKey,
    phaseNameEn,
    phaseNameUr,
    phaseNameAr,
  };
}

const PLANET_LIST: { body: Astronomy.Body; label: string; symbol: string }[] = [
  { body: Astronomy.Body.Sun, label: 'Sun', symbol: '☉' },
  { body: Astronomy.Body.Moon, label: 'Moon', symbol: '☽' },
  { body: Astronomy.Body.Mercury, label: 'Mercury', symbol: '☿' },
  { body: Astronomy.Body.Venus, label: 'Venus', symbol: '♀' },
  { body: Astronomy.Body.Mars, label: 'Mars', symbol: '♂' },
  { body: Astronomy.Body.Jupiter, label: 'Jupiter', symbol: '♃' },
  { body: Astronomy.Body.Saturn, label: 'Saturn', symbol: '♄' },
  { body: Astronomy.Body.Uranus, label: 'Uranus', symbol: '♅' },
  { body: Astronomy.Body.Neptune, label: 'Neptune', symbol: '♆' },
  { body: Astronomy.Body.Pluto, label: 'Pluto', symbol: '♇' },
];

export function calculateCosmicSnapshot(date: Date = new Date()): CosmicSnapshot {
  const planets: PlanetPlacement[] = PLANET_LIST.map((item) => {
    const lon = getGeocentricEclipticLongitude(item.body, date);
    return {
      body: item.label,
      symbol: item.symbol,
      position: longitudeToZodiac(lon),
    };
  });

  return {
    calculatedAtUtc: date.toISOString(),
    planets,
    sun: planets[0],
    moon: planets[1],
    moonPhase: getMoonPhaseSnapshot(date),
  };
}

/**
 * Computes the Tropical Ascendant (Rising Sign) using Greenwich Apparent Sidereal Time
 * from astronomy-engine, observer latitude/longitude, and mean obliquity of the ecliptic.
 */
export function calculateAscendant(date: Date, latitudeDeg: number, longitudeDeg: number): ZodiacPosition {
  const gstHours = Astronomy.SiderealTime(date);
  const lstDeg = normalizeDegrees(gstHours * 15 + longitudeDeg);
  const lstRad = (lstDeg * Math.PI) / 180;
  const latRad = (latitudeDeg * Math.PI) / 180;

  // Mean obliquity of the ecliptic (J2000)
  const epsDeg = 23.4392911;
  const epsRad = (epsDeg * Math.PI) / 180;

  const y = -Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  let ascDeg = (Math.atan2(y, x) * 180) / Math.PI;
  ascDeg = normalizeDegrees(ascDeg);

  // Standard quadrant check: Ascendant is the eastern horizon point (LST + 90° quadrant)
  const easternRef = normalizeDegrees(lstDeg + 90);
  const diff = Math.abs(normalizeDegrees(ascDeg - easternRef + 180) - 180);
  if (diff > 90) {
    ascDeg = normalizeDegrees(ascDeg + 180);
  }

  return longitudeToZodiac(ascDeg);
}

export interface UpcomingLunarQuarter {
  quarter: number; // 0=New, 1=First Quarter, 2=Full, 3=Last Quarter
  nameEn: string;
  nameUr: string;
  nameAr: string;
  date: Date;
}

export function getUpcomingLunarPhases(fromDate: Date = new Date(), count = 8): UpcomingLunarQuarter[] {
  const labels = [
    { en: 'New Moon', ur: 'نیا چاند', ar: 'المحاق' },
    { en: 'First Quarter', ur: 'پہلی تربیع', ar: 'التربيع الأول' },
    { en: 'Full Moon', ur: 'بدر (چودھویں کا چاند)', ar: 'البدر المكتمل' },
    { en: 'Last Quarter', ur: 'آخری تربیع', ar: 'التربيع الأخير' },
  ];

  const results: UpcomingLunarQuarter[] = [];
  let mq = Astronomy.SearchMoonQuarter(fromDate);
  for (let i = 0; i < count; i++) {
    const meta = labels[mq.quarter % 4];
    results.push({
      quarter: mq.quarter,
      nameEn: meta.en,
      nameUr: meta.ur,
      nameAr: meta.ar,
      date: mq.time.date,
    });
    mq = Astronomy.NextMoonQuarter(mq);
  }
  return results;
}

export interface HijriConversion {
  formattedEn: string;
  formattedAr: string;
  formattedUr: string;
  moonPhase: MoonPhaseSnapshot;
}

export function convertToHijri(date: Date): HijriConversion {
  const fmtEn = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(date);

  const fmtAr = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(date);

  const fmtUr = new Intl.DateTimeFormat('ur-PK-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(date);

  return {
    formattedEn: fmtEn,
    formattedAr: fmtAr,
    formattedUr: fmtUr,
    moonPhase: getMoonPhaseSnapshot(date),
  };
}
