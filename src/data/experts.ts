import type { ExpertProfile } from '../types';
import { ASSETS } from './services';

/**
 * EDITORIAL DEVELOPMENT SAMPLE PROFILES
 * Per platform integrity standards, all sample dossiers are explicitly marked `isSampleProfile: true`.
 * Real specialist credentials, verified years of experience, phone numbers, and client reviews
 * are populated exclusively through the administrator verification workflow prior to launch.
 */
export const EXPERTS: ExpertProfile[] = [
  {
    slug: 'sample-classical-astrologer-lahore',
    isSampleProfile: true,
    name: {
      en: 'Tariq Mehmood Qureshi (Sample Profile)',
      ur: 'طارق محمود قریشی (نمونہ پروفائل)',
      ar: 'طارق محمود قريشي (ملف نموذجي)',
    },
    title: {
      en: 'Classical Astrologer & Ephemeris Analyst',
      ur: 'ماہرِ علمِ نجوم و فلکیاتی زائچہ',
      ar: 'مختص التنجيم الكلاسيكي والخرائط الفلكية',
    },
    primarySpeciality: {
      en: 'Astrology & Natal Charts',
      ur: 'علمِ نجوم اور پیدائشی زائچہ',
      ar: 'علم الفلك وخرائط الميلاد',
    },
    serviceSlugs: ['astrology', 'numerology'],
    domain: 'astrology',
    yearsExperienceLabel: {
      en: '14+ yrs (Sample Template)',
      ur: '۱۴+ سال (نمونہ تفصیل)',
      ar: '+14 عاماً (نموذج)',
    },
    experienceYears: 14,
    qualifications: [
      {
        en: 'Classical Tropical & Perso-Arabic Chart Methodology (Sample Credential Slot)',
        ur: 'کلاسیکی مشرقی و مغربی زائچہ سازی کا مطالعہ (نمونہ سند)',
        ar: 'منهجية الخرائط الفلكية الكلاسيكية (خانة مؤهل نموذجي)',
      },
      {
        en: 'Mathematical Ephemeris & Planetary Transit Review',
        ur: 'فلکیاتی درجات اور سالانہ سیاروی ادوار کا تجزیہ',
        ar: 'تحليل الإيفيميريس ودورات العبور الكوكبي',
      },
    ],
    languages: ['en', 'ur'],
    consultationMethods: ['whatsapp', 'phone', 'appointment'],
    availabilityLabel: {
      en: 'Mon–Sat · 16:00–22:00 PKT (11:00–17:00 UK)',
      ur: 'پیر تا ہفتہ · شام ۴ تا رات ۱۰ (پاکستانی وقت)',
      ar: 'الإثنين–السبت · 16:00–22:00 بتوقيت باكستان',
    },
    availabilityWindowPkt: '16:00–22:00 PKT',
    availableForBooking: true,
    feePkr: 6500,
    sessionDurationMinutes: 40,
    location: {
      en: 'Lahore, Pakistan · International Remote',
      ur: 'لاہور، پاکستان · عالمی آن لائن مشاورت',
      ar: 'لاهور، باكستان · استشارات دولية عن بُعد',
    },
    bio: {
      en: 'Sample dossier illustrating how an astrology specialist presents natal chart methodology, ephemeris clarity, and reflective life-timing sessions for clients in the UK, Europe, North America, and Pakistan.',
      ur: 'یہ نمونہ پروفائل واضح کرتا ہے کہ علمِ نجوم کے ماہر کس طرح شفاف فلکیاتی حساب کتاب کے ساتھ پیدائشی زائچہ اور سالانہ ادوار کی مشاورت پیش کرتے ہیں۔',
      ar: 'ملف نموذجي يوضح كيفية عرض مختص الفلك التراثي لمنهجية قراءة خريطة الميلاد بشفافية واحترام.',
    },
    approach: {
      en: 'Separates mathematical astronomical placements from traditional symbolic interpretation, focusing on practical self-reflection without fatalistic claims.',
      ur: 'فلکیاتی حساب کتاب کو روایتی تعبیر سے واضح الگ رکھتے ہوئے مثبت اور عملی فکری رہنمائی پر توجہ۔',
      ar: 'يفصل بدقة بين الحساب الفلكي والتأمل الرمزي التراثي بعيداً عن الجزم بالمستقبل.',
    },
    whatsappNumber: '923000000001',
    phoneNumber: '+92 300 0000001',
    photo: ASSETS.expertAstrologer,
    badges: ['verified-criteria', 'experienced-specialist', 'featured-sample'],
  },
  {
    slug: 'sample-istikhara-rohani-scholar-islamabad',
    isSampleProfile: true,
    name: {
      en: 'Maulana Abdul Wahab Siddiqui (Sample Profile)',
      ur: 'مولانا عبدالوہاب صدیقی (نمونہ پروفائل)',
      ar: 'الشيخ عبد الوهاب صديقي (ملف نموذجي)',
    },
    title: {
      en: 'Islamic Spiritual & Istikhara Guidance Specialist',
      ur: 'ماہرِ مسنون استخارہ و روحانی رہنمائی',
      ar: 'مختص الإرشاد الروحي وصلاة الاستخارة',
    },
    primarySpeciality: {
      en: 'Online Istikhara & Rohani Ilaj',
      ur: 'آن لائن استخارہ اور روحانی رہنمائی',
      ar: 'الاستخارة والإرشاد الروحي',
    },
    serviceSlugs: ['online-istikhara', 'marriage-istikhara', 'rohani-ilaj', 'dua-and-wazifa', 'kala-jadu-ka-tor'],
    domain: 'islamic-spiritual',
    yearsExperienceLabel: {
      en: '18+ yrs (Sample Template)',
      ur: '۱۸+ سال (نمونہ تفصیل)',
      ar: '+18 عاماً (نموذج)',
    },
    experienceYears: 18,
    qualifications: [
      {
        en: 'Classical Islamic Studies & Sunnah Ruqyah Education (Sample Credential Slot)',
        ur: 'درسِ نظامی اور مسنون رقیہ شرعیہ کی تعلیم (نمونہ سند)',
        ar: 'دراسات إسلامية كلاسيكية وتعليم الرقية الشرعية (خانة مؤهل نموذجي)',
      },
      {
        en: 'Multilingual Guidance in Urdu, Arabic & English',
        ur: 'اردو، عربی اور انگریزی میں دینی و روحانی رہنمائی',
        ar: 'إرشاد متعدد اللغات بالعربية والأردية والإنجليزية',
      },
    ],
    languages: ['en', 'ur', 'ar'],
    consultationMethods: ['whatsapp', 'phone', 'appointment'],
    availabilityLabel: {
      en: 'Sun–Fri · 14:00–21:00 PKT (13:00–20:00 UAE)',
      ur: 'اتوار تا جمعہ · دوپہر ۲ تا رات ۹ (پاکستانی وقت)',
      ar: 'الأحد–الجمعة · 14:00–21:00 بتوقيت باكستان',
    },
    availabilityWindowPkt: '14:00–21:00 PKT',
    availableForBooking: true,
    feePkr: 4500,
    sessionDurationMinutes: 35,
    location: {
      en: 'Islamabad, Pakistan · Serving UK, Gulf & Global',
      ur: 'اسلام آباد، پاکستان · برطانیہ، خلیج اور عالمی خدمات',
      ar: 'إسلام آباد، باكستان · يخدم الخليج وأوروبا والعالم',
    },
    bio: {
      en: 'Sample specialist template demonstrating grounded Quran and Sunnah guidance for Istikhara education, authentic supplications, and fear-free Ruqyah Shar\'iyyah consultations.',
      ur: 'یہ نمونہ پروفائل قرآن و سنت پر مبنی مسنون استخارہ، مستند دعاؤں اور خوف سے پاک رقیہ شرعیہ کی رہنمائی کا خاکہ پیش کرتا ہے۔',
      ar: 'نموذج يوضح أسلوب الإرشاد الروحي المنضبط بالقرآن والسنة في الاستخارة والرقية الشرعية والأدعية المأثورة.',
    },
    approach: {
      en: 'Strictly separates Islamic spiritual practice from astrology; emphasizes teaching clients authentic self-recitation and Tawakkul without superstition.',
      ur: 'اسلامی روحانی تعلیمات کو علمِ نجوم سے مکمل الگ رکھتے ہوئے مسنون اذکار اور توکل علی اللہ کی تعلیم پر زور۔',
      ar: 'يفصل تماماً بين الإرشاد الشرعي والتنجيم، ويركز على تعليم الأذكار النبوية الصحيحة والسكينة.',
    },
    whatsappNumber: '923000000002',
    phoneNumber: '+92 300 0000002',
    photo: ASSETS.expertScholar,
    badges: ['verified-criteria', 'experienced-specialist', 'featured-sample'],
  },
  {
    slug: 'sample-family-marriage-counselor-karachi',
    isSampleProfile: true,
    name: {
      en: 'Dr. Saima Farooq Ansari (Sample Profile)',
      ur: 'ڈاکٹر صائمہ فاروق انصاری (نمونہ پروفائل)',
      ar: 'د. صائمة فاروق أنصاري (ملف نموذجي)',
    },
    title: {
      en: 'Marriage, Diaspora Family & Spiritual Counselor',
      ur: 'مشیرِ ازدواج، خاندانی ہم آہنگی و روحانی سکون',
      ar: 'مستشارة الزواج والوئام الأسري والإرشاد الروحي',
    },
    primarySpeciality: {
      en: 'Marriage & Family Guidance',
      ur: 'ازدواجی اور خاندانی رہنمائی',
      ar: 'إرشاد الزواج والأسرة',
    },
    serviceSlugs: ['marriage-relationship-guidance', 'family-guidance', 'marriage-istikhara', 'spiritual-consultation'],
    domain: 'counseling',
    yearsExperienceLabel: {
      en: '12+ yrs (Sample Template)',
      ur: '۱۲+ سال (نمونہ تفصیل)',
      ar: '+12 عاماً (نموذج)',
    },
    experienceYears: 12,
    qualifications: [
      {
        en: 'Family Counselling & Cross-Cultural Diaspora Mediation (Sample Credential Slot)',
        ur: 'خاندانی مشاورت اور اوورسیز ثقافتی مفاہمت (نمونہ سند)',
        ar: 'الإرشاد الأسري والتوفيق الثقافي للجاليات (خانة مؤهل نموذجي)',
      },
      {
        en: 'Confidential Women & Couples Consultation Practice',
        ur: 'خواتین اور جوڑوں کے لیے مکمل رازدارانہ مشاورت',
        ar: 'جلسات خاصة وسرية للسيدات والأزواج',
      },
    ],
    languages: ['en', 'ur'],
    consultationMethods: ['whatsapp', 'appointment'],
    availabilityLabel: {
      en: 'Mon–Fri · 17:00–23:00 PKT (UK & North America Friendly)',
      ur: 'پیر تا جمعہ · شام ۵ تا رات ۱۱ (برطانیہ اور امریکہ کے مطابق)',
      ar: 'الإثنين–الجمعة · 17:00–23:00 بتوقيت باكستان',
    },
    availabilityWindowPkt: '17:00–23:00 PKT',
    availableForBooking: true,
    feePkr: 7000,
    sessionDurationMinutes: 45,
    location: {
      en: 'Karachi, Pakistan · UK, US & Canada Sessions',
      ur: 'کراچی، پاکستان · برطانیہ، امریکہ اور کینیڈا کے لیے سیشنز',
      ar: 'كراتشي، باكستان · جلسات لأوروبا وأمريكا وكندا',
    },
    bio: {
      en: 'Sample profile illustrating a dedicated female specialist supporting overseas Pakistani couples, parents, and individuals navigating marriage proposals, communication challenges, and family balance.',
      ur: 'یہ نمونہ پروفائل خواتین، جوڑوں اور والدین کے لیے ثقافتی حساسیت اور رازداری پر مبنی ازدواجی و خاندانی مشاورت کی نمائندگی کرتا ہے۔',
      ar: 'ملف نموذجي لمختصة تقدم دعماً سرياً ومتفهماً للأزواج والأسر في قضايا الخطبة والتواصل والتربية.',
    },
    approach: {
      en: 'Combines calm, structured listening with deep understanding of Pakistani family heritage and modern diaspora life.',
      ur: 'پاکستانی خاندانی اقدار اور بیرونِ ملک جدید تقاضوں کی گہری سمجھ کے ساتھ ہمدردانہ اور عملی مشاورت۔',
      ar: 'تجمع بين الإصغاء المتزن وفهم الخصوصية الثقافية للأسرة الباكستانية في الخارج.',
    },
    whatsappNumber: '923000000003',
    phoneNumber: '+92 300 0000003',
    photo: ASSETS.expertCounselor,
    badges: ['verified-criteria', 'experienced-specialist', 'featured-sample'],
  },
  {
    slug: 'sample-abjad-numerology-specialist-lahore',
    isSampleProfile: true,
    name: {
      en: 'Salman Haider Kazmi (Sample Profile)',
      ur: 'سلمان حیدر کاظمی (نمونہ پروفائل)',
      ar: 'سلمان حيدر كاظمي (ملف نموذجي)',
    },
    title: {
      en: 'Eastern Abjad (Ilm-ul-Adad) & Classical Naming Advisor',
      ur: 'ماہرِ علمِ ابجد، اعداد و ناموں کی مشاورت',
      ar: 'مختص حساب الجُمَّل (الأبجد) وعلم الأعداد',
    },
    primarySpeciality: {
      en: 'Numerology & Abjad',
      ur: 'علمِ اعداد اور ابجد',
      ar: 'علم الأعداد وحساب الجُمَّل',
    },
    serviceSlugs: ['numerology', 'astrology'],
    domain: 'astrology',
    yearsExperienceLabel: {
      en: '10+ yrs (Sample Template)',
      ur: '۱۰+ سال (نمونہ تفصیل)',
      ar: '+10 أعوام (نموذج)',
    },
    experienceYears: 10,
    qualifications: [
      {
        en: 'Hisab al-Jummal & Classical Urdu/Arabic Onomastics (Sample Credential Slot)',
        ur: 'حساب الجمل اور عربی و اردو ناموں کی لغوی تحقیق (نمونہ سند)',
        ar: 'حساب الجُمَّل ودراسة معاني الأسماء العربية والأردية (نموذج)',
      },
    ],
    languages: ['en', 'ur', 'ar'],
    consultationMethods: ['whatsapp', 'phone', 'appointment'],
    availabilityLabel: {
      en: 'Tue–Sun · 15:00–21:00 PKT',
      ur: 'منگل تا اتوار · سہ پہر ۳ تا رات ۹ (پاکستانی وقت)',
      ar: 'الثلاثاء–الأحد · 15:00–21:00 بتوقيت باكستان',
    },
    availabilityWindowPkt: '15:00–21:00 PKT',
    availableForBooking: true,
    feePkr: 5000,
    sessionDurationMinutes: 30,
    location: {
      en: 'Lahore, Pakistan · Worldwide Remote',
      ur: 'لاہور، پاکستان · دنیا بھر سے رابطہ',
      ar: 'لاهور، باكستان · استشارات دولية',
    },
    bio: {
      en: 'Sample specialist template for Eastern Abjad numerical reviews, meaningful Arabic/Urdu baby naming consultations, and reflective life-path sessions.',
      ur: 'مشرقی علمِ ابجد، بامعنی عربی و اردو ناموں کے انتخاب اور عددی مطالعے کے لیے نمونہ پروفائل۔',
      ar: 'ملف نموذجي لمختص في حساب الجُمَّل المشرقي ومراجعة معاني الأسماء العربية والأردية.',
    },
    approach: {
      en: 'Prioritizes authentic linguistic beauty and transparent arithmetic over superstitious claims.',
      ur: 'وہم پرستی کے بجائے نام کے خوبصورت معنی اور شفاف عددی حساب کو ترجیح۔',
      ar: 'يقدم جمال المعنى اللغوي والحساب الشفاف على أي مبالغات أو أوهام.',
    },
    whatsappNumber: '923000000004',
    phoneNumber: '+92 300 0000004',
    photo: ASSETS.expertAstrologer,
    badges: ['verified-criteria'],
  },
  {
    slug: 'sample-dua-ruqyah-advisor-multan',
    isSampleProfile: true,
    name: {
      en: 'Qari Hafiz Muhammad Usman (Sample Profile)',
      ur: 'قاری حافظ محمد عثمان (نمونہ پروفائل)',
      ar: 'القارئ الحافظ محمد عثمان (ملف نموذجي)',
    },
    title: {
      en: 'Quranic Dua, Adhkar & Ruqyah Shar\'iyyah Educator',
      ur: 'معلّمِ مسنون دعائیں، اذکار و رقیہ شرعیہ',
      ar: 'معلّم الأدعية القرآنية والرقية الشرعية',
    },
    primarySpeciality: {
      en: 'Dua, Wazifa & Protection Guidance',
      ur: 'مسنون دعائیں اور شرعی تحفظ',
      ar: 'الأدعية المأثورة والتحصين الشرعي',
    },
    serviceSlugs: ['dua-and-wazifa', 'rohani-ilaj', 'kala-jadu-ka-tor', 'spiritual-consultation'],
    domain: 'islamic-spiritual',
    yearsExperienceLabel: {
      en: '15+ yrs (Sample Template)',
      ur: '۱۵+ سال (نمونہ تفصیل)',
      ar: '+15 عاماً (نموذج)',
    },
    experienceYears: 15,
    qualifications: [
      {
        en: 'Hifz-ul-Quran, Tajweed & Prophetic Adhkar Instruction (Sample Credential Slot)',
        ur: 'حفظِ قرآن، تجوید اور مسنون اذکار کی تدریس (نمونہ سند)',
        ar: 'حفظ القرآن والتجويد وتعليم الأذكار النبوية (نموذج)',
      },
    ],
    languages: ['ur', 'ar', 'en'],
    consultationMethods: ['whatsapp', 'phone', 'appointment'],
    availabilityLabel: {
      en: 'Sat–Thu · 13:00–20:00 PKT (Gulf & Europe Friendly)',
      ur: 'ہفتہ تا جمعرات · دوپہر ۱ تا رات ۸ (پاکستانی وقت)',
      ar: 'السبت–الخميس · 13:00–20:00 بتوقيت باكستان',
    },
    availabilityWindowPkt: '13:00–20:00 PKT',
    availableForBooking: true,
    feePkr: 4000,
    sessionDurationMinutes: 30,
    location: {
      en: 'Multan, Pakistan · International Audio Consultations',
      ur: 'ملتان، پاکستان · بین الاقوامی آڈیو مشاورت',
      ar: 'ملتان، باكستان · استشارات صوتية دولية',
    },
    bio: {
      en: 'Sample profile dedicated to teaching authentic Quranic pronunciation, Prophetic protection Adhkar, and calm daily remembrance schedules for overseas households.',
      ur: 'بیرونِ ملک خاندانوں کے لیے درست قرآنی تلفظ، مسنون حفاظتی اذکار اور روزانہ دعاؤں کی تعلیم کا نمونہ پروفائل۔',
      ar: 'ملف نموذجي مخصص لتعليم النطق الصحيح للأدعية القرآنية وأذكار التحصين اليومية للأسر.',
    },
    approach: {
      en: 'Empowers every client to recite authentic Quranic verses independently with peace of mind and zero fear-based claims.',
      ur: 'ہر صارف کو خوف کے بغیر خود مستند قرآنی آیات اور مسنون دعائیں پڑھنے کی تربیت فراہم کرتا ہے۔',
      ar: 'يمكّن المستفيد من قراءة الآيات والأذكار بنفسه بطمأنينة تامة ودون أي تهويل.',
    },
    whatsappNumber: '923000000005',
    phoneNumber: '+92 300 0000005',
    photo: ASSETS.expertScholar,
    badges: ['verified-criteria', 'experienced-specialist'],
  },
  {
    slug: 'sample-female-spiritual-guide-islamabad',
    isSampleProfile: true,
    name: {
      en: 'Ustadha Amna Rehman (Sample Profile)',
      ur: 'استاذہ آمنہ رحمان (نمونہ پروفائل)',
      ar: 'الأستاذة آمنة رحمن (ملف نموذجي)',
    },
    title: {
      en: 'Women\'s Spiritual Consultation & Marriage Istikhara Advisor',
      ur: 'خواتین کے لیے روحانی مشاورت اور شادی استخارہ رہنما',
      ar: 'مرشدة روحية للسيدات ومستشارة استخارة الزواج',
    },
    primarySpeciality: {
      en: 'Spiritual & Marriage Istikhara',
      ur: 'روحانی رہنمائی اور شادی استخارہ',
      ar: 'الإرشاد الروحي واستخارة الزواج',
    },
    serviceSlugs: ['spiritual-consultation', 'marriage-istikhara', 'online-istikhara', 'family-guidance'],
    domain: 'islamic-spiritual',
    yearsExperienceLabel: {
      en: '9+ yrs (Sample Template)',
      ur: '۹+ سال (نمونہ تفصیل)',
      ar: '+9 أعوام (نموذج)',
    },
    experienceYears: 9,
    qualifications: [
      {
        en: 'Islamic Ethics, Family Reflection & Women\'s Mentorship (Sample Credential Slot)',
        ur: 'اسلامی اخلاقیات اور خواتین کی روحانی رہنمائی (نمونہ سند)',
        ar: 'الأخلاق الإسلامية وإرشاد السيدات والأسرة (نموذج)',
      },
    ],
    languages: ['en', 'ur'],
    consultationMethods: ['whatsapp', 'appointment'],
    availabilityLabel: {
      en: 'Mon–Sat · 11:00–17:00 PKT (Australia & Gulf Friendly)',
      ur: 'پیر تا ہفتہ · صبح ۱۱ تا شام ۵ (آسٹریلیا اور خلیج کے مطابق)',
      ar: 'الإثنين–السبت · 11:00–17:00 بتوقيت باكستان',
    },
    availabilityWindowPkt: '11:00–17:00 PKT',
    availableForBooking: false,
    feePkr: 5500,
    sessionDurationMinutes: 40,
    location: {
      en: 'Islamabad, Pakistan · Serving Australia, Gulf & UK',
      ur: 'اسلام آباد، پاکستان · آسٹریلیا، خلیج اور برطانیہ',
      ar: 'إسلام آباد، باكستان · تخدم أستراليا والخليج وبريطانيا',
    },
    bio: {
      en: 'Sample profile representing a female spiritual advisor dedicated to supporting women with Istikhara clarity, spiritual grounding during life transitions, and family peace.',
      ur: 'خواتین کو استخارہ، زندگی کی تبدیلیوں میں روحانی استقامت اور گھریلو سکون کے لیے باوقار رہنمائی فراہم کرنے کا نمونہ پروفائل۔',
      ar: 'ملف نموذجي لمرشدة روحية تدعم السيدات في فهم الاستخارة والطمأنينة النفسية والأسرة.',
    },
    approach: {
      en: 'Warm, dignified, and strictly confidential conversations rooted in mercy, patience, and authentic Islamic scholarship.',
      ur: 'شفقت، صبر اور مستند دینی علم کی روشنی میں مکمل باوقار اور رازدارانہ گفتگو۔',
      ar: 'حوار دافئ ومحترم وسري يقوم على الرحمة والصبر والعلم الموثق.',
    },
    whatsappNumber: '923000000006',
    phoneNumber: '+92 300 0000006',
    photo: ASSETS.expertCounselor,
    badges: ['verified-criteria'],
  },
];

export function getExpertBySlug(slug: string): ExpertProfile | undefined {
  return EXPERTS.find((e) => e.slug === slug);
}

export function getExpertsForService(serviceSlug: string): ExpertProfile[] {
  return EXPERTS.filter((e) => e.serviceSlugs.includes(serviceSlug));
}
