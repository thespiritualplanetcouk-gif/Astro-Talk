export interface QuranVerseCard {
  id: string;
  arabic: string;
  surahEn: string;
  surahUr: string;
  surahAr: string;
  reference: string;
  english: string;
  urdu: string;
  reflectionEn: string;
  reflectionUr: string;
  reflectionAr: string;
}

export const QURAN_INSPIRATION_VERSES: QuranVerseCard[] = [
  {
    id: 'ar-rad-13-28',
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    surahEn: "Surah Ar-Ra'd",
    surahUr: 'سورۃ الرعد',
    surahAr: 'سورة الرعد',
    reference: '13:28',
    english: 'Unquestionably, by the remembrance of Allah hearts find tranquility.',
    urdu: 'خبردار! اللہ کے ذکر ہی سے دلوں کو اطمینان حاصل ہوتا ہے۔',
    reflectionEn: 'Peace of heart begins with sincere remembrance and unhurried reflection.',
    reflectionUr: 'دل کا حقیقی سکون خلوصِ نیت سے اللہ کے ذکر اور اطمینانِ قلب میں پوشیدہ ہے۔',
    reflectionAr: 'السكينة القلبية تبدأ بصدق الذكر واللجوء المطمئن إلى الله.',
  },
  {
    id: 'al-hadid-57-4',
    arabic: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنْتُمْ',
    surahEn: 'Surah Al-Hadid',
    surahUr: 'سورۃ الحدید',
    surahAr: 'سورة الحديد',
    reference: '57:4',
    english: 'And He is with you wherever you are.',
    urdu: 'اور تم جہاں کہیں بھی ہو، وہ (اپنے علم اور نگہبانی کے ساتھ) تمہارے ساتھ ہے۔',
    reflectionEn: 'A comforting reminder for families living far from home across continents.',
    reflectionUr: 'وطن سے دور بیرونِ ملک مقیم خاندانوں کے لیے بے حد تسلی بخش ربانی پیغام۔',
    reflectionAr: 'تذكير يبعث الطمأنينة في نفوس المغتربين والأسر في كل بقاع الأرض.',
  },
  {
    id: 'ash-sharh-94-5',
    arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
    surahEn: 'Surah Ash-Sharh',
    surahUr: 'سورۃ الانشراح',
    surahAr: 'سورة الشرح',
    reference: '94:5',
    english: 'For indeed, with hardship comes ease.',
    urdu: 'پس بے شک ہر مشکل کے ساتھ آسانی ہے۔',
    reflectionEn: 'Seasons of difficulty are never permanent; patience and counsel illuminate the path ahead.',
    reflectionUr: 'مشکل ادوار ہمیشہ نہیں رہتے؛ صبر، دعا اور دانشمندانہ مشورہ نئی راہیں کھولتا ہے۔',
    reflectionAr: 'مراحل الضيق عابرة، ومع الصبر والدعاء والمشورة الحكيمة ينفتح باب اليسر.',
  },
  {
    id: 'at-talaq-65-3',
    arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    surahEn: 'Surah At-Talaq',
    surahUr: 'سورۃ الطلاق',
    surahAr: 'سورة الطلاق',
    reference: '65:3',
    english: 'And whoever relies upon Allah — then He is sufficient for him.',
    urdu: 'اور جو شخص اللہ پر بھروسہ کرتا ہے، تو وہ اس کے لیے کافی ہے۔',
    reflectionEn: 'Take wise practical steps, seek respectful advice, and entrust every outcome to Allah.',
    reflectionUr: 'دانائی کے ساتھ عملی اسباب اختیار کریں، خیرخواہانہ مشورہ لیں اور انجام اللہ کے سپرد کریں۔',
    reflectionAr: 'ابذل الأسباب الحكيمة واستشر أهل الخير ثم فوض الأمر كله إلى الله.',
  },
];
