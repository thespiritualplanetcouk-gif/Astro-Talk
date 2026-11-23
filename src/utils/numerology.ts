/**
 * Authentic Abjad (Hisab al-Jummal - Eastern Standard) and Pythagorean Numerology Calculations.
 * Every numeric breakdown is mathematically transparent and verifiable letter-by-letter.
 */

export const ARABIC_URDU_ABJAD: Record<string, number> = {
  // Alif forms
  'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ٱ': 1, 'ء': 1,
  // Ba / Pa
  'ب': 2, 'پ': 2,
  // Jeem / Che
  'ج': 3, 'چ': 3,
  // Dal / Ddal
  'د': 4, 'ڈ': 4,
  // Ha / Marbuta / Do-chashmi he
  'ه': 5, 'ہ': 5, 'ھ': 5, 'ة': 5, 'ۃ': 5,
  // Waw
  'و': 6, 'ؤ': 6,
  // Zay / Zhay
  'ز': 7, 'ژ': 7,
  // Ha (heavy)
  'ح': 8,
  // Ta (heavy)
  'ط': 9,
  // Ya / Bari ye / Alif maqsura
  'ي': 10, 'ی': 10, 'ے': 10, 'ى': 10, 'ئ': 10,
  // Kaf / Gaf
  'ك': 20, 'ک': 20, 'گ': 20,
  // Lam
  'ل': 30,
  // Meem
  'م': 40,
  // Noon / Noon Ghunna
  'ن': 50, 'ں': 50,
  // Seen
  'س': 60,
  // Ayn
  'ع': 70,
  // Fa
  'ف': 80,
  // Sad
  'ص': 90,
  // Qaf
  'ق': 100,
  // Ra / Rra
  'ر': 200, 'ڑ': 200,
  // Sheen
  'ش': 300,
  // Ta / Tta
  'ت': 400, 'ٹ': 400,
  // Tha
  'ث': 500,
  // Kha
  'خ': 600,
  // Dhal
  'ذ': 700,
  // Dad
  'ض': 800,
  // Dha
  'ظ': 900,
  // Ghayn
  'غ': 1000,
};

// Phonetic Latin approximation to standard Abjad (clearly disclosed as transliteration estimate)
const LATIN_TO_ABJAD_PHONETIC: Record<string, number> = {
  a: 1, b: 2, p: 2, c: 3, j: 3, d: 4, e: 5, h: 5,
  u: 6, v: 6, w: 6, z: 7, i: 10, y: 10, k: 20, g: 20,
  l: 30, m: 40, n: 50, s: 60, o: 70, f: 80, q: 100,
  r: 200, t: 400, x: 600,
};

export interface AbjadBreakdownItem {
  char: string;
  value: number;
  script: 'arabic-urdu' | 'latin-phonetic';
}

export interface AbjadResult {
  total: number;
  reducedRoot: number; // 1..9
  mod12Index: number; // 0..11 traditional Burj index
  elementIndex: number; // 0=Fire, 1=Earth, 2=Air, 3=Water (traditional mod 4)
  breakdown: AbjadBreakdownItem[];
  usedPhoneticFallback: boolean;
}

export function reduceToSingleDigit(num: number, preserveMaster = false): number {
  let n = Math.abs(Math.trunc(num));
  while (n > 9) {
    if (preserveMaster && (n === 11 || n === 22 || n === 33)) {
      return n;
    }
    n = String(n)
      .split('')
      .reduce((sum, d) => sum + Number(d), 0);
  }
  return n;
}

export function calculateAbjad(input: string): AbjadResult {
  const breakdown: AbjadBreakdownItem[] = [];
  let total = 0;
  let usedPhoneticFallback = false;

  for (const ch of input) {
    if (ARABIC_URDU_ABJAD[ch] !== undefined) {
      const val = ARABIC_URDU_ABJAD[ch];
      total += val;
      breakdown.push({ char: ch, value: val, script: 'arabic-urdu' });
    } else {
      const lower = ch.toLowerCase();
      if (LATIN_TO_ABJAD_PHONETIC[lower] !== undefined) {
        const val = LATIN_TO_ABJAD_PHONETIC[lower];
        total += val;
        usedPhoneticFallback = true;
        breakdown.push({ char: ch.toUpperCase(), value: val, script: 'latin-phonetic' });
      }
    }
  }

  const reducedRoot = total > 0 ? reduceToSingleDigit(total, false) : 0;
  const mod12Index = total > 0 ? ((total - 1) % 12) : 0;
  const elementIndex = total > 0 ? ((total - 1) % 4) : 0;

  return {
    total,
    reducedRoot,
    mod12Index,
    elementIndex,
    breakdown,
    usedPhoneticFallback,
  };
}

const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

export interface LifePathResult {
  lifePathNumber: number;
  isMasterNumber: boolean;
  yearSum: number;
  monthSum: number;
  daySum: number;
  totalBeforeFinal: number;
}

export function calculateLifePath(isoDate: string): LifePathResult | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const yearSum = reduceToSingleDigit(year, true);
  const monthSum = reduceToSingleDigit(month, true);
  const daySum = reduceToSingleDigit(day, true);
  const totalBeforeFinal = yearSum + monthSum + daySum;
  const lifePathNumber = reduceToSingleDigit(totalBeforeFinal, true);

  return {
    lifePathNumber,
    isMasterNumber: lifePathNumber === 11 || lifePathNumber === 22 || lifePathNumber === 33,
    yearSum,
    monthSum,
    daySum,
    totalBeforeFinal,
  };
}

export function calculatePythagoreanNameNumber(name: string): {
  expressionNumber: number;
  rawSum: number;
  letterCount: number;
} {
  let rawSum = 0;
  let letterCount = 0;

  for (const ch of name) {
    const lower = ch.toLowerCase();
    if (PYTHAGOREAN_MAP[lower] !== undefined) {
      rawSum += PYTHAGOREAN_MAP[lower];
      letterCount++;
    } else if (ARABIC_URDU_ABJAD[ch] !== undefined) {
      rawSum += reduceToSingleDigit(ARABIC_URDU_ABJAD[ch], false);
      letterCount++;
    }
  }

  return {
    expressionNumber: rawSum > 0 ? reduceToSingleDigit(rawSum, true) : 0,
    rawSum,
    letterCount,
  };
}

export interface NameHarmonyResult {
  firstNumber: number;
  secondNumber: number;
  combinedRoot: number;
  harmonyTier: 'complementary' | 'balanced' | 'dynamic';
  summaryEn: string;
  summaryUr: string;
  summaryAr: string;
}

export function calculateNameCompatibility(firstName: string, secondName: string): NameHarmonyResult | null {
  const n1 = calculatePythagoreanNameNumber(firstName);
  const n2 = calculatePythagoreanNameNumber(secondName);
  if (n1.letterCount === 0 || n2.letterCount === 0) return null;

  const r1 = reduceToSingleDigit(n1.expressionNumber, false);
  const r2 = reduceToSingleDigit(n2.expressionNumber, false);
  const combinedRoot = reduceToSingleDigit(r1 + r2, false);
  const diff = Math.abs(r1 - r2);

  let harmonyTier: NameHarmonyResult['harmonyTier'] = 'balanced';
  let summaryEn =
    'These two name numbers reflect a balanced pairing that benefits from steady communication and mutual clarity.';
  let summaryUr =
    'دونوں ناموں کے اعداد ایک متوازن ہم آہنگی ظاہر کرتے ہیں جسے باہمی گفتگو اور سمجھ بوجھ سے مزید مضبوط بنایا جا سکتا ہے۔';
  let summaryAr =
    'تشير أرقام الاسمين إلى توازن ملحوظ يزدهر عبر التواصل الصريح والاحترام المتبادل.';

  if (diff === 0 || diff === 3 || diff === 6) {
    harmonyTier = 'complementary';
    summaryEn =
      'Both name numbers fall within the same classical numerological triad, traditionally associated with natural rhythm and shared tempo.';
    summaryUr =
      'دونوں ناموں کے اعداد ایک ہی روایتی عددی سلسلے میں آتے ہیں، جو قدرتی ہم آہنگی اور مشترکہ مزاج کی علامت سمجھے جاتے ہیں۔';
    summaryAr =
      'ينتمي رقما الاسمين إلى نفس الثلاثية العددية الكلاسيكية، مما يرمز تقليدياً إلى انسجام طبيعي وتقارب في الإيقاع.';
  } else if (diff === 1 || diff === 5 || diff === 7) {
    harmonyTier = 'dynamic';
    summaryEn =
      'A dynamic numerical contrast that can bring complementary strengths when approached with patience and attentive listening.';
    summaryUr =
      'یہ عددی امتزاج متحرک نوعیت کا ہے جو صبر، غور و فکر اور ایک دوسرے کے نقطہ نظر کو سمجھنے سے مثبت نتائج دیتا ہے۔';
    summaryAr =
      'تباين عددي حيوي يمنح الطرفين نقاط قوة متكاملة عند التعامل معه بالصبر وحسن الاستماع.';
  }

  return {
    firstNumber: n1.expressionNumber,
    secondNumber: n2.expressionNumber,
    combinedRoot,
    harmonyTier,
    summaryEn,
    summaryUr,
    summaryAr,
  };
}
