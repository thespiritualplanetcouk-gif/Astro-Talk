import { ASSETS } from './services';

export const NEW_ASSETS = {
  heroHoroscope: '/src/assets/images/hero_horoscope_sunlight_1795436812728.jpg',
  heroSpiritual: '/src/assets/images/hero_spiritual_courtyard_1795436809765.jpg',
  careerBusiness: '/src/assets/images/svc_career_business_desk_1795436813134.jpg',
  peacefulWellbeing: '/src/assets/images/svc_peaceful_wellbeing_1795436808847.jpg',
  kundliCompatibility: '/src/assets/images/svc_kundli_compatibility_1795436810362.jpg',
  rizqBlessingDua: '/src/assets/images/svc_rizq_blessing_dua_1795436831343.jpg',
  celestialChartAlt: '/src/assets/images/service_astrology_celestial_1795430671336.jpg',
};

// Central contact details already configured in the existing project (never invented)
export const CENTRAL_WHATSAPP_NUMBER = '923000000000';
export const CENTRAL_PHONE_NUMBER = '+92 300 0000000';

export interface HeroSlideItem {
  id: string;
  eyebrow: string;
  headline: string;
  supportingText: string;
  ctaLabel: string;
  ctaAction: 'scroll-horoscope' | 'route' | 'booking-first-reading';
  ctaTarget?: string;
  secondaryLabel: string;
  secondaryTarget: string;
  conditionNote?: string;
  image: string;
  imageAlt: string;
  domainLabel: string;
}

export const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'todays-horoscope',
    eyebrow: 'Daily Horoscope · Live Astronomical Insights',
    headline: 'Aaj Ka Horoscope – آپ کا آج کا دن کیسا رہے گا؟',
    supportingText:
      'Discover Your Daily Horoscope, Zodiac Predictions & Astrological Insights.',
    ctaLabel: "Check Today's Horoscope",
    ctaAction: 'scroll-horoscope',
    ctaTarget: '#zodiac-horoscope',
    secondaryLabel: 'Create Free Birth Chart',
    secondaryTarget: '/tools/birth-chart',
    image: NEW_ASSETS.heroHoroscope,
    imageAlt: 'Sunlit brass armillary sphere and celestial astrolabe in a luxury observatory',
    domainLabel: 'Classical Astrology & Ephemeris',
  },
  {
    id: 'free-birth-chart',
    eyebrow: 'Real Ephemeris Calculation · 100% Private',
    headline: 'اپنا Free زائچہ بنوائیں – Discover Your Birth Chart',
    supportingText: 'Know Your Sun Sign, Moon Sign, Rising Sign & Birth Chart.',
    ctaLabel: 'Create My Free Birth Chart',
    ctaAction: 'route',
    ctaTarget: '/tools/birth-chart',
    secondaryLabel: 'Browse Astrologers',
    secondaryTarget: '/experts?service=astrology',
    image: ASSETS.astrology,
    imageAlt: 'Gold and ivory classical birth chart calculation layout',
    domainLabel: 'Interactive Natal Chart Tool',
  },
  {
    id: 'first-reading-free',
    eyebrow: 'Welcome Orientation · First-Time Clients',
    headline: 'First Reading Free – پہلی ریڈنگ بالکل مفت!',
    supportingText: 'Start Your Journey with a Free Initial Reading.',
    ctaLabel: 'Get Your Free First Reading',
    ctaAction: 'booking-first-reading',
    secondaryLabel: 'Compare Specialists',
    secondaryTarget: '/experts',
    conditionNote:
      'Conditions: Brief introductory initial reading available for first-time clients with participating specialists, subject to schedule availability. Full consultation fees are always disclosed upfront before confirmation.',
    image: ASSETS.heroObservatory,
    imageAlt: 'Celestial luxury consultation observatory room',
    domainLabel: 'Introductory Consultation',
  },
  {
    id: 'islamic-spiritual-guidance',
    eyebrow: 'Respectful & Confidential · Separate from Astrology',
    headline: 'پریشان ہیں؟ روحانی رہنمائی حاصل کریں',
    supportingText: 'Islamic Spiritual Guidance – Quran & Sunnah Based.',
    ctaLabel: 'Talk to a Spiritual Guide',
    ctaAction: 'route',
    ctaTarget: '/experts?service=rohani-ilaj',
    secondaryLabel: 'Explore Istikhara & Duas',
    secondaryTarget: '/services/online-istikhara',
    image: NEW_ASSETS.heroSpiritual,
    imageAlt: 'Serene sunlit Islamic marble courtyard with emerald geometric tilework',
    domainLabel: 'Quran & Sunnah Spiritual Care',
  },
];

export interface HomepageServiceCard {
  id: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  serviceSlug: string;
  actionRoute: string;
  actionLabel: string;
  whatsappText: string;
}

export interface HomepageServiceGroup {
  id: 'astrology' | 'rohani' | 'marriage-istikhara' | 'business-personal' | 'health-wellbeing';
  number: string;
  domainTag: string;
  title: string;
  subtitle: string;
  accentStyle: 'ivory' | 'sage' | 'white';
  ethicalNotice?: string;
  cards: HomepageServiceCard[];
}

export const HOMEPAGE_SERVICE_GROUPS: HomepageServiceGroup[] = [
  {
    id: 'astrology',
    number: '01',
    domainTag: 'Classical Astrology & Ephemeris · Separate from Islamic Religious Rulings',
    title: 'Astrology & Birth Chart Services – علمِ نجوم اور زائچہ',
    subtitle:
      'Transparent ephemeris-based natal charts, daily horoscope insights, compatibility checks, and classical numerology consultations for clients worldwide.',
    accentStyle: 'ivory',
    cards: [
      {
        id: 'astro-free-zaicha',
        headline: 'اپنا Free زائچہ بنوائیں',
        description:
          'Date, time aur city of birth ke mutabiq apna complete Sun, Moon aur Rising Sign chart foran check karein.',
        image: ASSETS.astrology,
        imageAlt: 'Classical ivory and gold natal birth chart illustration',
        serviceSlug: 'astrology',
        actionRoute: '/tools/birth-chart',
        actionLabel: 'Create Free Chart',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like guidance on my Free Birth Chart (Zaicha).',
      },
      {
        id: 'astro-aaj-ka-horoscope',
        headline: 'Aaj Ka Horoscope Check Karein',
        description:
          'Rozana ke planetary movements aur apne zodiac sign ke liye reflective astrological insights dekhein.',
        image: NEW_ASSETS.heroHoroscope,
        imageAlt: 'Sunlit brass astrolabe and armillary sphere for daily horoscope insights',
        serviceSlug: 'astrology',
        actionRoute: '/zodiac/aries',
        actionLabel: 'Read Horoscope',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like to discuss my horoscope and current transits with an astrologer.',
      },
      {
        id: 'astro-marriage-compat',
        headline: 'Marriage Compatibility Check',
        description:
          'Classical elemental aur planetary compatibility review ke zariye baahmi mizaaj aur communication samjhein.',
        image: NEW_ASSETS.kundliCompatibility,
        imageAlt: 'Two gold-lined celestial charts with jasmine blossoms on cream travertine',
        serviceSlug: 'astrology',
        actionRoute: '/tools/zodiac-compatibility',
        actionLabel: 'Check Compatibility',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like to book a Marriage Compatibility consultation.',
      },
      {
        id: 'astro-free-reading',
        headline: 'Free Birth Chart Reading',
        description:
          'Apne calculated natal chart ke ahem planetary placements par experienced astrologer se ibtidai rehnumai lein.',
        image: ASSETS.heroObservatory,
        imageAlt: 'Refined celestial observatory table with astronomical instruments',
        serviceSlug: 'astrology',
        actionRoute: '/tools/birth-chart',
        actionLabel: 'Open Birth Chart',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like to enquire about a Birth Chart Reading.',
      },
      {
        id: 'astro-kundli-matching',
        headline: 'Kundli Matching',
        description:
          'Traditional South Asian aur classical natal chart comparison for families exploring marriage proposals.',
        image: NEW_ASSETS.celestialChartAlt,
        imageAlt: 'Traditional celestial coordinate rings and planetary alignment visual',
        serviceSlug: 'astrology',
        actionRoute: '/services/astrology',
        actionLabel: 'Explore Service',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like to consult an astrologer for Kundli Matching.',
      },
      {
        id: 'astro-career-business',
        headline: 'Career & Business Astrology',
        description:
          'Major planetary cycles aur timing windows ka mutalia taake career change ya business planning par ghor kiya ja sake.',
        image: NEW_ASSETS.careerBusiness,
        imageAlt: 'Sunlit travertine executive desk with journal and brass compass',
        serviceSlug: 'astrology',
        actionRoute: '/services/astrology',
        actionLabel: 'Consult Astrologer',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like a Career & Business Astrology consultation.',
      },
      {
        id: 'astro-numerology',
        headline: 'Numerology Consultation',
        description:
          'Eastern Abjad (Ilm-ul-Adad), baby naming suggestions aur Life Path number analysis with transparent arithmetic.',
        image: ASSETS.numerology,
        imageAlt: 'Sacred geometric brass and ivory Abjad numerology composition',
        serviceSlug: 'numerology',
        actionRoute: '/services/numerology',
        actionLabel: 'Explore Numerology',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like a Numerology & Abjad consultation.',
      },
    ],
  },
  {
    id: 'rohani',
    number: '02',
    domainTag: 'Islamic Spiritual Guidance · Strictly Quran & Sunnah Based',
    title: 'Rohani Guidance – قرآن و سنت پر مبنی روحانی رہنمائی',
    subtitle:
      'Dignified, fear-free Islamic spiritual consultations rooted in authentic Quranic recitation, Ruqyah Shar\'iyyah, and Prophetic supplications—never superstition.',
    accentStyle: 'sage',
    ethicalNotice:
      'All Rohani Guidance sessions follow authentic Quran & Sunnah principles. We never accuse relatives, never spread fear, and never promise guaranteed supernatural outcomes.',
    cards: [
      {
        id: 'rohani-kala-jadu',
        headline: 'کالا جادو کے خدشات؟ روحانی رہنمائی حاصل کریں',
        description:
          'Wehm aur khauf ke baghair masnoon Ruqyah Shar\'iyyah aur Quranic protection (Hifazat) ka sahih tareeqa seekhein.',
        image: ASSETS.protection,
        imageAlt: 'Respectful Islamic geometric calligraphy art on warm ivory',
        serviceSlug: 'kala-jadu-ka-tor',
        actionRoute: '/services/kala-jadu-ka-tor',
        actionLabel: 'Protection Guidance',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like calm Quran & Sunnah spiritual protection guidance.',
      },
      {
        id: 'rohani-nazar-ruqyah',
        headline: 'Nazar-e-Bad & Ruqyah Guidance',
        description:
          'Surah Al-Fatihah, Ayat al-Kursi aur Al-Mu\'awwidhat ke zariye khud aur apne ghar ke liye masnoon Ruqyah samjhein.',
        image: ASSETS.rohani,
        imageAlt: 'Holy Quran on carved wooden stand with ivory tasbeeh beads',
        serviceSlug: 'rohani-ilaj',
        actionRoute: '/services/rohani-ilaj',
        actionLabel: 'Learn Ruqyah',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like Nazar-e-Bad & Ruqyah Shar\'iyyah guidance.',
      },
      {
        id: 'rohani-business-obstacles',
        headline: 'کاروبار میں رکاوٹیں ہیں؟ اپنی صورتحال پر مشورہ لیں',
        description:
          'Karobari pareshaniyon mein sabr, tawakkul, halal barkat ki masnoon duaein aur amli mashwara hasil karein.',
        image: NEW_ASSETS.careerBusiness,
        imageAlt: 'Calm sunlit workspace representing thoughtful business reflection',
        serviceSlug: 'spiritual-consultation',
        actionRoute: '/services/spiritual-consultation',
        actionLabel: 'Get Guidance',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I am facing work/business challenges and would like spiritual guidance.',
      },
      {
        id: 'rohani-home-peace',
        headline: 'گھر میں پریشانیاں ہیں؟ روحانی رہنمائی حاصل کریں',
        description:
          'Gharelu kashidagi aur be-chaini mein ghar mein sukoon, rehmat aur baahmi ehtiraam ke liye rohani aur khandani mashwara.',
        image: ASSETS.familyGuidance,
        imageAlt: 'Warm sunlit Pakistani home courtyard evoking domestic peace',
        serviceSlug: 'family-guidance',
        actionRoute: '/services/family-guidance',
        actionLabel: 'Family Peace',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like spiritual and family peace guidance for our home.',
      },
      {
        id: 'rohani-duas-wazifa',
        headline: 'Quranic Duas & Wazifa Guidance',
        description:
          'Sahih Bukhari, Sahih Muslim aur Hisn al-Muslim se mustanad subah-o-shaam ke azkar aur duaein maani ke saath.',
        image: NEW_ASSETS.rizqBlessingDua,
        imageAlt: 'Emerald leather book on carved walnut rehal beside pearl tasbeeh beads',
        serviceSlug: 'dua-and-wazifa',
        actionRoute: '/services/dua-and-wazifa',
        actionLabel: 'Explore Duas',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like authentic Quranic Duas & Wazifa guidance.',
      },
      {
        id: 'rohani-specialists',
        headline: 'Experienced Rohani Ilaj Specialists',
        description:
          'Urdu, English aur Arabic mein ba-waqar aur raazdarana rohani rehnumai faraham karne wale specialists se rabta karein.',
        image: NEW_ASSETS.heroSpiritual,
        imageAlt: 'Tranquil sunlit Islamic marble arches and serene courtyard',
        serviceSlug: 'rohani-ilaj',
        actionRoute: '/experts?service=rohani-ilaj',
        actionLabel: 'View Specialists',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, please connect me with an experienced Rohani Ilaj specialist.',
      },
    ],
  },
  {
    id: 'marriage-istikhara',
    number: '03',
    domainTag: 'Sunnah Istikhara & Family Dignity · UK, Europe, North America, Gulf & Pakistan',
    title: 'Marriage & Istikhara – شادی اور مسنون استخارہ',
    subtitle:
      'Respectful Salat al-Istikhara education and confidential marriage guidance for individuals and Pakistani families navigating proposals and relationships.',
    accentStyle: 'white',
    cards: [
      {
        id: 'mi-pasand-istikhara',
        headline: 'پسند کی شادی کے لیے استخارہ کروائیں',
        description:
          'Pasand ke rishte mein Allah se khair talab karne ke liye masnoon Salat al-Istikhara aur walidain se ba-waqar guftagu ki rehnumai.',
        image: ASSETS.istikhara,
        imageAlt: 'Carved wooden rehal and sunlit Islamic study setting for Istikhara',
        serviceSlug: 'marriage-istikhara',
        actionRoute: '/services/marriage-istikhara',
        actionLabel: 'Istikhara Guide',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like guidance on Marriage Istikhara (Pasand ki Shadi).',
      },
      {
        id: 'mi-marriage-online',
        headline: 'Marriage Istikhara Online',
        description:
          'UK, Europe, USA, Canada, Australia, UAE aur Pakistan se rishton ke faislon ke liye private Sunnah Istikhara consultation.',
        image: ASSETS.marriageIstikhara,
        imageAlt: 'Warm golden brass lantern casting serene light for Marriage Istikhara',
        serviceSlug: 'marriage-istikhara',
        actionRoute: '/services/marriage-istikhara',
        actionLabel: 'Book Istikhara',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like an Online Marriage Istikhara consultation.',
      },
      {
        id: 'mi-rishta-guidance',
        headline: 'رشتے میں رکاوٹ ہے؟ رہنمائی حاصل کریں',
        description:
          'Rishton mein takheer ya uljhan ki soorat mein sabr, masnoon duaein aur mutawazin khandani mashwara hasil karein.',
        image: ASSETS.marriageGuidance,
        imageAlt: 'Elegant traditional Pakistani floral and ivory heritage arrangement',
        serviceSlug: 'marriage-relationship-guidance',
        actionRoute: '/services/marriage-relationship-guidance',
        actionLabel: 'Get Guidance',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like respectful guidance regarding marriage proposals and delays.',
      },
      {
        id: 'mi-love-marriage-dua',
        headline: 'پسند کی شادی کے لیے دعا اور وظیفہ کی رہنمائی',
        description:
          'Jaaiz aur halal rishte mein aasani aur khair ke liye Quran-o-Sunnah se sabit duaein—baghair kisi ghair-sharai amal ke.',
        image: NEW_ASSETS.rizqBlessingDua,
        imageAlt: 'Serene sunlit prayer corner with Quran stand and tasbeeh',
        serviceSlug: 'dua-and-wazifa',
        actionRoute: '/services/dua-and-wazifa',
        actionLabel: 'Authentic Duas',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like authentic Quranic dua guidance for a halal marriage.',
      },
      {
        id: 'mi-husband-wife',
        headline: 'Husband & Wife Relationship Guidance',
        description:
          'Miyan biwi ke darmiyan ghalat-fehmiyon, doori ya domestic stress ko samajhdari aur rehmat se hal karne ki private counselling.',
        image: ASSETS.counsel,
        imageAlt: 'Warm sunlit consultation room for private couples dialogue',
        serviceSlug: 'marriage-relationship-guidance',
        actionRoute: '/services/marriage-relationship-guidance',
        actionLabel: 'Relationship Support',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like confidential Husband & Wife relationship guidance.',
      },
      {
        id: 'mi-compatibility-consult',
        headline: 'Marriage Compatibility Consultation',
        description:
          'Values, family expectations aur mutual understanding par mabni structured pre-marital consultation.',
        image: NEW_ASSETS.kundliCompatibility,
        imageAlt: 'Harmonious dual parchment charts with white jasmine flowers',
        serviceSlug: 'marriage-relationship-guidance',
        actionRoute: '/services/marriage-relationship-guidance',
        actionLabel: 'Consult Specialist',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like to book a Marriage Compatibility Consultation.',
      },
    ],
  },
  {
    id: 'business-personal',
    number: '04',
    domainTag: 'Wise Counsel, Istishara & Reflective Planning',
    title: 'Business & Personal Guidance – کاروبار اور زندگی کے فیصلے',
    subtitle:
      'Grounded spiritual reflection, authentic prayers for Barakah in lawful livelihood, and analytical life-planning consultations.',
    accentStyle: 'ivory',
    cards: [
      {
        id: 'bp-business-trouble',
        headline: 'کاروبار میں پریشانی ہے؟ مشورہ حاصل کریں',
        description:
          'Naye karobar, partnership ya maali uljhanon mein Istikhara, Istishara (mashwara) aur sukoon ke saath faisla karein.',
        image: NEW_ASSETS.careerBusiness,
        imageAlt: 'Sunlit executive study desk with notebook, brass pen, and compass',
        serviceSlug: 'online-istikhara',
        actionRoute: '/services/online-istikhara',
        actionLabel: 'Consult Now',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like guidance regarding a business or career decision.',
      },
      {
        id: 'bp-rizq-barkat',
        headline: 'رزق میں برکت کے لیے دعائیں اور اسلامی رہنمائی',
        description:
          'Halal rizq, istighfar aur barkat ke liye mustanad masnoon duaein aur rozana ka aasan rohani mamool.',
        image: NEW_ASSETS.rizqBlessingDua,
        imageAlt: 'Peaceful sunlit reading alcove with carved walnut stand and tasbeeh',
        serviceSlug: 'dua-and-wazifa',
        actionRoute: '/services/dua-and-wazifa',
        actionLabel: 'Rizq & Barakah Duas',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like Islamic guidance and authentic duas for Barakah in Rizq.',
      },
      {
        id: 'bp-life-decisions',
        headline: 'زندگی کے اہم فیصلوں میں رہنمائی',
        description:
          'Relocation, education, career transition ya khandani faislon mein clarity aur tawakkul ke saath aage barhein.',
        image: ASSETS.istikhara,
        imageAlt: 'Quiet sunlit consultation table for major life decisions',
        serviceSlug: 'online-istikhara',
        actionRoute: '/services/online-istikhara',
        actionLabel: 'Life Guidance',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I need guidance for an important life decision.',
      },
      {
        id: 'bp-career-astrology',
        headline: 'Career & Business Astrology',
        description:
          'Classical planetary transits aur chart timing ke zariye apne professional strengths aur cycles ka reflective jaiza lein.',
        image: NEW_ASSETS.heroHoroscope,
        imageAlt: 'Brass armillary sphere and astrolabe in sunlit library',
        serviceSlug: 'astrology',
        actionRoute: '/services/astrology',
        actionLabel: 'Astrology Session',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like to book a Career & Business Astrology session.',
      },
      {
        id: 'bp-family-relationship',
        headline: 'Family & Relationship Consultation',
        description:
          'Overseas aur Pakistani families ke darmiyan generational communication, walidain aur aulad ki hum-aahangi ke liye private support.',
        image: ASSETS.familyGuidance,
        imageAlt: 'Warm sunlit Pakistani home living space',
        serviceSlug: 'family-guidance',
        actionRoute: '/services/family-guidance',
        actionLabel: 'Family Consultation',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like to book a Family & Relationship Consultation.',
      },
    ],
  },
  {
    id: 'health-wellbeing',
    number: '05',
    domainTag: 'Spiritual Tranquility Alongside Professional Medical Care',
    title: 'Health & Wellbeing – روحانی سکون اور قلبی اطمینان',
    subtitle:
      'Gentle Quranic supplications for emotional calm, patience, and spiritual solace—offered strictly alongside licensed medical and mental health care.',
    accentStyle: 'sage',
    ethicalNotice:
      'Important Medical & Ethical Notice: Physical and mental health conditions are NEVER attributed to black magic, evil eye, or spiritual blockage on ASTROTALK PK. Our specialists do not diagnose or cure medical conditions—please always consult a qualified doctor or healthcare professional for medical concerns alongside spiritual peace.',
    cards: [
      {
        id: 'hw-spiritual-calm',
        headline: 'طبیعت پریشان رہتی ہے؟ روحانی سکون کی رہنمائی حاصل کریں',
        description:
          'Zehni thakawat aur pareshani mein dil ke itminan ke liye pur-sukoon guftagu aur zikr-e-Ilahi ki rehnumai (mustanad tibbi ilaj ke saath).',
        image: NEW_ASSETS.peacefulWellbeing,
        imageAlt: 'Serene sunlit sanctuary corner with linen curtains and fresh olive branches',
        serviceSlug: 'spiritual-consultation',
        actionRoute: '/services/spiritual-consultation',
        actionLabel: 'Peace & Reflection',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like gentle spiritual guidance for peace of heart.',
      },
      {
        id: 'hw-quranic-duas',
        headline: 'Quranic Duas for Peace & Wellbeing',
        description:
          'Bimari, gham aur be-chaini mein Nabi Kareem ﷺ ki sikhai hui shifa, aafiyat aur sukoon ki masnoon duaein.',
        image: ASSETS.rohani,
        imageAlt: 'Quran and tasbeeh bathed in soft morning sunlight',
        serviceSlug: 'dua-and-wazifa',
        actionRoute: '/services/dua-and-wazifa',
        actionLabel: 'Duas for Peace',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like authentic Quranic Duas for peace and wellbeing.',
      },
      {
        id: 'hw-deeni-rehnumai',
        headline: 'دینی رہنمائی اور روحانی مشورہ حاصل کریں',
        description:
          'Mushkil waqt mein sabr, shukr aur imani taqwiyat ke liye ba-waqar deeni aur rohani mushawarat.',
        image: ASSETS.spiritual,
        imageAlt: 'Quiet sunlit architectural sanctuary evoking spiritual reflection',
        serviceSlug: 'rohani-ilaj',
        actionRoute: '/services/rohani-ilaj',
        actionLabel: 'Speak to Advisor',
        whatsappText:
          'Assalam-o-Alaikum ASTROTALK PK, I would like respectful Islamic spiritual counsel.',
      },
    ],
  },
];

export interface ExpertDiscoveryCategory {
  id: string;
  label: string;
  urduSub: string;
  serviceSlug: string;
  domain: 'astrology' | 'islamic-spiritual' | 'counseling';
}

export const EXPERT_DISCOVERY_CATEGORIES: ExpertDiscoveryCategory[] = [
  {
    id: 'international-astrologers',
    label: 'International Astrologers',
    urduSub: 'بین الاقوامی ماہرینِ علمِ نجوم',
    serviceSlug: 'astrology',
    domain: 'astrology',
  },
  {
    id: 'rohani-ilaj-specialists',
    label: 'Experienced Rohani Ilaj Specialists',
    urduSub: 'تجربہ کار روحانی علاج ماہرین',
    serviceSlug: 'rohani-ilaj',
    domain: 'islamic-spiritual',
  },
  {
    id: 'islamic-spiritual-experts',
    label: 'Islamic Spiritual Guidance Experts',
    urduSub: 'اسلامی روحانی رہنمائی ماہرین',
    serviceSlug: 'spiritual-consultation',
    domain: 'islamic-spiritual',
  },
  {
    id: 'ruqyah-protection',
    label: 'Ruqyah & Spiritual Protection Specialists',
    urduSub: 'رقیہ شرعیہ اور شرعی تحفظ',
    serviceSlug: 'kala-jadu-ka-tor',
    domain: 'islamic-spiritual',
  },
  {
    id: 'online-istikhara-experts',
    label: 'Online Istikhara Experts',
    urduSub: 'آن لائن مسنون استخارہ ماہرین',
    serviceSlug: 'online-istikhara',
    domain: 'islamic-spiritual',
  },
  {
    id: 'marriage-relationship-consultants',
    label: 'Marriage & Relationship Consultants',
    urduSub: 'ازدواجی اور خاندانی مشیر',
    serviceSlug: 'marriage-relationship-guidance',
    domain: 'counseling',
  },
  {
    id: 'numerology-experts',
    label: 'Numerology Experts',
    urduSub: 'علمِ اعداد اور ابجد ماہرین',
    serviceSlug: 'numerology',
    domain: 'astrology',
  },
  {
    id: 'amil-rohani-rehnuma',
    label: 'Amil / Rohani Rehnuma',
    urduSub: 'مسنون دعائیں اور روحانی رہنما',
    serviceSlug: 'dua-and-wazifa',
    domain: 'islamic-spiritual',
  },
];
