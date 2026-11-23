import type { Language } from '../types';

export interface UIStrings {
  nav: {
    home: string;
    astrology: string;
    spiritualServices: string;
    istikhara: string;
    ourExperts: string;
    freeTools: string;
    knowledgeCenter: string;
    aboutUs: string;
    contactUs: string;
    findExpert: string;
    bookConsultation: string;
    adminPortal: string;
    allServices: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustItems: string[];
  };
  finder: {
    title: string;
    subtitle: string;
    serviceLabel: string;
    servicePlaceholder: string;
    languageLabel: string;
    typeLabel: string;
    searchButton: string;
    types: {
      whatsapp: string;
      phone: string;
      appointment: string;
    };
  };
  sections: {
    servicesTitle: string;
    servicesSubtitle: string;
    exploreService: string;
    viewAllServices: string;
    expertsTitle: string;
    expertsSubtitle: string;
    sampleNotice: string;
    viewAllExperts: string;
    viewProfile: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    steps: { num: string; title: string; desc: string }[];
    whyChooseTitle: string;
    whyChooseSubtitle: string;
    whyPoints: { title: string; desc: string }[];
    toolsTitle: string;
    toolsSubtitle: string;
    openTool: string;
    viewAllTools: string;
    zodiacTitle: string;
    zodiacSubtitle: string;
    exploreSign: string;
    cosmicTitle: string;
    cosmicSubtitle: string;
    cosmicMethodology: string;
    sunPosition: string;
    moonPosition: string;
    moonPhase: string;
    illumination: string;
    calculatedAt: string;
    openDetailedSky: string;
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    testimonialsPolicyTitle: string;
    testimonialsPolicyBody: string;
    testimonialsPolicyAction: string;
    knowledgeTitle: string;
    knowledgeSubtitle: string;
    readArticle: string;
    viewKnowledge: string;
    internationalTitle: string;
    internationalSubtitle: string;
    internationalNote: string;
    finalCtaHeadline: string;
    finalCtaSubtext: string;
    findAnExpert: string;
    contactUs: string;
  };
  expertActions: {
    whatsapp: string;
    call: string;
    bookAppointment: string;
    languages: string;
    experience: string;
    consultationFee: string;
    availability: string;
    sampleProfileTag: string;
    verifiedCriteria: string;
    experiencedSpecialist: string;
    featuredSample: string;
    filterAllServices: string;
    filterAllLanguages: string;
    filterAnyExperience: string;
    filterAllMethods: string;
    searchPlaceholder: string;
    noResults: string;
    clearFilters: string;
  };
  booking: {
    modalTitle: string;
    modalSubtitle: string;
    fullName: string;
    countryCode: string;
    phoneNumber: string;
    emailOptional: string;
    service: string;
    specialist: string;
    anySpecialist: string;
    language: string;
    method: string;
    timeZone: string;
    preferredDate: string;
    preferredTime: string;
    currencyPreference: string;
    currencyNote: string;
    notesLabel: string;
    notesPlaceholder: string;
    consentText: string;
    submitButton: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    referenceLabel: string;
    utcStoredLabel: string;
    closeButton: string;
    feeDisclosure: string;
  };
  footer: {
    description: string;
    ethicalNote: string;
    servicesHeading: string;
    platformHeading: string;
    toolsHeading: string;
    internationalHeading: string;
    supportHeading: string;
    privacyPolicy: string;
    terms: string;
    disclaimer: string;
    copyright: string;
    centralSupport: string;
  };
  common: {
    backToHome: string;
    english: string;
    urdu: string;
    arabic: string;
    minRead: string;
    faqHeading: string;
    relatedServices: string;
    availableSpecialists: string;
    responsibleGuidanceTitle: string;
  };
}

export const TRANSLATIONS: Record<Language, UIStrings> = {
  en: {
    nav: {
      home: 'Home',
      astrology: 'Astrology',
      spiritualServices: 'Spiritual Services',
      istikhara: 'Istikhara',
      ourExperts: 'Our Experts',
      freeTools: 'Free Tools',
      knowledgeCenter: 'Knowledge Center',
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      findExpert: 'Find an Expert',
      bookConsultation: 'Book Consultation',
      adminPortal: 'Admin Architecture',
      allServices: 'All Services',
    },
    hero: {
      eyebrow: 'International Consultation Platform · Based in Pakistan',
      headline: 'Find Clarity. Connect with the Right Expert.',
      subtitle:
        'Explore astrology, spiritual guidance and personal consultations with experienced specialists. Connect from anywhere in the world in your preferred language.',
      primaryCta: 'Explore Our Experts',
      secondaryCta: 'Explore Services',
      trustItems: [
        'Experienced Specialists',
        'Private Consultations',
        'English, Urdu & Arabic',
        'International Accessibility',
      ],
    },
    finder: {
      title: 'Quick Consultation Finder',
      subtitle: 'Match your requirement, preferred language, and consultation channel in seconds.',
      serviceLabel: 'Select a Service',
      servicePlaceholder: 'All Consultation Categories',
      languageLabel: 'Preferred Language',
      typeLabel: 'Consultation Type',
      searchButton: 'Find an Expert',
      types: {
        whatsapp: 'WhatsApp Consultation',
        phone: 'Direct Phone Call',
        appointment: 'Appointment Request',
      },
    },
    sections: {
      servicesTitle: 'Consultation Disciplines & Services',
      servicesSubtitle:
        'Distinct specialists for astronomical astrology and Quran & Sunnah-informed spiritual guidance—clearly separated, respectfully delivered.',
      exploreService: 'Explore Service',
      viewAllServices: 'Explore All 10 Services',
      expertsTitle: 'Featured Specialists',
      expertsSubtitle:
        'Transparent specialist profiles designed for overseas families and international clients.',
      sampleNotice:
        'Editorial Preview Notice: Specialist profiles displayed below are clearly marked sample templates demonstrating marketplace structure until live expert verification is completed.',
      viewAllExperts: 'View All Experts',
      viewProfile: 'View Profile',
      howItWorksTitle: 'How Consultations Work',
      howItWorksSubtitle: 'A measured, private three-step process tailored for clients across global time zones.',
      steps: [
        {
          num: '01',
          title: 'Choose Your Service',
          desc: 'Select between classical astrology, Sunnah-based Istikhara education, Rohani guidance, or private family counselling.',
        },
        {
          num: '02',
          title: 'Find Your Expert',
          desc: 'Review transparent specialist profiles, consultation languages, clear base fees, and scheduled availability windows.',
        },
        {
          num: '03',
          title: 'Connect Privately',
          desc: 'Reach your specialist via WhatsApp, direct international call, or a time-zone-aware appointment request.',
        },
      ],
      whyChooseTitle: 'Why Choose ASTROTALK PK',
      whyChooseSubtitle: 'Built specifically for the privacy, clarity, and cultural expectations of overseas Pakistanis.',
      whyPoints: [
        {
          title: 'Multiple Specialist Categories',
          desc: 'Dedicated practitioners across classical astrology, Islamic spiritual education, and family guidance rather than one-size-fits-all advice.',
        },
        {
          title: 'Transparent Expert Profiles',
          desc: 'Every profile presents clear areas of focus, languages spoken, consultation methods, and structured verification criteria.',
        },
        {
          title: 'International Accessibility',
          desc: 'Designed for clients in the UK, Europe, USA, Canada, Australia, UAE, Saudi Arabia, and Pakistan with time-zone-aware scheduling.',
        },
        {
          title: 'English, Urdu & Arabic',
          desc: 'Communicate naturally in the language closest to your heart with proper Nastaliq Urdu, Arabic, and international English support.',
        },
        {
          title: 'Direct WhatsApp & Phone Access',
          desc: 'Connect directly with assigned specialists through prefilled WhatsApp introductions or international phone calls.',
        },
        {
          title: 'Clear Fees Before Confirmation',
          desc: 'Consultation fees and base currency are disclosed upfront prior to confirming any private appointment.',
        },
        {
          title: 'Privacy-Conscious Experience',
          desc: 'Birth details, personal enquiries, and family matters are treated confidentially and never displayed publicly.',
        },
        {
          title: 'Responsible Distinction',
          desc: 'We strictly distinguish astronomical astrology from Islamic religious guidance and never promise guaranteed outcomes.',
        },
      ],
      toolsTitle: 'Free Astronomy, Abjad & Calendar Tools',
      toolsSubtitle:
        'Genuine astronomical calculations powered by an ephemeris engine alongside transparent Eastern Abjad, numerology, and Umm al-Qura Hijri tools.',
      openTool: 'Open Calculator',
      viewAllTools: 'Explore All 10 Tools',
      zodiacTitle: 'Interactive Zodiac Architecture',
      zodiacSubtitle:
        'Select any of the twelve ecliptic signs on the celestial wheel to inspect its dates, element, ruling planet, and dedicated guide.',
      exploreSign: 'Read Full Sign Guide',
      cosmicTitle: "Today's Calculated Sky & Lunar Insights",
      cosmicSubtitle:
        'Real-time geocentric ecliptic coordinates and lunar phase geometry computed directly in your browser using astronomical ephemeris formulas.',
      cosmicMethodology:
        'Astronomical Note: Planetary longitudes and moon illumination below are real mathematical calculations (VSOP87/ELP2000). Astrological interpretations remain traditional cultural reflections rather than empirical science.',
      sunPosition: 'Sun Ecliptic Position',
      moonPosition: 'Moon Ecliptic Position',
      moonPhase: 'Current Lunar Phase',
      illumination: 'Illumination',
      calculatedAt: 'Calculated (UTC)',
      openDetailedSky: 'Open Detailed Birth Chart & Sky Tools',
      testimonialsTitle: 'Client Trust & Verified Reviews Policy',
      testimonialsSubtitle: 'Authenticity over fabricated praise.',
      testimonialsPolicyTitle: 'Only Genuine, Consented Client Reviews Are Published',
      testimonialsPolicyBody:
        'ASTROTALK PK does not publish invented client testimonials, anonymous star ratings, or fabricated success stories. Verified reviews appear on specialist dossiers only after a confirmed consultation and explicit written consent from the client, protecting full anonymity where requested.',
      testimonialsPolicyAction: 'Review Our Ethical Standards',
      knowledgeTitle: 'Knowledge Center & Guidance Library',
      knowledgeSubtitle:
        'Thoughtful, well-sourced reading across classical astronomy, Sunnah Istikhara principles, authentic supplications, and family harmony.',
      readArticle: 'Read Article',
      viewKnowledge: 'Visit Knowledge Center',
      internationalTitle: 'Serving Overseas Pakistanis Worldwide',
      internationalSubtitle:
        'From London, Birmingham, and Manchester to Dubai, Riyadh, Toronto, New York, Sydney, and Lahore—schedule private sessions in your own local time zone.',
      internationalNote:
        'Each specialist maintains clearly listed consultation hours in Pakistan Standard Time (PKT, UTC+5), automatically translated into your local time zone during appointment booking. Specialists are not claimed to be online 24/7.',
      finalCtaHeadline: 'Your Journey to Greater Clarity Starts Here.',
      finalCtaSubtext:
        'Explore transparent specialist profiles or reach our central coordination desk for help choosing the right consultation category.',
      findAnExpert: 'Find an Expert',
      contactUs: 'Contact Us',
    },
    expertActions: {
      whatsapp: 'WhatsApp',
      call: 'Direct Call',
      bookAppointment: 'Request Appointment',
      languages: 'Languages',
      experience: 'Experience',
      consultationFee: 'Base Consultation Fee',
      availability: 'Availability Window',
      sampleProfileTag: 'Sample Profile · Editorial Preview',
      verifiedCriteria: 'Verification Criteria Template',
      experiencedSpecialist: 'Senior Practice Category',
      featuredSample: 'Featured Sample Dossier',
      filterAllServices: 'All Services',
      filterAllLanguages: 'All Languages',
      filterAnyExperience: 'Any Experience',
      filterAllMethods: 'All Consultation Methods',
      searchPlaceholder: 'Search by specialist name, service, or focus...',
      noResults: 'No specialist profiles match your current filter criteria.',
      clearFilters: 'Reset Filters',
    },
    booking: {
      modalTitle: 'Request a Private Consultation',
      modalSubtitle: 'All appointment times are normalized to UTC on our server and confirmed against your local time zone.',
      fullName: 'Full Name',
      countryCode: 'Country Code',
      phoneNumber: 'Phone / WhatsApp Number',
      emailOptional: 'Email Address (Optional)',
      service: 'Service Category',
      specialist: 'Preferred Specialist',
      anySpecialist: 'Assign Suitable Available Specialist',
      language: 'Consultation Language',
      method: 'Preferred Channel',
      timeZone: 'Your Local Time Zone',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Local Time',
      currencyPreference: 'Display Currency Reference',
      currencyNote: 'Base consultation fees are configured in PKR. Multi-currency billing conversion requires a live exchange-rate integration and will be confirmed transparently before payment.',
      notesLabel: 'Brief Context (Confidential)',
      notesPlaceholder: 'Share any helpful context or questions. Avoid entering sensitive financial credentials.',
      consentText: 'I understand that consultations offer personal and spiritual reflection without guaranteed outcomes, and I consent to confidential handling of my enquiry.',
      submitButton: 'Confirm Consultation Request',
      submitting: 'Recording Request...',
      successTitle: 'Consultation Request Received',
      successBody: 'Your request has been validated and normalized to UTC. Our coordination desk or assigned specialist will confirm availability and fee details before any session begins.',
      referenceLabel: 'Booking Reference',
      utcStoredLabel: 'Stored Server Time (UTC)',
      closeButton: 'Return to Website',
      feeDisclosure: 'Configured Base Fee (Disclosed Prior to Confirmation)',
    },
    footer: {
      description:
        'An international online consultation platform rooted in Pakistan, offering structured access to classical astrology tools and respectful Islamic spiritual guidance in English, Urdu, and Arabic.',
      ethicalNote:
        'ASTROTALK PK clearly distinguishes classical astrology from Islamic religious guidance. Consultations provide personal reflection and educational support and do not replace medical, legal, or licensed mental health care.',
      servicesHeading: 'Services',
      platformHeading: 'Platform',
      toolsHeading: 'Free Tools',
      internationalHeading: 'International Regions',
      supportHeading: 'Central Coordination',
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      disclaimer: 'Ethical Disclaimer',
      copyright: '© 2026 ASTROTALK PK. All rights reserved.',
      centralSupport: 'Central WhatsApp Support Desk',
    },
    common: {
      backToHome: 'Back to Home',
      english: 'English',
      urdu: 'اردو',
      arabic: 'العربية',
      minRead: 'min read',
      faqHeading: 'Frequently Asked Questions',
      relatedServices: 'Related Consultation Categories',
      availableSpecialists: 'Specialists in This Discipline',
      responsibleGuidanceTitle: 'Responsible Consultation Standard',
    },
  },

  ur: {
    nav: {
      home: 'ہوم',
      astrology: 'علمِ نجوم',
      spiritualServices: 'روحانی خدمات',
      istikhara: 'استخارہ',
      ourExperts: 'ہمارے ماہرین',
      freeTools: 'مفت ٹولز',
      knowledgeCenter: 'علمی مرکز',
      aboutUs: 'ہمارے بارے میں',
      contactUs: 'رابطہ کریں',
      findExpert: 'ماہر تلاش کریں',
      bookConsultation: 'مشاورت بُک کریں',
      adminPortal: 'ایڈمن ڈیش بورڈ',
      allServices: 'تمام خدمات',
    },
    hero: {
      eyebrow: 'بین الاقوامی مشاورتی پلیٹ فارم · پاکستان سے دنیا بھر میں',
      headline: 'ذہنی سکون اور رہنمائی حاصل کریں۔ درست ماہر سے جڑیں۔',
      subtitle:
        'تجربہ کار ماہرین کے ساتھ علمِ نجوم، روحانی رہنمائی اور ذاتی مشاورت حاصل کریں۔ دنیا کے کسی بھی حصے سے اپنی پسندیدہ زبان میں بااعتماد رابطہ کریں۔',
      primaryCta: 'ہمارے ماہرین دیکھیں',
      secondaryCta: 'خدمات دریافت کریں',
      trustItems: [
        'تجربہ کار ماہرین',
        'مکمل رازداری کے ساتھ مشاورت',
        'انگریزی، اردو اور عربی',
        'بین الاقوامی رسائی',
      ],
    },
    finder: {
      title: 'فوری مشاورت تلاش کریں',
      subtitle: 'اپنی ضرورت، پسندیدہ زبان اور رابطے کا طریقہ منتخب کریں۔',
      serviceLabel: 'خدمت منتخب کریں',
      servicePlaceholder: 'تمام مشاورتی شعبے',
      languageLabel: 'پسندیدہ زبان',
      typeLabel: 'مشاورت کا طریقہ',
      searchButton: 'ماہر تلاش کریں',
      types: {
        whatsapp: 'واٹس ایپ مشاورت',
        phone: 'براہِ راست فون کال',
        appointment: 'وقت مقرر کریں',
      },
    },
    sections: {
      servicesTitle: 'مشاورتی شعبے اور خدمات',
      servicesSubtitle:
        'علمِ نجوم اور قرآن و سنت پر مبنی روحانی رہنمائی کے لیے الگ الگ ماہرین—شفاف، باوقار اور ذمہ دارانہ انداز میں۔',
      exploreService: 'تفصیل دیکھیں',
      viewAllServices: 'تمام ۱۰ خدمات دیکھیں',
      expertsTitle: 'نمایاں ماہرین',
      expertsSubtitle: 'بیرونِ ملک مقیم پاکستانی خاندانوں اور عالمی صارفین کے لیے شفاف پروفائلز۔',
      sampleNotice:
        'ادارتی وضاحت: ذیل میں دکھائے گئے ماہرین کے پروفائلز پلیٹ فارم کے نمونے (Sample Templates) ہیں، جب تک حقیقی ماہرین کی تصدیق مکمل نہیں ہو جاتی۔',
      viewAllExperts: 'تمام ماہرین دیکھیں',
      viewProfile: 'پروفائل دیکھیں',
      howItWorksTitle: 'مشاورت کا طریقہ کار',
      howItWorksSubtitle: 'دنیا بھر کے مختلف ٹائم زونز کے مطابق تین سادہ اور محفوظ مراحل۔',
      steps: [
        {
          num: '01',
          title: 'اپنی خدمت منتخب کریں',
          desc: 'علمِ نجوم، مسنون استخارہ رہنمائی، روحانی مشاورت یا خاندانی مسائل میں سے مناسب شعبہ چنیں۔',
        },
        {
          num: '02',
          title: 'اپنا ماہر منتخب کریں',
          desc: 'ماہر کی تفصیلات، زبانیں، واضح فیس اور دستیابی کے اوقات کا اطمینان سے جائزہ لیں۔',
        },
        {
          num: '03',
          title: 'رازداری سے رابطہ کریں',
          desc: 'واٹس ایپ، براہِ راست فون کال یا اپنے مقامی ٹائم زون کے مطابق اپائنٹمنٹ کی درخواست دیں۔',
        },
      ],
      whyChooseTitle: 'ایسٹروٹاک پی کے کیوں منتخب کریں',
      whyChooseSubtitle: 'اوورسیز پاکستانیوں کے اعتماد، رازداری اور ثقافتی اقدار کے عین مطابق۔',
      whyPoints: [
        {
          title: 'مختلف شعبوں کے الگ ماہرین',
          desc: 'علمِ نجوم، اسلامی روحانی رہنمائی اور خاندانی مشاورت کے لیے متعلقہ ماہرین کی دستیابی۔',
        },
        {
          title: 'شفاف اور واضح پروفائلز',
          desc: 'ہر پروفائل میں شعبہ، زبانیں، مشاورت کا طریقہ اور تصدیقی معیار واضح طور پر درج ہیں۔',
        },
        {
          title: 'بین الاقوامی سہولت',
          desc: 'برطانیہ، یورپ، امریکہ، کینیڈا، آسٹریلیا، امارات، سعودی عرب اور پاکستان سے آسان رابطہ۔',
        },
        {
          title: 'انگریزی، اردو اور عربی',
          desc: 'اپنی مادری یا پسندیدہ زبان میں سہولت کے ساتھ گفتگو اور رہنمائی۔',
        },
        {
          title: 'واٹس ایپ اور فون کی سہولت',
          desc: 'متعلقہ ماہر سے پہلے سے تیار شدہ تعارفی پیغام کے ساتھ براہِ راست رابطہ۔',
        },
        {
          title: 'تصدیق سے قبل واضح فیس',
          desc: 'کسی بھی مشاورت کی تصدیق سے پہلے بنیادی فیس اور کرنسی مکمل شفافیت سے بتائی جاتی ہے۔',
        },
        {
          title: 'مکمل رازداری',
          desc: 'تاریخِ پیدائش اور ذاتی معلومات کو مکمل طور پر خفیہ رکھا جاتا ہے اور کبھی شائع نہیں کیا جاتا۔',
        },
        {
          title: 'ذمہ دارانہ دائرہ کار',
          desc: 'ہم علمِ نجوم کو اسلامی شرعی تعلیمات سے واضح طور پر الگ رکھتے ہیں اور غیر حقیقی دعوے نہیں کرتے۔',
        },
      ],
      toolsTitle: 'مفت فلکیاتی، ابجد اور ہجری ٹولز',
      toolsSubtitle: 'حقیقی فلکیاتی حساب کتاب (Ephemeris Engine)، علمِ ابجد، اعداد اور ام القریٰ ہجری کیلنڈر۔',
      openTool: 'کیلکولیٹر کھولیں',
      viewAllTools: 'تمام ۱۰ مفت ٹولز دیکھیں',
      zodiacTitle: 'انٹرایکٹو بارہ بروج',
      zodiacSubtitle: 'فلکیاتی دائرے میں کسی بھی برج کا انتخاب کریں اور اس کی تاریخیں، عنصر اور تفصیلات دیکھیں۔',
      exploreSign: 'برج کی مکمل تفصیل',
      cosmicTitle: 'آج کے فلکیاتی مشاہدات اور چاند کی حالت',
      cosmicSubtitle: 'براہِ راست فلکیاتی حساب کے ذریعے سورج، چاند اور سیاروں کے موجودہ درجات۔',
      cosmicMethodology:
        'فلکیاتی وضاحت: سیاروں کے درجات اور چاند کی روشنی حقیقی سائنسی فارمولوں سے شمار کی گئی ہے۔ نجومی تشریحات روایتی مطالعے پر مبنی ہیں۔',
      sunPosition: 'سورج کا موجودہ برج',
      moonPosition: 'چاند کا موجودہ برج',
      moonPhase: 'چاند کی موجودہ منزل',
      illumination: 'روشنی کا تناسب',
      calculatedAt: 'حساب کا وقت (UTC)',
      openDetailedSky: 'مکمل زائچہ اور فلکیاتی ٹولز دیکھیں',
      testimonialsTitle: 'صارفین کا اعتماد اور حقیقی آراء کی پالیسی',
      testimonialsSubtitle: 'مصنوعی تعریفوں کے بجائے مکمل سچائی اور شفافیت۔',
      testimonialsPolicyTitle: 'صرف حقیقی اور بااجازت صارفین کی آراء شائع کی جاتی ہیں',
      testimonialsPolicyBody:
        'ایسٹروٹاک پی کے کبھی فرضی تعریفیں یا جعلی ریٹنگز شائع نہیں کرتا۔ ماہرین کے صفحات پر صرف انہی صارفین کے تاثرات شامل کیے جاتے ہیں جو حقیقی مشاورت کے بعد اپنی رضامندی سے رائے فراہم کریں۔',
      testimonialsPolicyAction: 'ہمارا اخلاقی منشور پڑھیں',
      knowledgeTitle: 'علمی مرکز اور رہنما مضامین',
      knowledgeSubtitle: 'علمِ نجوم کی تاریخ، مسنون استخارہ، مستند دعائیں اور خاندانی ہم آہنگی پر مستند تحریریں۔',
      readArticle: 'مضمون پڑھیں',
      viewKnowledge: 'علمی مرکز دیکھیں',
      internationalTitle: 'دنیا بھر میں مقیم پاکستانیوں کے لیے',
      internationalSubtitle:
        'لندن، برمنگھم، دبئی، ریاض، ٹورنٹو، نیویارک، سڈنی اور لاہور—اپنے مقامی وقت کے مطابق آسانی سے مشاورت حاصل کریں۔',
      internationalNote:
        'ہر ماہر کے دستیابی کے اوقات پاکستان اسٹینڈرڈ ٹائم (PKT) میں واضح ہیں، جو اپائنٹمنٹ فارم میں خودکار طور پر آپ کے مقامی وقت میں تبدیل ہو جاتے ہیں۔',
      finalCtaHeadline: 'بہتر فہم اور سکون کی جانب آپ کا سفر یہاں سے شروع ہوتا ہے۔',
      finalCtaSubtext: 'ماہرین کے شفاف پروفائلز دیکھیں یا درست شعبے کے انتخاب کے لیے ہماری ٹیم سے رابطہ کریں۔',
      findAnExpert: 'ماہر تلاش کریں',
      contactUs: 'رابطہ کریں',
    },
    expertActions: {
      whatsapp: 'واٹس ایپ',
      call: 'فون کال',
      bookAppointment: 'اپائنٹمنٹ کی درخواست',
      languages: 'زبانیں',
      experience: 'تجربہ',
      consultationFee: 'بنیادی مشاورت فیس',
      availability: 'دستیابی کے اوقات',
      sampleProfileTag: 'نمونہ پروفائل · پیش منظر',
      verifiedCriteria: 'تصدیقی معیار کا نمونہ',
      experiencedSpecialist: 'سینئر مشاورتی شعبہ',
      featuredSample: 'نمایاں نمونہ پروفائل',
      filterAllServices: 'تمام خدمات',
      filterAllLanguages: 'تمام زبانیں',
      filterAnyExperience: 'کوئی بھی تجربہ',
      filterAllMethods: 'رابطے کے تمام ذرائع',
      searchPlaceholder: 'ماہر کا نام یا خدمت تلاش کریں...',
      noResults: 'آپ کے منتخب کردہ فلٹرز کے مطابق کوئی ماہر نہیں ملا۔',
      clearFilters: 'فلٹرز صاف کریں',
    },
    booking: {
      modalTitle: 'نجی مشاورت کی درخواست',
      modalSubtitle: 'تمام اوقات سرور پر UTC معیار کے مطابق محفوظ ہوتے ہیں اور آپ کے مقامی وقت کے مطابق تصدیق کی جاتی ہے۔',
      fullName: 'مکمل نام',
      countryCode: 'ملکی کوڈ',
      phoneNumber: 'فون یا واٹس ایپ نمبر',
      emailOptional: 'ای میل ایڈریس (اختیاری)',
      service: 'خدمت کا شعبہ',
      specialist: 'پسندیدہ ماہر',
      anySpecialist: 'متعلقہ دستیاب ماہر تجویز کریں',
      language: 'مشاورت کی زبان',
      method: 'رابطے کا ذریعہ',
      timeZone: 'آپ کا مقامی ٹائم زون',
      preferredDate: 'پسندیدہ تاریخ',
      preferredTime: 'پسندیدہ مقامی وقت',
      currencyPreference: 'کرنسی کا حوالہ',
      currencyNote: 'بنیادی فیس پاکستانی روپے (PKR) میں مقرر ہے۔ دیگر کرنسیوں میں حتمی رقم کی تصدیق سیشن سے پہلے کی جائے گی۔',
      notesLabel: 'مختصر تفصیل (مکمل رازداری)',
      notesPlaceholder: 'اپنے سوال کا مختصر تعارف لکھیں۔ بینک یا خفیہ مالی معلومات درج نہ کریں۔',
      consentText: 'میں سمجھتا/سمجھتی ہوں کہ مشاورت ذاتی اور روحانی رہنمائی کے لیے ہے اور اس میں کسی یقینی نتیجے کی ضمانت نہیں دی جاتی۔',
      submitButton: 'درخواست جمع کروائیں',
      submitting: 'درخواست محفوظ ہو رہی ہے...',
      successTitle: 'آپ کی درخواست موصول ہو گئی ہے',
      successBody: 'آپ کی معلومات UTC معیار کے مطابق درج ہو چکی ہیں۔ تصدیق اور فیس کی مکمل تفصیل کے لیے جلد رابطہ کیا جائے گا۔',
      referenceLabel: 'حوالہ نمبر',
      utcStoredLabel: 'محفوظ شدہ وقت (UTC)',
      closeButton: 'ویب سائٹ پر واپس جائیں',
      feeDisclosure: 'مقررہ بنیادی فیس (تصدیق سے قبل واضح)',
    },
    footer: {
      description:
        'پاکستان میں قائم ایک بین الاقوامی آن لائن مشاورتی پلیٹ فارم جو انگریزی، اردو اور عربی میں فلکیاتی ٹولز اور باوقار روحانی رہنمائی فراہم کرتا ہے۔',
      ethicalNote:
        'ایسٹروٹاک پی کے علمِ نجوم کو اسلامی شرعی تعلیمات سے واضح طور پر الگ رکھتا ہے۔ ہماری خدمات طبی، قانونی یا نفسیاتی علاج کا متبادل نہیں ہیں۔',
      servicesHeading: 'خدمات',
      platformHeading: 'پلیٹ فارم',
      toolsHeading: 'مفت ٹولز',
      internationalHeading: 'بین الاقوامی خطے',
      supportHeading: 'مرکزی رابطہ',
      privacyPolicy: 'رازداری کی پالیسی',
      terms: 'شرائط و ضوابط',
      disclaimer: 'اخلاقی وضاحت',
      copyright: '© 2026 ASTROTALK PK۔ جملہ حقوق محفوظ ہیں۔',
      centralSupport: 'مرکزی واٹس ایپ معاونت',
    },
    common: {
      backToHome: 'ہوم پر واپس جائیں',
      english: 'English',
      urdu: 'اردو',
      arabic: 'العربية',
      minRead: 'منٹ مطالعہ',
      faqHeading: 'اکثر پوچھے جانے والے سوالات',
      relatedServices: 'متعلقہ خدمات',
      availableSpecialists: 'اس شعبے کے ماہرین',
      responsibleGuidanceTitle: 'ذمہ دارانہ مشاورتی معیار',
    },
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      astrology: 'علم الفلك والتنجيم',
      spiritualServices: 'الإرشاد الروحي',
      istikhara: 'الاستخارة',
      ourExperts: 'خبراؤنا',
      freeTools: 'أدوات مجانية',
      knowledgeCenter: 'مركز المعرفة',
      aboutUs: 'من نحن',
      contactUs: 'اتصل بنا',
      findExpert: 'ابحث عن خبير',
      bookConsultation: 'احجز استشارة',
      adminPortal: 'لوحة الإدارة',
      allServices: 'جميع الخدمات',
    },
    hero: {
      eyebrow: 'منصة استشارات دولية · مقرها باكستان وتخدم العالم',
      headline: 'اعثر على الوضوح. تواصل مع الخبير المناسب.',
      subtitle:
        'استكشف علم الفلك التراثي والإرشاد الروحي والاستشارات الشخصية مع مختصين ذوي خبرة. تواصل بخصوصية من أي مكان في العالم بلغتك المفضلة.',
      primaryCta: 'استكشف خبراءنا',
      secondaryCta: 'استعرض الخدمات',
      trustItems: [
        'مختصون ذوو خبرة',
        'استشارات خاصة وسرية',
        'الإنجليزية والأردية والعربية',
        'متاح دولياً في مختلف المناطق الزمنية',
      ],
    },
    finder: {
      title: 'البحث السريع عن استشارة',
      subtitle: 'اختر التخصص واللغة المفضلة وقناة التواصل المناسبة لك خلال ثوانٍ.',
      serviceLabel: 'اختر الخدمة',
      servicePlaceholder: 'جميع فئات الاستشارة',
      languageLabel: 'اللغة المفضلة',
      typeLabel: 'طريقة الاستشارة',
      searchButton: 'ابحث عن خبير',
      types: {
        whatsapp: 'استشارة عبر واتساب',
        phone: 'مكالمة هاتفية مباشرة',
        appointment: 'طلب موعد محدد',
      },
    },
    sections: {
      servicesTitle: 'التخصصات والخدمات الاستشارية',
      servicesSubtitle:
        'مختصون مستقلون للدراسات الفلكية التراثية والإرشاد الروحي المستند إلى القرآن والسنة—بفصل واضح وأسلوب راقٍ.',
      exploreService: 'استكشف الخدمة',
      viewAllServices: 'عرض جميع الخدمات العشر',
      expertsTitle: 'خبراء مميزون',
      expertsSubtitle: 'ملفات شفافة مصممة للجاليات الباكستانية والعملاء الدوليين.',
      sampleNotice:
        'ملاحظة تحريرية: الملفات المعروضة أدناه هي نماذج تعريفية توضيحية لهيكل المنصة إلى حين إتمام التحقق المباشر من الخبراء المعتمدين.',
      viewAllExperts: 'عرض جميع الخبراء',
      viewProfile: 'عرض الملف الشخصي',
      howItWorksTitle: 'كيف تتم الاستشارة',
      howItWorksSubtitle: 'ثلاث خطوات منظمة وخاصة تراعي فرق التوقيت الدولي.',
      steps: [
        {
          num: '01',
          title: 'اختر الخدمة المناسبة',
          desc: 'حدد ما بين علم الفلك التراثي، أو الإرشاد المسنون لصلاة الاستخارة، أو الإرشاد الروحي والأسري.',
        },
        {
          num: '02',
          title: 'اختر الخبير المناسب',
          desc: 'راجع التخصص واللغات والرسوم الأساسية المعلنة وأوقات التوفر بكل شفافية.',
        },
        {
          num: '03',
          title: 'تواصل بخصوصية تامة',
          desc: 'تواصل عبر واتساب أو مكالمة دولية مباشرة أو قدم طلب موعد متوافق مع منطقتك الزمنية.',
        },
      ],
      whyChooseTitle: 'لماذا تختار ASTROTALK PK',
      whyChooseSubtitle: 'منصة مصممة خصيصاً للخصوصية والموثوقية والاحترام الثقافي للعملاء حول العالم.',
      whyPoints: [
        {
          title: 'تخصصات متعددة ومنفصلة',
          desc: 'مختصون لكل مجال على حدة في الفلك التراثي والإرشاد الإسلامي والاستشارات الأسرية.',
        },
        {
          title: 'ملفات خبراء شفافة',
          desc: 'وضوح كامل في مجالات التخصص واللغات وطرق التواصل ومعايير التحقق.',
        },
        {
          title: 'وصول دولي سلس',
          desc: 'مناسبة للعملاء في المملكة المتحدة وأوروبا وأمريكا وكندا وأستراليا والإمارات والسعودية وباكستان.',
        },
        {
          title: 'ثلاث لغات أصيلة',
          desc: 'واجهة ومحتوى واستشارات باللغات الإنجليزية والأردية والعربية.',
        },
        {
          title: 'واتساب واتصال مباشر',
          desc: 'بدء التواصل مباشرة عبر رسالة تعريفية واضحة أو مكالمة هاتفية.',
        },
        {
          title: 'وضوح الرسوم قبل التأكيد',
          desc: 'يتم عرض الرسوم الأساسية والعملة بوضوح قبل تأكيد أي موعد.',
        },
        {
          title: 'حماية خصوصية العملاء',
          desc: 'بيانات الميلاد والتفاصيل الشخصية تُعامل بسرية كاملة ولا تُنشر أبداً.',
        },
        {
          title: 'ميثاق أخلاقي مسؤول',
          desc: 'نفصل بوضوح بين علم الفلك التراثي والأحكام الدينية الإسلامية ولا نعد بنتائج مضمونة.',
        },
      ],
      toolsTitle: 'أدوات الفلك وحساب الجُمَّل والتقويم الهجري',
      toolsSubtitle:
        'حسابات فلكية حقيقية عبر محرك إيفيميريس دقيق إلى جانب حساب الجُمَّل (الأبجد) وتقويم أم القرى الهجري.',
      openTool: 'افتح الأداة',
      viewAllTools: 'استكشف جميع الأدوات العشر',
      zodiacTitle: 'دائرة الأبراج التفاعلية',
      zodiacSubtitle: 'اختر أي برج من الأبراج الاثني عشر لاستعراض تواريخه وعنصره وكوكبه ودليله الكامل.',
      exploreSign: 'اقرأ دليل البرج',
      cosmicTitle: 'الحسابات الفلكية ومنازل القمر اليوم',
      cosmicSubtitle: 'إحداثيات فلكية حقيقية للشمس والقمر والكواكب تُحسب لحظياً بدقة رياضية.',
      cosmicMethodology:
        'ملاحظة فلكية: المواقع الكوكبية ونسبة إضاءة القمر أدناه هي حسابات فلكية دقيقة (VSOP87). أما التفسيرات التنجيمية فهي قراءات ثقافية وتراثية وليست علماً تجريبياً.',
      sunPosition: 'موقع الشمس الفلكي',
      moonPosition: 'موقع القمر الفلكي',
      moonPhase: 'طور القمر الحالي',
      illumination: 'نسبة الإضاءة',
      calculatedAt: 'وقت الحساب (UTC)',
      openDetailedSky: 'افتح أدوات الخريطة الفلكية والسماء',
      testimonialsTitle: 'ثقة العملاء وسياسة التقييمات الموثقة',
      testimonialsSubtitle: 'المصداقية قبل أي شيء آخر.',
      testimonialsPolicyTitle: 'ننشر فقط الآراء الحقيقية بموافقة صريحة من العملاء',
      testimonialsPolicyBody:
        'لا تنشر منصة ASTROTALK PK شهادات مختلقة أو تقييمات وهمية. تظهر المراجعات على ملفات الخبراء فقط بعد إتمام استشارة مؤكدة وبموافقة خطية صريحة من العميل مع حفظ خصوصيته.',
      testimonialsPolicyAction: 'اطلع على معاييرنا الأخلاقية',
      knowledgeTitle: 'مركز المعرفة والمقالات الإرشادية',
      knowledgeSubtitle: 'مقالات موثقة حول الفلك التراثي وآداب الاستخارة والأدعية المأثورة والإرشاد الأسري.',
      readArticle: 'اقرأ المقال',
      viewKnowledge: 'تصفح مركز المعرفة',
      internationalTitle: 'خدمة الجاليات والعملاء في جميع أنحاء العالم',
      internationalSubtitle:
        'من لندن وبرمنغهام ودبي والرياض إلى تورنتو ونيويورك وسيدني ولاهور—احجز استشارتك بتوقيتك المحلي.',
      internationalNote:
        'يحدد كل خبير ساعات توفره بتوقيت باكستان (PKT) وتُحوّل تلقائياً إلى منطقتك الزمنية عند الحجز، دون ادعاء توفر دائم على مدار الساعة لكل خبير.',
      finalCtaHeadline: 'رحلتك نحو مزيد من الوضوح والسكينة تبدأ من هنا.',
      finalCtaSubtext: 'تصفح ملفات الخبراء الشفافة أو تواصل مع مكتب التنسيق لاختيار التخصص الأنسب لك.',
      findAnExpert: 'ابحث عن خبير',
      contactUs: 'اتصل بنا',
    },
    expertActions: {
      whatsapp: 'واتساب',
      call: 'اتصال مباشر',
      bookAppointment: 'طلب موعد',
      languages: 'اللغات',
      experience: 'الخبرة',
      consultationFee: 'الرسوم الأساسية',
      availability: 'ساعات التوفر',
      sampleProfileTag: 'ملف نموذجي · معاينة تحريرية',
      verifiedCriteria: 'معيار التحقق المعتمد',
      experiencedSpecialist: 'فئة ممارسة متقدمة',
      featuredSample: 'ملف نموذجي مميز',
      filterAllServices: 'جميع الخدمات',
      filterAllLanguages: 'جميع اللغات',
      filterAnyExperience: 'أي سنوات خبرة',
      filterAllMethods: 'جميع قنوات التواصل',
      searchPlaceholder: 'ابحث باسم الخبير أو التخصص...',
      noResults: 'لا توجد ملفات تطابق خيارات التصفية الحالية.',
      clearFilters: 'إعادة ضبط الفلاتر',
    },
    booking: {
      modalTitle: 'طلب استشارة خاصة',
      modalSubtitle: 'يتم توحيد جميع المواعيد بتوقيت UTC على الخادم وتأكيدها وفق منطقتك الزمنية المحلية.',
      fullName: 'الاسم الكامل',
      countryCode: 'رمز الدولة',
      phoneNumber: 'رقم الهاتف أو واتساب',
      emailOptional: 'البريد الإلكتروني (اختياري)',
      service: 'فئة الخدمة',
      specialist: 'الخبير المفضل',
      anySpecialist: 'تعيين الخبير المناسب المتاح',
      language: 'لغة الاستشارة',
      method: 'قناة التواصل المفضلة',
      timeZone: 'منطقتك الزمنية المحلية',
      preferredDate: 'التاريخ المفضل',
      preferredTime: 'الوقت المحلي المفضل',
      currencyPreference: 'العملة المرجعية للعرض',
      currencyNote: 'تُحدد الرسوم الأساسية بالروبية الباكستانية (PKR)، ويتطلب التحويل المباشر للعملات ربط مزود أسعار صرف معتمد قبل تأكيد الدفع.',
      notesLabel: 'نبذة مختصرة (سرية تامة)',
      notesPlaceholder: 'شارك سياقاً موجزاً لسؤالك دون إدخال أي بيانات مالية حساسة.',
      consentText: 'أفهم أن الاستشارات تقدم توجيهاً شخصياً وروحياً دون ضمان نتائج قطعية، وأوافق على معالجة طلبي بسرية.',
      submitButton: 'تأكيد طلب الاستشارة',
      submitting: 'جارٍ تسجيل الطلب...',
      successTitle: 'تم استلام طلب الاستشارة بنجاح',
      successBody: 'تم التحقق من طلبك وتسجيله بتوقيت UTC. سيتواصل معك مكتب التنسيق لتأكيد الموعد والرسوم قبل الجلسة.',
      referenceLabel: 'رقم المرجع',
      utcStoredLabel: 'الوقت المسجل (UTC)',
      closeButton: 'العودة إلى الموقع',
      feeDisclosure: 'الرسوم الأساسية المعلنة قبل التأكيد',
    },
    footer: {
      description:
        'منصة استشارات دولية انطلقت من باكستان لتقديم أدوات فلكية دقيقة وإرشاد روحي إسلامي محترم باللغات الإنجليزية والأردية والعربية.',
      ethicalNote:
        'تفصل ASTROTALK PK بوضوح بين علم الفلك التراثي والتعاليم الدينية الإسلامية. لا تغني الاستشارات عن الرعاية الطبية أو القانونية أو النفسية المتخصصة.',
      servicesHeading: 'الخدمات',
      platformHeading: 'المنصة',
      toolsHeading: 'أدوات مجانية',
      internationalHeading: 'المناطق الدولية',
      supportHeading: 'التنسيق المركزي',
      privacyPolicy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      disclaimer: 'إخلاء المسؤولية الأخلاقي',
      copyright: '© 2026 ASTROTALK PK. جميع الحقوق محفوظة.',
      centralSupport: 'مكتب الدعم عبر واتساب',
    },
    common: {
      backToHome: 'العودة للرئيسية',
      english: 'English',
      urdu: 'اردو',
      arabic: 'العربية',
      minRead: 'دقائق قراءة',
      faqHeading: 'الأسئلة الشائعة',
      relatedServices: 'خدمات ذات صلة',
      availableSpecialists: 'المختصون في هذا التخصص',
      responsibleGuidanceTitle: 'معيار الإرشاد المسؤول',
    },
  },
};
