import type { ServiceCategory } from '../types';

export const ASSETS = {
  heroObservatory: '/src/assets/images/hero_celestial_observatory_1795430671373.jpg',
  astrology: '/src/assets/images/svc_astrology_chart_1795433420868.jpg',
  rohani: '/src/assets/images/svc_rohani_quran_tasbeeh_1795433422694.jpg',
  protection: '/src/assets/images/svc_protection_calligraphy_1795433422356.jpg',
  istikhara: '/src/assets/images/svc_istikhara_rehal_1795433421640.jpg',
  marriageIstikhara: '/src/assets/images/service_istikhara_lantern_1795430693975.jpg',
  spiritual: '/src/assets/images/service_spiritual_sanctuary_1795430670761.jpg',
  numerology: '/src/assets/images/svc_numerology_geometry_1795433430537.jpg',
  marriageGuidance: '/src/assets/images/svc_marriage_pakistani_1795433433374.jpg',
  familyGuidance: '/src/assets/images/svc_family_pakistani_home_1795433434437.jpg',
  counsel: '/src/assets/images/service_family_counsel_1795430671675.jpg',
  expertScholar: '/src/assets/images/expert_portrait_male_scholar_1795430670919.jpg',
  expertCounselor: '/src/assets/images/expert_portrait_female_counselor_1795430670620.jpg',
  expertAstrologer: '/src/assets/images/expert_portrait_astrologer_1795430672907.jpg',
};

export const SERVICES: ServiceCategory[] = [
  {
    slug: 'astrology',
    order: '01',
    domain: 'astrology',
    image: ASSETS.astrology,
    imagePosition: 'center center',
    title: {
      en: 'Astrology',
      ur: 'علمِ نجوم اور زائچہ',
      ar: 'علم الفلك والتنجيم التراثي',
    },
    shortDescription: {
      en: 'Classical natal chart analysis, planetary transits, and reflective life-timing sessions based on astronomical calculations.',
      ur: 'فلکیاتی حسابات پر مبنی پیدائشی زائچہ، سیاروں کی گردش اور زندگی کے اہم مراحل پر سنجیدہ مطالعہ۔',
      ar: 'قراءة الخريطة الفلكية وعبور الكواكب وجلسات التأمل الزمني المبنية على حسابات فلكية دقيقة.',
    },
    heroLead: {
      en: 'Structured classical and contemporary chart readings built on transparent astronomical ephemeris calculations—presented as reflective guidance distinct from religious rulings.',
      ur: 'شفاف فلکیاتی حساب کتاب پر مبنی کلاسیکی زائچہ اور سیاروی مطالعہ—جو دینی احکام سے الگ ایک فکری و روایتی رہنمائی ہے۔',
      ar: 'قراءات فلكية كلاسيكية منظمة تستند إلى حسابات إيفيميريس دقيقة، وتُقدَّم كتأمل ثقافي مستقل تماماً عن الفتاوى الشرعية.',
    },
    introduction: [
      {
        en: 'Classical astrology combines precise mathematical astronomy—computing exact planetary longitudes, lunar nodes, and the rising horizon for your birth moment—with centuries-old symbolic frameworks used across South Asian, Persian, and Western traditions.',
        ur: 'کلاسیکی علمِ نجوم میں آپ کی تاریخ، وقت اور مقامِ پیدائش کے مطابق سیاروں کے درست درجات کا حساب لگا کر روایتی مشرقی اور مغربی اصولوں کے تحت شخصیت اور ادوار کا مطالعہ کیا جاتا ہے۔',
        ar: 'يجمع التنجيم الكلاسيكي بين الحساب الفلكي الدقيق لمواقع الكواكب والطالع لحظة الميلاد وبين الإرث الرمزي العريق في التقاليد الشرقية والغربية.',
      },
      {
        en: 'At ASTROTALK PK, our astrology specialists treat chart reading as an analytical conversation for self-reflection and structured planning—never as fatalism, guaranteed prophecy, or a substitute for Islamic creed or professional advice.',
        ur: 'ایسٹروٹاک پی کے پر علمِ نجوم کو خود آگاہی اور فکری منصوبہ بندی کی ایک گفتگو کے طور پر پیش کیا جاتا ہے—اسے کبھی یقینی غیب دانی یا دینی عقائد کا متبادل قرار نہیں دیا جاتا۔',
        ar: 'في ASTROTALK PK نتعامل مع قراءة الخريطة الفلكية كجلسة حوارية للتأمل الشخصي، بعيداً عن الجزم بالمستقبل أو الخلط مع العقيدة الإسلامية.',
      },
    ],
    pillars: [
      {
        title: { en: 'Natal Birth Chart Analysis', ur: 'پیدائشی زائچہ (Birth Chart)', ar: 'تحليل خريطة الميلاد' },
        description: {
          en: 'Examine Sun, Moon, Rising Sign, and planetary house placements computed directly from your birth coordinates and UTC offset.',
          ur: 'تاریخ، وقت اور شہرِ پیدائش کے مطابق سورج، چاند، طالع (Rising Sign) اور سیاروں کے خانوں کا جامع جائزہ۔',
          ar: 'دراسة مواقع الشمس والقمر والطالع والبيوت الفلكية المحسوبة من إحداثيات وتوقيت ميلادك.',
        },
      },
      {
        title: { en: 'Western, Classical & South Asian Systems', ur: 'مشرقی اور مغربی نجومی اصول', ar: 'المدارس الفلكية الشرقية والغربية' },
        description: {
          en: 'Choose between tropical Western planetary interpretations, Perso-Arabic classical dignities, or traditional South Asian transit reviews.',
          ur: 'مغربی ٹراپیکل، کلاسیکی مشرقی یا جنوبی ایشیائی روایتی نظامِ کواکب میں سے اپنی ترجیح کے مطابق مطالعہ۔',
          ar: 'اختر بين المدرسة الغربية المدارية أو التراث الفلكي العربي والفارسي الكلاسيكي.',
        },
      },
      {
        title: { en: 'Yearly Transit & Career Cycles', ur: 'سالانہ سیاروی ادوار', ar: 'دورات العبور السنوية' },
        description: {
          en: 'Review major Saturn, Jupiter, and eclipse cycles to frame long-term career, relocation, and personal reflection questions.',
          ur: 'مشتری، زحل اور اہم فلکیاتی ادوار کا جائزہ تاکہ پیشہ ورانہ اور ذاتی فیصلوں پر غور کیا جا سکے۔',
          ar: 'مراجعة دورات المشتري وزحل لتأطير خططك المهنية والشخصية بوعي وتأنٍّ.',
        },
      },
    ],
    processSteps: [
      { en: 'Share your birth date, approximate or exact birth time, and birth city privately.', ur: 'اپنی تاریخِ پیدائش، وقت اور شہر کی معلومات رازداری سے فراہم کریں۔', ar: 'شارك تاريخ الميلاد ووقته ومدينته بسرية تامة.' },
      { en: 'Your specialist verifies the astronomical chart prior to your scheduled session.', ur: 'ماہر مشاورت سے پہلے آپ کا فلکیاتی زائچہ درست حساب سے تیار کرتا ہے۔', ar: 'يقوم المختص بحساب ومراجعة الخريطة الفلكية قبل موعد الجلسة.' },
      { en: 'Discuss insights calmly over WhatsApp, phone, or a confirmed appointment in English, Urdu, or Arabic.', ur: 'انگریزی، اردو یا عربی میں واٹس ایپ یا فون کال پر تفصیلی گفتگو کریں۔', ar: 'ناقش القراءة بهدوء عبر واتساب أو مكالمة هاتفية بلغتك المفضلة.' },
    ],
    ethicalBoundary: {
      en: 'Astrology is a traditional symbolic discipline distinct from Islamic theology and empirical science. ASTROTALK PK never predicts the unseen with certainty or guarantees life outcomes.',
      ur: 'علمِ نجوم ایک روایتی علامتی مطالعہ ہے جو اسلامی شرعی احکام سے الگ ہے۔ ہم غیب کی یقینی خبر یا کسی نتیجے کی ضمانت کا دعویٰ نہیں کرتے۔',
      ar: 'التنجيم التراثي مجال رمزي ثقافي منفصل عن الأحكام الشرعية الإسلامية والعلوم التجريبية، ولا ندعي معرفة الغيب أو ضمان النتائج.',
    },
    relatedSlugs: ['numerology', 'marriage-relationship-guidance', 'spiritual-consultation'],
    faqs: [
      {
        question: { en: 'What if I do not know my exact birth time?', ur: 'اگر مجھے پیدائش کا درست وقت معلوم نہ ہو تو کیا ہو گا؟', ar: 'ماذا لو لم أكن أعرف وقت ميلادي بدقة؟' },
        answer: {
          en: 'Planetary signs for your birth date can still be calculated reliably, though an exact Rising Sign (Ascendant) and house cusps require an accurate birth time.',
          ur: 'تاریخِ پیدائش سے سیاروں کے بروج معلوم کیے جا سکتے ہیں، البتہ درست طالع (Rising Sign) اور خانوں کے لیے پیدائش کا صحیح وقت ضروری ہوتا ہے۔',
          ar: 'يمكن حساب مواقع الكواكب ليوم الميلاد، غير أن تحديد الطالع والبيوت بدقة يتطلب معرفة وقت الميلاد.',
        },
      },
      {
        question: { en: 'Does ASTROTALK PK mix astrology with Islamic rulings?', ur: 'کیا ایسٹروٹاک پی کے علمِ نجوم کو اسلامی تعلیمات کے ساتھ ملاتا ہے؟', ar: 'هل تخلط المنصة بين التنجيم والأحكام الإسلامية؟' },
        answer: {
          en: 'No. We maintain a strict editorial and specialist separation between classical astrology and Quran & Sunnah-based spiritual guidance.',
          ur: 'بالکل نہیں۔ ہم علمِ نجوم اور قرآن و سنت پر مبنی روحانی رہنمائی کو مکمل طور پر الگ شعبوں میں رکھتے ہیں۔',
          ar: 'لا أبداً. نحن نحافظ على فصل تام بين التنجيم التراثي والإرشاد الروحي المستند إلى القرآن والسنة.',
        },
      },
    ],
  },
  {
    slug: 'rohani-ilaj',
    order: '02',
    domain: 'islamic-spiritual',
    image: ASSETS.rohani,
    imagePosition: 'center center',
    title: {
      en: 'Online Rohani Ilaj',
      ur: 'آن لائن روحانی علاج و رہنمائی',
      ar: 'الإرشاد الروحي والرقية الشرعية',
    },
    shortDescription: {
      en: 'Respectful Quran and Sunnah-based spiritual guidance, Ruqyah Shar\'iyyah education, and calm personal support.',
      ur: 'قرآن و سنت کی روشنی میں باوقار روحانی رہنمائی، مسنون رقیہ شرعیہ اور ذہنی اطمینان کے لیے مشاورت۔',
      ar: 'إرشاد روحي قائم على القرآن والسنة، وتعليم الرقية الشرعية الصحيحة بأسلوب هادئ ومحترم.',
    },
    heroLead: {
      en: 'Authentic Quranic recitation guidance and Prophetic supplications offered with dignity, complete privacy, and zero superstition.',
      ur: 'قرآنی آیات اور مسنون دعاؤں کے ذریعے وقار، رازداری اور توہم پرستی سے پاک روحانی رہنمائی۔',
      ar: 'توجيهات قرآنية وأدعية نبوية ثابتة تُقدَّم بوقار وخصوصية كاملة وبعيداً عن الخرافات.',
    },
    introduction: [
      {
        en: 'Online Rohani Ilaj at ASTROTALK PK focuses on grounded Islamic spiritual care—helping individuals and families cultivate peace of heart through authentic Quranic verses (Ruqyah Shar\'iyyah), consistent remembrance (Dhikr), and Prophetic supplications.',
        ur: 'ایسٹروٹاک پی کے پر آن لائن روحانی رہنمائی کا مقصد افراد اور خاندانوں کو مسنون رقیہ شرعیہ، ذکرِ الٰہی اور قرآنی دعاؤں کے ذریعے قلبی سکون کی راہ دکھانا ہے۔',
        ar: 'يركز الإرشاد الروحي في منصتنا على السكينة القلبية من خلال الرقية الشرعية الثابتة والأذكار اليومية والأدعية النبوية الصحيحة.',
      },
      {
        en: 'We strictly avoid fear-based diagnoses, unverified talismans, or claims of instant miraculous cures. Where physical or psychological symptoms exist, our specialists always encourage appropriate medical care alongside spiritual practice.',
        ur: 'ہم خوف پھیلانے والے دعووں یا فوری شفا کی جھوٹی ضمانتوں سے سختی سے اجتناب کرتے ہیں، اور جسمانی یا نفسیاتی عوارض میں ہمیشہ مستند طبی علاج جاری رکھنے کا مشورہ دیتے ہیں۔',
        ar: 'نرفض تماماً أساليب التخويف أو الادعاءات غير الموثقة، ونوصي دائماً بالرعاية الطبية والنفسية المختصة جنباً إلى جنب مع الذكر والرقية.',
      },
    ],
    pillars: [
      {
        title: { en: 'Quran & Sunnah Ruqyah Shar\'iyyah', ur: 'مسنون رقیہ شرعیہ', ar: 'الرقية الشرعية من القرآن والسنة' },
        description: {
          en: 'Learn how to recite Surah Al-Fatihah, Ayat al-Kursi, and Al-Mu\'awwidhat with clarity and consistency for yourself and your household.',
          ur: 'اپنے اور اپنے اہلِ خانہ کے لیے سورۃ الفاتحہ، آیت الکرسی اور معوذتین کی باقاعدہ تلاوت کا مسنون طریقہ سیکھیں۔',
          ar: 'تعلّم قراءة الفاتحة وآية الكرسي والمعوذات بيقين وانتظام لنفسك ولأهل بيتك.',
        },
      },
      {
        title: { en: 'Morning & Evening Adhkar Routine', ur: 'صبح و شام کے مسنون اذکار', ar: 'أذكار الصباح والمساء' },
        description: {
          en: 'Build a sustainable daily spiritual routine tailored to busy schedules in the UK, Europe, North America, Australia, and the Gulf.',
          ur: 'بیرونِ ملک مصروف طرزِ زندگی کے مطابق صبح و شام کے مسنون اذکار کا آسان اور مستقل معمول۔',
          ar: 'بناء برنامج يومي متوازن للأذكار يناسب نمط الحياة العملي في أوروبا وأمريكا والخليج.',
        },
      },
      {
        title: { en: 'Compassionate Listening & Privacy', ur: 'ہمدردانہ سماعت اور مکمل رازداری', ar: 'استماع متفهم وسرية كاملة' },
        description: {
          en: 'Speak openly in Urdu, English, or Arabic in a confidential, non-judgmental consultation setting.',
          ur: 'اردو، انگریزی یا عربی میں مکمل پردہ داری اور احترام کے ساتھ اپنے حالات بیان کریں۔',
          ar: 'تحدث بأريحية باللغة العربية أو الأردية أو الإنجليزية في بيئة آمنة ومحترمة.',
        },
      },
    ],
    processSteps: [
      { en: 'Share the general nature of your concern without fear or pressure.', ur: 'بغیر کسی خوف یا دباؤ کے اپنی پریشانی کا مختصر احوال بیان کریں۔', ar: 'اشرح طبيعة استفسارك بهدوء واطمئنان.' },
      { en: 'Receive structured Sunnah-based Ruqyah and Dua guidance tailored to your situation.', ur: 'اپنے حالات کے مطابق مسنون دعاؤں اور رقیہ شرعیہ کی واضح رہنمائی حاصل کریں۔', ar: 'احصل على برنامج واضح من الرقية والأدعية الثابتة.' },
      { en: 'Follow up responsibly while continuing any necessary medical or family support.', ur: 'ضروری طبی یا خاندانی معاونت کے ساتھ روحانی معمولات پر پرسکون انداز میں عمل کریں۔', ar: 'تابع تطبيقك الروحي بالتوازي مع أي دعم طبي أو أسري لازم.' },
    ],
    ethicalBoundary: {
      en: 'Rohani guidance supports spiritual peace through authentic Islamic remembrance. It is not medical treatment and never claims guaranteed cures for physical or mental illness.',
      ur: 'روحانی رہنمائی قلبی سکون اور دینی تقویت کے لیے ہے۔ یہ کسی طبی علاج کا متبادل نہیں اور نہ ہی کسی بیماری سے یقینی شفا کا دعویٰ کرتی ہے۔',
      ar: 'الإرشاد الروحي يهدف إلى الطمأنينة القلبية عبر الذكر والقرآن، ولا يُعد بديلاً عن العلاج الطبي أو النفسي المختص.',
    },
    relatedSlugs: ['kala-jadu-ka-tor', 'dua-and-wazifa', 'online-istikhara'],
    faqs: [
      {
        question: { en: 'Can I recite Ruqyah for myself after the consultation?', ur: 'کیا مشاورت کے بعد میں خود اپنے لیے رقیہ پڑھ سکتا ہوں؟', ar: 'هل يمكنني قراءة الرقية الشرعية على نفسي؟' },
        answer: {
          en: 'Yes. In fact, Sunnah encourages self-Ruqyah, and our specialists emphasize teaching you authentic recitations rather than creating dependency.',
          ur: 'جی ہاں، سنتِ نبویؐ میں خود اپنے اوپر دم کرنے کی ترغیب دی گئی ہے، اور ہمارے ماہرین آپ کو خود مستند اذکار سکھانے پر زور دیتے ہیں۔',
          ar: 'نعم، بل إن السنة النبوية تحث على رقية الإنسان لنفسه، ويحرص مختصونا على تعليمك الأذكار الصحيحة.',
        },
      },
    ],
  },
  {
    slug: 'kala-jadu-ka-tor',
    order: '03',
    domain: 'islamic-spiritual',
    image: ASSETS.protection,
    imagePosition: 'center center',
    title: {
      en: 'Kala Jadu Ka Tor',
      ur: 'کالا جادو کا توڑ اور شرعی تحفظ',
      ar: 'التحصين الشرعي والوقاية بالقرآن',
    },
    shortDescription: {
      en: 'Calm, educational Islamic protection guidance grounded in authentic Quranic duas and Ruqyah—free from fear or unfounded claims.',
      ur: 'مسنون قرآنی دعاؤں اور رقیہ شرعیہ پر مبنی پرسکون اور مستند شرعی تحفظ—خوف اور وہم سے پاک۔',
      ar: 'إرشاد تعليمي هادئ للتحصين الشرعي عبر الآيات القرآنية والرقية الصحيحة بعيداً عن التهويل.',
    },
    heroLead: {
      en: 'Grounded Islamic spiritual protection education focused on Prophetic Adhkar, household serenity, and clarity rather than fear-mongering.',
      ur: 'خوف و ہراس پھیلائے بغیر مسنون اذکار، گھریلو سکون اور قرآنِ پاک کے ذریعے شرعی تحفظ کی صحیح رہنمائی۔',
      ar: 'توجيه شرعي متزن يركز على الأذكار النبوية والسكينة الأسرية بدلاً من الأوهام والتخويف.',
    },
    introduction: [
      {
        en: 'Many families experiencing prolonged stress, financial setbacks, or domestic tension worry about envy (Hasad) or black magic (Sihr). Unfortunately, unverified online operators frequently exploit these anxieties with frightening diagnoses.',
        ur: 'مسلسل ذہنی دباؤ، کاروباری رکاوٹ یا گھریلو کشیدگی کی صورت میں بہت سے خاندان نظرِ بد، حسد یا جادو کے خدشے میں مبتلا ہو جاتے ہیں۔ بدقسمتی سے بعض غیر مستند عناصر اس خوف سے ناجائز فائدہ اٹھاتے ہیں۔',
        ar: 'كثيراً ما تساور الأسر مخاوف من الحسد أو السحر عند مرورها بضغوط متتالية، وللأسف يستغل البعض هذه المخاوف بتشخيصات مخيفة غير موثقة.',
      },
      {
        en: 'ASTROTALK PK follows a strict ethical standard: we never accuse anyone of practicing magic, never claim a person is afflicted without evidence, and never sell fearful remedies. Instead, our specialists provide calm education on Prophetic spiritual protection (Masnoon Hifazat) and encourage evaluating practical, medical, and interpersonal factors alongside Quranic recitation.',
        ur: 'ایسٹروٹاک پی کے کا اصول واضح ہے: ہم کبھی کسی فرد پر الزام نہیں لگاتے، بغیر ثبوت جادو کا دعویٰ نہیں کرتے، بلکہ قرآن و سنت کے مسنون حفاظتی اذکار سکھاتے ہیں اور عملی و طبی پہلوؤں پر بھی غور کرنے کی تلقین کرتے ہیں۔',
        ar: 'نلتزم بميثاق أخلاقي صارم: لا نتهم أحداً بالسحر، ولا نجزم بوجود إصابة دون بينة، بل نعلّم التحصين النبوي الصحيح وننصح بدراسة الأسباب العملية والطبية بهدوء.',
      },
    ],
    pillars: [
      {
        title: { en: 'Authentic Quranic Protection Verses', ur: 'مستند قرآنی حفاظتی آیات', ar: 'آيات التحصين القرآنية' },
        description: {
          en: 'Guided practice of Surah Al-Baqarah, Ayat al-Kursi, Surah Al-Falaq, and Surah An-Nas as taught in authentic Sunnah collections.',
          ur: 'سورۃ البقرہ، آیت الکرسی، سورۃ الفلق اور سورۃ الناس کی مسنون تلاوت کا درست طریقہ۔',
          ar: 'المداومة على سورة البقرة وآية الكرسي والمعوذتين وفق الهدي النبوي الصحيح.',
        },
      },
      {
        title: { en: 'Balanced Assessment Without Fear', ur: 'خوف اور وہم سے پاک متوازن جائزہ', ar: 'تقييم متزن خالٍ من التهويل' },
        description: {
          en: 'Help distinguish everyday emotional fatigue, health concerns, or family misunderstandings from spiritual distress.',
          ur: 'روزمرہ ذہنی تھکاوٹ، طبی مسائل اور گھریلو غلط فہمیوں کو روحانی خدشات سے الگ سمجھنے میں مدد۔',
          ar: 'المساعدة في التمييز الهادئ بين الضغوط النفسية والصحية وبين المخاوف الروحية.',
        },
      },
      {
        title: { en: 'Zero Accusations or Harmful Rituals', ur: 'الزام تراشی اور غیر شرعی اعمال سے مکمل اجتناب', ar: 'رفض الاتهامات والطقوس المخالفة' },
        description: {
          en: 'We never name relatives or neighbours as culprits and never prescribe un-Islamic rituals.',
          ur: 'ہم کبھی رشتہ داروں یا پڑوسیوں پر شک نہیں ڈالتے اور نہ ہی کوئی غیر شرعی عمل تجویز کرتے ہیں۔',
          ar: 'لا نوجه أصابع الاتهام لأي فرد ولا نصف أي ممارسات خارجة عن الشرع.',
        },
      },
    ],
    processSteps: [
      { en: 'Discuss your household concerns in a calm, private consultation.', ur: 'اپنے گھریلو یا ذاتی خدشات پرسکون اور خفیہ ماحول میں بیان کریں۔', ar: 'تحدث عن مخاوفك في جلسة خاصة وهادئة.' },
      { en: 'Receive a structured Prophetic protection and Ruqyah recitation guide.', ur: 'مسنون حفاظتی دعاؤں اور رقیہ کا منظم شیڈول حاصل کریں۔', ar: 'تسلّم دليلاً منظماً للرقية الشرعية وأذكار التحصين.' },
      { en: 'Review practical wellbeing steps to restore peace and confidence at home.', ur: 'گھر میں سکون اور اعتماد کی بحالی کے لیے عملی اقدامات پر غور کریں۔', ar: 'ناقش خطوات عملية لاستعادة الهدوء والطمأنينة في المنزل.' },
    ],
    ethicalBoundary: {
      en: 'We never claim someone is affected by black magic without evidence, never use frightening language, and never promise guaranteed cures or supernatural removals.',
      ur: 'ہم بغیر ثبوت کسی پر جادو ہونے کا دعویٰ نہیں کرتے، خوفناک زبان استعمال نہیں کرتے، اور کسی یقینی یا جادوئی علاج کی ضمانت نہیں دیتے۔',
      ar: 'لا نجزم بوجود سحر دون دليل، ولا نستخدم أسلوب الترهيب، ولا نعد بعلاجات مضمونة أو خارقة.',
    },
    relatedSlugs: ['rohani-ilaj', 'dua-and-wazifa', 'family-guidance'],
    faqs: [
      {
        question: { en: 'Will the specialist tell me if a specific relative did magic on me?', ur: 'کیا ماہر یہ بتائیں گے کہ کس رشتہ دار نے جادو کیا ہے؟', ar: 'هل سيخبرني المختص إن كان أحد الأقارب قد سحرني؟' },
        answer: {
          en: 'No. Naming or accusing people breeds family discord and violates Islamic ethics. Our guidance focuses solely on peace, Quranic protection, and constructive steps.',
          ur: 'بالکل نہیں۔ کسی کا نام لینا یا شک ڈالنا خاندانوں کو توڑتا ہے اور اسلامی اخلاقیات کے خلاف ہے۔ ہم صرف قرآنی تحفظ اور امن کی رہنمائی کرتے ہیں۔',
          ar: 'لا مطلقاً. اتهام الآخرين يفسد العلاقات الأسرية ويخالف الأخلاق الإسلامية؛ نحن نركز فقط على التحصين والسكينة.',
        },
      },
    ],
  },
  {
    slug: 'online-istikhara',
    order: '04',
    domain: 'islamic-spiritual',
    image: ASSETS.istikhara,
    imagePosition: 'center center',
    title: {
      en: 'Online Istikhara',
      ur: 'آن لائن استخارہ رہنمائی',
      ar: 'إرشاد صلاة الاستخارة',
    },
    shortDescription: {
      en: 'Learn the authentic Sunnah method of Salat al-Istikhara with respectful scholarly guidance for life, business, and personal decisions.',
      ur: 'کاروبار، ملازمت اور ذاتی فیصلوں کے لیے مسنون صلوٰۃ الاستخارہ کا صحیح طریقہ اور سنجیدہ رہنمائی۔',
      ar: 'تعلّم الطريقة النبوية الصحيحة لصلاة الاستخارة مع إرشاد متزن لقرارات العمل والحياة.',
    },
    heroLead: {
      en: 'Understand the true Prophetic meaning of Istikhara—seeking goodness from Allah alongside wise consultation (Mashwara), never fortune-telling.',
      ur: 'استخارہ کا اصل مسنون مفہوم سمجھیں—اللہ تعالیٰ سے خیر طلب کرنا اور دانائی سے مشورہ کرنا، نہ کہ مستقبل کی پیش گوئی۔',
      ar: 'تعرّف على المعنى النبوي الأصيل للاستخارة: طلب الخير من الله مع المشورة الحكيمة، بعيداً عن التنبؤ بالغيب.',
    },
    introduction: [
      {
        en: 'Salat al-Istikhara is a cherished Prophetic practice taught by Prophet Muhammad (peace be upon him) to seek Allah\'s guidance when facing a lawful decision—whether in career, business, relocation, or personal life.',
        ur: 'صلوٰۃ الاستخارہ نبی کریم ﷺ کی سکھائی ہوئی ایک عظیم سنت ہے جس کے ذریعے جائز امور—مثلاً کاروبار، ملازمت، ہجرت یا ذاتی فیصلوں—میں اللہ تعالیٰ سے خیر و برکت طلب کی جاتی ہے۔',
        ar: 'صلاة الاستخارة سنة نبوية جليلة شرعها النبي ﷺ لطلب الخيرة من الله تعالى عند الإقدام على القرارات المباحة في العمل أو السفر أو الحياة الشخصية.',
      },
      {
        en: 'Contrary to common myths, Istikhara is not about seeing coloured dreams or receiving guaranteed predictions about the future. Our specialists teach you how to perform Istikhara yourself with the authentic Sahih Bukhari supplication, help you reflect thoughtfully on your decision (Istishara), and clarify misunderstandings.',
        ur: 'عام غلط فہمیوں کے برعکس استخارہ مخصوص رنگوں کے خواب دیکھنے یا مستقبل کی یقینی پیش گوئی کا نام نہیں۔ ہمارے ماہرین آپ کو صحیح بخاری کی مسنون دعا کے ساتھ خود استخارہ کرنے کا طریقہ اور صحیح مشاورت کی اہمیت سمجھاتے ہیں۔',
        ar: 'على خلاف الشائع، لا تشترط الاستخارة رؤية منامات معينة وليست قراءةً للمستقبل؛ بل نرشدك لأدائها بنفسك بالدعاء الثابت في صحيح البخاري مع الاستشارة الواعية.',
      },
    ],
    pillars: [
      {
        title: { en: 'Authentic Sunnah Methodology', ur: 'مسنون طریقہ استخارہ', ar: 'المنهج النبوي الصحيح' },
        description: {
          en: 'Step-by-step guidance on performing two voluntary rak\'ahs and reciting the authentic Dua-e-Istikhara with full Arabic and Urdu meaning.',
          ur: 'دو رکعت نفل اور مسنون دعائے استخارہ کی ادائیگی کا مکمل اور آسان طریقہ۔',
          ar: 'شرح ميسر لأداء ركعتين من غير الفريضة وتلاوة دعاء الاستخارة المأثور بفهم وخشوع.',
        },
      },
      {
        title: { en: 'Business & Relocation Decisions', ur: 'کاروبار اور بیرونِ ملک فیصلے', ar: 'قرارات العمل والانتقال' },
        description: {
          en: 'Thoughtful guidance for overseas professionals weighing job offers, partnerships, property, or relocation between countries.',
          ur: 'بیرونِ ملک ملازمت، شراکت داری، جائیداد یا ملک منتقلی جیسے اہم فیصلوں میں سنجیدہ رہنمائی۔',
          ar: 'دعم فكري وروحي للمغتربين عند تقييم عروض العمل أو الشراكات أو الانتقال بين الدول.',
        },
      },
      {
        title: { en: 'Combining Istikhara with Istishara', ur: 'استخارہ اور مشورے کا امتزاج', ar: 'الجمع بين الاستخارة والاستشارة' },
        description: {
          en: 'Learn how Islamic tradition pairs spiritual reliance (Tawakkul) with informed practical consultation and careful due diligence.',
          ur: 'اسلامی تعلیمات کے مطابق توکل علی اللہ کے ساتھ عملی تحقیق اور باخبر مشورے کا متوازن طریقہ۔',
          ar: 'كيف يجمع المنهج الإسلامي بين التوكل على الله وبذل الأسباب والمشورة الصادقة.',
        },
      },
    ],
    processSteps: [
      { en: 'Outline the decision you are weighing in a private consultation.', ur: 'جس اہم فیصلے کے لیے رہنمائی درکار ہے اس کی نوعیت مختصراً بیان کریں۔', ar: 'شارك طبيعة القرار الذي تدرسه في جلسة خاصة.' },
      { en: 'Learn the authentic Sunnah steps and supplication for your specific matter.', ur: 'اپنے معاملے کے مطابق مسنون طریقہ اور دعائے استخارہ کی مکمل تفصیل سمجھیں۔', ar: 'تعلّم خطوات الاستخارة والدعاء الصحيح لمسألتك.' },
      { en: 'Move forward with Tawakkul, clarity, and practical reflection rather than anxiety.', ur: 'اضطراب کے بجائے توکل، بصیرت اور عملی غور و فکر کے ساتھ قدم بڑھائیں۔', ar: 'امضِ قدماً بتوكل ووضوح واطمئنان.' },
    ],
    ethicalBoundary: {
      en: 'ASTROTALK PK never markets Istikhara as guaranteed future prediction, fortune-telling, or dream-based certainty. Only Allah knows the unseen.',
      ur: 'ایسٹروٹاک پی کے استخارہ کو کبھی مستقبل کی یقینی پیش گوئی یا غیب دانی کے طور پر پیش نہیں کرتا۔ علمِ غیب صرف اللہ تعالیٰ کے پاس ہے۔',
      ar: 'لا نقدم الاستخارة أبداً كوسيلة للتنبؤ بالمستقبل أو التنجيم؛ فعلم الغيب لله وحده.',
    },
    relatedSlugs: ['marriage-istikhara', 'dua-and-wazifa', 'rohani-ilaj'],
    duaReferences: [
      {
        title: { en: 'Authentic Dua of Salat al-Istikhara', ur: 'مسنون دعائے استخارہ', ar: 'دعاء صلاة الاستخارة المأثور' },
        arabic:
          'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ',
        transliteration:
          'Allahumma inni astakhiruka bi-ilmika, wa astaqdiruka bi-qudratika, wa as-aluka min fadlikal-azim, fa-innaka taqdiru wa la aqdiru, wa ta\'lamu wa la a\'lamu, wa Anta \'Allamul-ghuyub.',
        urduTranslation:
          'اے اللہ! میں تیرے علم کے ذریعے تجھ سے خیر طلب کرتا ہوں، تیری قدرت کے ذریعے تجھ سے طاقت مانگتا ہوں، اور تیرے عظیم فضل کا سوال کرتا ہوں، کیونکہ تو قدرت رکھتا ہے اور میں قدرت نہیں رکھتا، تو جانتا ہے اور میں نہیں جانتا، اور تو غیبوں کا خوب جاننے والا ہے۔',
        englishTranslation:
          'O Allah, I seek Your counsel through Your knowledge, and I seek Your power through Your might, and I ask You from Your immense favour. For indeed You are able and I am not, You know and I do not, and You are the Knower of the unseen.',
        reference: 'Sahih al-Bukhari 1166 (Opening excerpt)',
      },
    ],
    faqs: [
      {
        question: { en: 'Must I see a dream for Istikhara to work?', ur: 'کیا استخارہ کے لیے خواب دیکھنا ضروری ہے؟', ar: 'هل يشترط رؤية منام بعد صلاة الاستخارة؟' },
        answer: {
          en: 'No. Scholars widely explain that Istikhara does not require a dream. Ease in the matter, clarity of heart, and constructive practical progress after sincere prayer are key signs of guidance.',
          ur: 'نہیں۔ علماء کرام واضح فرماتے ہیں کہ استخارہ میں خواب آنا ضروری نہیں۔ خلوصِ نیت سے دعا کے بعد معاملے میں آسانی، دلی اطمینان اور اسباب کا میسر آنا اصل رہنمائی ہے۔',
          ar: 'لا يشترط رؤية منام؛ بل يظهر التوفيق غالباً في تيسير الأسباب وانشراح الصدر بعد الدعاء والمشورة.',
        },
      },
    ],
  },
  {
    slug: 'marriage-istikhara',
    order: '05',
    domain: 'islamic-spiritual',
    image: ASSETS.marriageIstikhara,
    imagePosition: 'center center',
    title: {
      en: 'Marriage Istikhara',
      ur: 'شادی اور رشتے کے لیے استخارہ',
      ar: 'استخارة الزواج والخطبة',
    },
    shortDescription: {
      en: 'Dignified Sunnah-based Istikhara and thoughtful pre-marital consultation for Pakistani families in Pakistan and abroad.',
      ur: 'پاکستان اور بیرونِ ملک مقیم خاندانوں کے لیے شادی اور رشتے کے فیصلوں میں مسنون استخارہ اور سنجیدہ مشاورت۔',
      ar: 'توجيه مسنون لاستخارة الزواج ومشورة أسرية متزنة للعائلات في باكستان والمهجر.',
    },
    heroLead: {
      en: 'Navigate marriage proposals across continents with spiritual composure, authentic Istikhara practice, and practical family reflection.',
      ur: 'ملک اور بیرونِ ملک رشتوں کے اہم فیصلوں میں مسنون استخارہ، دلی سکون اور باوقار خاندانی مشاورت حاصل کریں۔',
      ar: 'تعامل مع قرارات الخطبة والزواج عبر القارات بطمأنينة روحية وممارسة مسنونة للاستخارة وتأمل أسري واعٍ.',
    },
    introduction: [
      {
        en: 'Evaluating a marriage proposal—especially across international borders between the UK, Europe, North America, the Gulf, and Pakistan—carries emotional, cultural, and practical weight for both individuals and parents.',
        ur: 'رشتے کا انتخاب—بالخصوص جب معاملہ برطانیہ، یورپ، امریکہ، خلیج اور پاکستان کے درمیان ہو—افراد اور والدین دونوں کے لیے نہایت حساس اور اہم فیصلہ ہوتا ہے۔',
        ar: 'يحمل تقييم قرار الزواج—لا سيما بين الأسر في المهجر وباكستان—أبعاداً روحية وثقافية وعملية دقيقة.',
      },
      {
        en: 'Our Marriage Istikhara consultations emphasize the Sunnah of personally praying Istikhara alongside honest verification of character, compatibility, and shared values—never declaring a match "fated" or "cursed" through unfounded claims.',
        ur: 'ہماری رہنمائی میں خود مسنون استخارہ کرنے کے ساتھ ساتھ کردار، ہم آہنگی اور باہمی اقدار کی دیانتدارانہ جانچ پر توجہ دی جاتی ہے—کبھی کسی رشتے پر غیر مصدقہ حکم نہیں لگایا جاتا۔',
        ar: 'نركز على أداء الاستخارة النبوية بالتوازي مع التحقق الصادق من الخلق والتكافؤ والقيم المشتركة.',
      },
    ],
    pillars: [
      {
        title: { en: 'Guidance for Individuals & Parents', ur: 'امیدوار اور والدین دونوں کے لیے رہنمائی', ar: 'إرشاد للأبناء والوالدين معاً' },
        description: {
          en: 'Support respectful dialogue between young adults and parents navigating cross-cultural expectations.',
          ur: 'نئی نسل اور والدین کے درمیان احترام اور باہمی افہام و تفہیم کے ساتھ گفتگو میں معاونت۔',
          ar: 'تيسير الحوار المحترم بين الأبناء والوالدين عند تقييم التوافق الأسري.',
        },
      },
      {
        title: { en: 'Authentic Istikhara Supplication', ur: 'صحیح مسنون دعائے استخارہ', ar: 'الدعاء المسنون للزواج' },
        description: {
          en: 'Learn how to invoke Allah\'s blessing in your specific proposal decision with complete clarity.',
          ur: 'رشتے کے فیصلے میں اللہ تعالیٰ سے خیر اور عافیت طلب کرنے کا درست مسنون طریقہ۔',
          ar: 'تعلّم كيفية التوجه إلى الله بطلب الخير والبركة في قرار الارتباط.',
        },
      },
      {
        title: { en: 'Structured Compatibility Reflection', ur: 'باہمی ہم آہنگی کا سنجیدہ جائزہ', ar: 'تأمل منظم في التوافق' },
        description: {
          en: 'Identify key questions around values, communication, and family life to discuss alongside Istikhara.',
          ur: 'استخارہ کے ساتھ ساتھ اقدار، گفتگو اور گھریلو زندگی کے اہم پہلوؤں پر غور۔',
          ar: 'استعراض الأسئلة الأساسية حول القيم والتواصل والحياة الأسرية المشتركة.',
        },
      },
    ],
    processSteps: [
      { en: 'Book a private session in English, Urdu, or Arabic.', ur: 'انگریزی، اردو یا عربی میں نجی مشاورت بُک کریں۔', ar: 'احجز جلسة خاصة باللغة المناسبة لك.' },
      { en: 'Walk through the Sunnah Istikhara steps and practical family questions.', ur: 'مسنون استخارہ اور خاندانی مشاورت کے اہم نکات کا جائزہ لیں۔', ar: 'استعرض خطوات الاستخارة والمسائل العملية المتعلقة بالخطبة.' },
      { en: 'Make your decision with serenity, personal agency, and family respect.', ur: 'سکون، ذاتی بصیرت اور خاندانی احترام کے ساتھ اپنا فیصلہ کریں۔', ar: 'اتخذ قرارك بطمأنينة ووعي واحترام متبادل.' },
    ],
    ethicalBoundary: {
      en: 'Marriage Istikhara is an act of worship and trust in Allah, not fortune-telling. Final decisions always rest freely with the individuals and their families.',
      ur: 'شادی کا استخارہ عبادت اور اللہ پر توکل ہے، مستقبل کی غیب دانی نہیں۔ حتمی فیصلہ ہمیشہ فرد اور خاندان کی آزاد مرضی سے ہونا چاہیے۔',
      ar: 'استخارة الزواج عبادة وتوكل وليست تنجيماً، والقرار النهائي يبقى دائماً بيد الطرفين وأسرتيهما.',
    },
    relatedSlugs: ['online-istikhara', 'marriage-relationship-guidance', 'family-guidance'],
    faqs: [
      {
        question: { en: 'Can parents pray Istikhara on behalf of their son or daughter?', ur: 'کیا والدین اپنی اولاد کے لیے استخارہ کر سکتے ہیں؟', ar: 'هل يمكن للوالدين صلاة الاستخارة لأبنائهم؟' },
        answer: {
          en: 'The primary Sunnah is for the person making the decision to perform Istikhara themselves, while parents can sincerely make Dua and pray Istikhara regarding their own parental role and consent.',
          ur: 'اصل سنت یہ ہے کہ فیصلہ کرنے والا فرد خود استخارہ کرے، جبکہ والدین اولاد کے لیے دعا کر سکتے ہیں اور اپنی ذمہ داری کے متعلق خود بھی استخارہ کر سکتے ہیں۔',
          ar: 'الأصل أن يصلي الاستخارة صاحب الشأن نفسه، وللوالدين أن يدعوا له بالخير ويستخيرا فيما يتعلق بموافقتهما ورأيهما.',
        },
      },
    ],
  },
  {
    slug: 'dua-and-wazifa',
    order: '06',
    domain: 'islamic-spiritual',
    image: ASSETS.spiritual,
    imagePosition: 'center center',
    title: {
      en: 'Dua & Wazifa Guidance',
      ur: 'مسنون دعائیں اور وظائف رہنمائی',
      ar: 'إرشاد الأدعية والأوراد المأثورة',
    },
    shortDescription: {
      en: 'Authentic Quranic and Prophetic supplications with clear Arabic text, Urdu translation, and scholarly context.',
      ur: 'مستند قرآنی اور مسنون دعائیں عربی متن، اردو ترجمے اور صحیح حوالوں کے ساتھ۔',
      ar: 'أدعية قرآنية ونبوية صحيحة مع النص العربي والترجمة الأردية والتخريج الموثق.',
    },
    heroLead: {
      en: 'Cultivate a peaceful, authentic daily supplication routine rooted strictly in the Quran and reliable Hadith collections.',
      ur: 'قرآنِ پاک اور مستند کتبِ حدیث سے ماخوذ مسنون دعاؤں اور اذکار کا پرسکون روزانہ معمول اپنائیں۔',
      ar: 'ابنِ ورداً يومياً مطمئناً من الأدعية المأثورة المستمدة حصراً من القرآن الكريم والسنة الصحيحة.',
    },
    introduction: [
      {
        en: 'Finding authentic supplications online can be overwhelming when unverified formulas and exaggerated numerical claims circulate widely. Our Dua and Wazifa specialists prioritize verified Quranic verses and Prophetic Adhkar (from Sahih al-Bukhari, Sahih Muslim, and Hisn al-Muslim).',
        ur: 'انٹرنیٹ پر غیر مصدقہ وظائف کی بھرمار کے درمیان مستند اور مسنون دعاؤں کا انتخاب مشکل ہو جاتا ہے۔ ہمارے ماہرین صرف قرآنِ کریم اور صحیح احادیث سے ثابت شدہ اذکار اور دعاؤں کی رہنمائی کرتے ہیں۔',
        ar: 'نركز حصراً على الآيات القرآنية والأذكار النبوية الثابتة في الصحيحين وحصن المسلم بعيداً عن الصيغ غير الموثقة.',
      },
    ],
    pillars: [
      {
        title: { en: 'Verified Hadith & Quranic Sources', ur: 'مستند قرآنی و حدیثی حوالہ جات', ar: 'مصادر قرآنية ونبوية موثقة' },
        description: {
          en: 'Every recommended supplication includes accurate Arabic script, clear Urdu and English meaning, and its classical reference.',
          ur: 'ہر تجویز کردہ دعا درست عربی متن، واضح اردو و انگریزی ترجمے اور مستند حوالے کے ساتھ فراہم کی جاتی ہے۔',
          ar: 'كل دعاء مقترح مرفق بنصه العربي المضبوط ومعناه ومصدره الموثق.',
        },
      },
      {
        title: { en: 'Sustainable Daily Devotion', ur: 'قابلِ عمل روزانہ معمول', ar: 'أوراد يومية متوازنة' },
        description: {
          en: 'Focus on sincerity (Ikhlas), presence of heart, and realistic consistency rather than exhausting ritualistic burdens.',
          ur: 'مشکل اور بے بنیاد شرائط کے بجائے اخلاص، حضورِ قلب اور مستقل مزاجی پر توجہ۔',
          ar: 'التركيز على الإخلاص وحضور القلب والاستمرارية دون تكلف.',
        },
      },
      {
        title: { en: 'Relief from Anxiety & Gratitude', ur: 'ذہنی سکون، رزقِ حلال اور شکر گزاری', ar: 'أدعية تفريج الهم والبركة' },
        description: {
          en: 'Structured supplications for patience during hardship, lawful livelihood, family harmony, and gratitude.',
          ur: 'پریشانی میں صبر، رزقِ حلال میں برکت، گھریلو سکون اور شکر گزاری کے لیے مسنون دعائیں۔',
          ar: 'أدعية مأثورة للصبر عند الشدائد والبركة في الرزق والسكينة الأسرية.',
        },
      },
    ],
    processSteps: [
      { en: 'Share the life season or spiritual goal you wish to pray for.', ur: 'اپنے حالات یا روحانی مقصد کا مختصر تعارف کروائیں۔', ar: 'شارك الظرف أو الهدف الروحي الذي ترغب في الدعاء لأجله.' },
      { en: 'Receive authentic Arabic text, pronunciation support, and Urdu/English translations.', ur: 'درست عربی متن، تلفظ کی رہنمائی اور اردو و انگریزی ترجمہ حاصل کریں۔', ar: 'احصل على النص العربي المضبوط والترجمة والتوجيه.' },
      { en: 'Incorporate the supplications naturally after daily prayers with calm trust in Allah.', ur: 'پنج وقتہ نمازوں کے بعد اطمینان اور توکل کے ساتھ ان دعاؤں کو معمول بنائیں۔', ar: 'واظب عليها بهدوء ويقين بعد الصلوات اليومية.' },
    ],
    ethicalBoundary: {
      en: 'Dua is an act of worship and humble supplication to Allah. We never sell "guaranteed instant-result wazifas" or invent unverified conditions.',
      ur: 'دعا عبادت اور اللہ کے حضور عاجزی کا اظہار ہے۔ ہم کبھی "یقینی فوری نتیجے والے وظائف" کا دعویٰ نہیں کرتے۔',
      ar: 'الدعاء عبادة وتضرع إلى الله تعالى، ولا نروّج أبداً لوصفات مضمونة النتائج أو شروط مبتدعة.',
    },
    duaReferences: [
      {
        title: { en: 'Prophetic Dua for Ease & Relief from Distress', ur: 'پریشانی اور رنج سے نجات کی مسنون دعا', ar: 'دعاء الكرب والهم المأثور' },
        arabic: 'اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ',
        transliteration: 'Allahumma rahmataka arju fala takilni ila nafsi tarfata \'aynin, wa aslih li sha\'ni kullahu, la ilaha illa Anta.',
        urduTranslation: 'اے اللہ! میں تیری رحمت کا امیدوار ہوں، پس مجھے پلک جھپکنے کے برابر بھی میرے نفس کے حوالے نہ کر، اور میرے تمام معاملات درست فرما دے، تیرے سوا کوئی معبود نہیں۔',
        englishTranslation: 'O Allah, it is Your mercy that I hope for, so do not leave me to myself even for the blink of an eye, and set right all of my affairs. None has the right to be worshipped except You.',
        reference: 'Sunan Abi Dawud 5090 · Hisn al-Muslim',
      },
      {
        title: { en: 'Quranic Supplication for Family Serenity', ur: 'اہلِ خانہ کی آنکھوں کی ٹھنڈک اور سکون کی قرآنی دعا', ar: 'الدعاء القرآني لقرة العين والأسرة' },
        arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
        transliteration: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yunin waj\'alna lil-muttaqina imama.',
        urduTranslation: 'اے ہمارے رب! ہمیں ہماری بیویوں اور اولاد کی طرف سے آنکھوں کی ٹھنڈک عطا فرما، اور ہمیں پرہیزگاروں کا پیشوا بنا۔',
        englishTranslation: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us an example for the righteous.',
        reference: 'Surah Al-Furqan (25:74)',
      },
    ],
    relatedSlugs: ['online-istikhara', 'rohani-ilaj', 'spiritual-consultation'],
    faqs: [
      {
        question: { en: 'Are the duas provided verified from authentic sources?', ur: 'کیا فراہم کردہ دعائیں مستند کتب سے تصدیق شدہ ہوتی ہیں؟', ar: 'هل الأدعية المقدمة موثقة من مصادر صحيحة؟' },
        answer: {
          en: 'Yes. We cite the Quranic Surah and Ayah or classical Hadith reference for every supplication we share.',
          ur: 'جی ہاں، ہم ہر دعا کے ساتھ قرآنی سورت و آیت یا مستند حدیث کا حوالہ فراہم کرتے ہیں۔',
          ar: 'نعم، نذكر دائماً رقم السورة والآية أو تخريج الحديث الشريف لكل دعاء.',
        },
      },
    ],
  },
  {
    slug: 'numerology',
    order: '07',
    domain: 'astrology',
    image: ASSETS.numerology,
    imagePosition: 'center center',
    title: {
      en: 'Numerology & Ilm-ul-Adad',
      ur: 'علمِ اعداد اور ابجد',
      ar: 'علم الأعداد وحساب الجُمَّل',
    },
    shortDescription: {
      en: 'Classical Eastern Abjad (Hisab al-Jummal) and Pythagorean life-path analysis for reflective personal insight.',
      ur: 'روایتی مشرقی علمِ ابجد (حساب الجمل) اور پیدائشی اعداد پر مبنی فکری مطالعہ۔',
      ar: 'دراسة تراثية في حساب الجُمَّل (الأبجد) وأرقام المسار الشخصي للتأمل الثقافي.',
    },
    heroLead: {
      en: 'Transparent letter-by-letter Abjad calculation and classical numerological frameworks—free from mystification.',
      ur: 'ہر حرف کی واضح عددی تفصیل کے ساتھ علمِ ابجد اور اعداد کا شفاف اور باوقار مطالعہ۔',
      ar: 'حساب شفاف لحروف الأبجدية وقيمها العددية في التراث الشرقي مع عرض رياضي واضح.',
    },
    introduction: [
      {
        en: 'Ilm-ul-Adad and Hisab al-Jummal (Abjad numerals) have a rich literary and cultural heritage across Persian, Arabic, and South Asian scholarship—historically used for chronograms, poetry, and symbolic reflection.',
        ur: 'علمِ اعداد اور حساب الجمل (ابجد) عربی، فارسی اور جنوبی ایشیائی علمی و ادبی روایت کا ایک قدیم حصہ رہے ہیں جنہیں تاریخ گوئی اور روایتی عددی مطالعے میں استعمال کیا جاتا رہا ہے۔',
        ar: 'يمتلك حساب الجُمَّل إرثاً أدبياً وتاريخياً عريقاً في الثقافة العربية والإسلامية، وقد استُخدم في التأريخ الشعري والدراسات الرمزية.',
      },
    ],
    pillars: [
      {
        title: { en: 'Eastern Abjad (Hisab al-Jummal)', ur: 'مشرقی علمِ ابجد (حساب الجمل)', ar: 'حساب الجُمَّل المشرقي' },
        description: {
          en: 'Authentic numerical breakdown of Urdu and Arabic script names using classical Abjad letter values.',
          ur: 'اردو اور عربی ناموں کے حروف کا کلاسیکی ابجد جدول کے مطابق درست اور شفاف حساب۔',
          ar: 'تفصيل دقيق لقيمة كل حرف عربي أو أردي وفق جدول الجُمَّل الكلاسيكي.',
        },
      },
      {
        title: { en: 'Pythagorean Life Path & Expression', ur: 'تاریخِ پیدائش اور نام کے اعداد', ar: 'رقم المسار وتوافق الأسماء' },
        description: {
          en: 'Explore birth-date digit reduction and traditional numeric temperaments alongside our free interactive calculators.',
          ur: 'تاریخِ پیدائش کے مفرد اعداد اور نام کی ہم آہنگی کا تفصیلی مطالعہ۔',
          ar: 'استكشف حساب تاريخ الميلاد والسمات الرمزية عبر أدواتنا التفاعلية المجانية.',
        },
      },
      {
        title: { en: 'Baby Name & Business Naming Reflection', ur: 'بچوں اور کاروبار کے ناموں پر مشاورت', ar: 'التأمل في اختيار الأسماء' },
        description: {
          en: 'Combine linguistic beauty, authentic Arabic/Urdu meaning, and classical Abjad considerations thoughtfully.',
          ur: 'بچوں یا کاروبار کے لیے بامعنی، خوبصورت عربی و اردو ناموں کے انتخاب میں رہنمائی۔',
          ar: 'مراعاة المعنى اللغوي الجميل والأصالة الثقافية عند اختيار أسماء المواليد أو المشاريع.',
        },
      },
    ],
    processSteps: [
      { en: 'Try our free Abjad & Life Path calculators or share names in Urdu/Arabic script.', ur: 'ہمارا مفت ابجد کیلکولیٹر استعمال کریں یا اردو/عربی املا کے ساتھ نام فراہم کریں۔', ar: 'جرب حاسبة الأبجد المجانية أو شارك الأسماء بالرسم العربي الصحيح.' },
      { en: 'Review linguistic meanings alongside traditional numerical patterns.', ur: 'ناموں کے لغوی معانی اور روایتی عددی پہلوؤں کا مشترکہ جائزہ لیں۔', ar: 'راجع المعاني اللغوية إلى جانب القراءات العددية التراثية.' },
      { en: 'Decide thoughtfully without superstition or fear.', ur: 'بغیر کسی وہم یا خوف کے اطمینان سے فیصلہ کریں۔', ar: 'اتخذ قرارك بوعي واطمئنان بعيداً عن التطير.' },
    ],
    ethicalBoundary: {
      en: 'Numerology and Abjad are traditional cultural systems, not Islamic religious mandates or scientific predictors of fortune.',
      ur: 'علمِ اعداد اور ابجد روایتی ثقافتی مطالعہ ہے، اسے نہ شرعی حکم سمجھا جائے اور نہ ہی قسمت کا یقینی پیمانہ۔',
      ar: 'علم الأعداد وحساب الجُمَّل دراسة ثقافية وتراثية وليست حكماً شرعياً ولا أداة تنبؤ علمية.',
    },
    relatedSlugs: ['astrology', 'marriage-relationship-guidance', 'spiritual-consultation'],
    faqs: [
      {
        question: { en: 'Should I enter names in Urdu/Arabic or English for Abjad?', ur: 'ابجد کے حساب کے لیے نام اردو/عربی میں لکھنا بہتر ہے یا انگریزی میں؟', ar: 'هل الأفضل إدخال الاسم بالعربية أم الإنجليزية لحساب الأبجد؟' },
        answer: {
          en: 'Entering the exact Arabic or Urdu spelling produces the authentic classical Abjad sum, because English transliteration omits distinctions between letters like س، ص، ث or ت، ط.',
          ur: 'درست حساب کے لیے نام کا اصل اردو یا عربی املا بہترین ہے، کیونکہ انگریزی حروف میں س/ص/ث یا ت/ط کا فرق واضح نہیں رہتا۔',
          ar: 'إدخال الاسم بالرسم العربي أو الأردي الأصلي يعطي الحساب الدقيق لأن الحروف اللاتينية لا تميز بين الحروف المتقاربة صوتياً.',
        },
      },
    ],
  },
  {
    slug: 'marriage-relationship-guidance',
    order: '08',
    domain: 'counseling',
    image: ASSETS.marriageGuidance,
    imagePosition: 'center center',
    title: {
      en: 'Marriage & Relationship Guidance',
      ur: 'ازدواجی اور رشتوں کی رہنمائی',
      ar: 'إرشاد الزواج والعلاقات الأسرية',
    },
    shortDescription: {
      en: 'Confidential, culturally sensitive relationship counselling for couples and individuals across Pakistan and the diaspora.',
      ur: 'پاکستان اور بیرونِ ملک مقیم جوڑوں اور افراد کے لیے ثقافتی حساسیت اور رازداری کے ساتھ ازدواجی رہنمائی۔',
      ar: 'إرشاد سري ومتفهم ثقافياً للأزواج والأفراد في باكستان والمهجر.',
    },
    heroLead: {
      en: 'Practical communication guidance paired with respect for Pakistani family values, Islamic etiquette, and international diaspora realities.',
      ur: 'پاکستانی خاندانی اقدار، اسلامی آداب اور بیرونِ ملک زندگی کے تقاضوں کو سمجھتے ہوئے پرسکون ازدواجی مشاورت۔',
      ar: 'حوار بنّاء يراعي القيم الأسرية والآداب الإسلامية وواقع الحياة العصرية في المهجر.',
    },
    introduction: [
      {
        en: 'Long-distance sponsorships, navigating in-law expectations across continents, or rebuilding trust after misunderstandings requires a listener who genuinely understands both South Asian family culture and modern life in the UK, Europe, North America, Australia, or the Gulf.',
        ur: 'ویزا اور طویل فاصلوں کے مسائل، مشترکہ خاندان کی توقعات، یا باہمی غلط فہمیوں کو سلجھانے کے لیے ایسے مشیر کی ضرورت ہوتی ہے جو پاکستانی ثقافت اور بیرونِ ملک جدید زندگی دونوں کو گہرائی سے سمجھتا ہو۔',
        ar: 'تتطلب تحديات الزواج العابر للحدود والتوازن بين الأسرة الممتدة والحياة العملية في المهجر مستمعاً يفهم الخلفية الثقافية بعمق.',
      },
    ],
    pillars: [
      {
        title: { en: 'Pre-Marital Readiness', ur: 'شادی سے قبل تیاری اور مکالمہ', ar: 'التهيئة قبل الزواج' },
        description: {
          en: 'Clarify expectations around finances, relocation, family boundaries, and shared household roles before marriage.',
          ur: 'شادی سے پہلے مالی ذمہ داریوں، رہائش، خاندانی حدود اور باہمی توقعات پر کھل کر غور۔',
          ar: 'مناقشة التوقعات العملية والأسرية بوضوح قبل الارتباط.',
        },
      },
      {
        title: { en: 'Rebuilding Mutual Communication', ur: 'باہمی گفتگو اور اعتماد کی بحالی', ar: 'ترميم التواصل والثقة' },
        description: {
          en: 'Constructive conflict de-escalation frameworks that honor dignity, patience, and emotional safety.',
          ur: 'وقار، صبر اور احترام کے ساتھ باہمی اختلافات کم کرنے کے عملی طریقے۔',
          ar: 'أدوات عملية لتهدئة الخلافات وتعزيز الاحترام المتبادل.',
        },
      },
      {
        title: { en: 'Female & Male Specialist Options', ur: 'خواتین اور مرد ماہرین کا انتخاب', ar: 'خيارات مختصين ومختصات' },
        description: {
          en: 'Choose a specialist with whom you feel most comfortable speaking privately.',
          ur: 'اپنی سہولت اور اطمینان کے مطابق خاتون یا مرد مشیر کا انتخاب کریں۔',
          ar: 'اختر المختص أو المختصة الأنسب لراحتك وخصوصيتك.',
        },
      },
    ],
    processSteps: [
      { en: 'Select a relationship guidance specialist and your preferred language.', ur: 'اپنی پسندیدہ زبان اور متعلقہ مشیر کا انتخاب کریں۔', ar: 'اختر مختص الإرشاد الأسري ولغتك المفضلة.' },
      { en: 'Schedule a private WhatsApp or phone session at a quiet time in your time zone.', ur: 'اپنے مقامی وقت کے مطابق پرسکون ماحول میں واٹس ایپ یا فون سیشن بُک کریں۔', ar: 'حدد جلسة خاصة في وقت هادئ ضمن منطقتك الزمنية.' },
      { en: 'Leave with actionable communication steps and respectful follow-up options.', ur: 'عملی گفتگو کے نکات اور بہتر مفاہمت کے واضح راستے کے ساتھ سیشن مکمل کریں۔', ar: 'اخرج بخطوات عملية واضحة لتحسين الحوار الأسري.' },
    ],
    ethicalBoundary: {
      en: 'Guidance supports constructive communication and emotional reflection. It does not guarantee resolving every marital dispute and does not replace legal advice or emergency domestic safety services.',
      ur: 'مشاورت مثبت گفتگو اور سمجھ بوجھ میں مدد دیتی ہے، تاہم یہ ہر مسئلے کے یقینی حل کی ضمانت یا قانونی مشورے کا متبادل نہیں ہے۔',
      ar: 'تهدف الجلسات إلى دعم الحوار الإيجابي ولا تضمن حل كل خلاف ولا تغني عن الاستشارة القانونية أو خدمات الطوارئ.',
    },
    relatedSlugs: ['family-guidance', 'marriage-istikhara', 'spiritual-consultation'],
    faqs: [
      {
        question: { en: 'Can my spouse join the session from another country?', ur: 'کیا میرا شریکِ حیات دوسرے ملک سے سیشن میں شامل ہو سکتا ہے؟', ar: 'هل يمكن للطرف الآخر الانضمام من دولة أخرى؟' },
        answer: {
          en: 'Yes. Joint sessions via group voice call or WhatsApp call can be arranged by noting both participants\' time zones in your appointment request.',
          ur: 'جی ہاں، اپائنٹمنٹ کی درخواست میں دونوں ممالک کے اوقات درج کر کے مشترکہ کال کا اہتمام کیا جا سکتا ہے۔',
          ar: 'نعم، يمكن ترتيب جلسة مشتركة عبر مكالمة جماعية بعد توضيح المنطقة الزمنية للطرفين.',
        },
      },
    ],
  },
  {
    slug: 'family-guidance',
    order: '09',
    domain: 'counseling',
    image: ASSETS.familyGuidance,
    imagePosition: 'center center',
    title: {
      en: 'Family Guidance',
      ur: 'خاندانی اور گھریلو رہنمائی',
      ar: 'الإرشاد الأسري والتربوي',
    },
    shortDescription: {
      en: 'Thoughtful guidance for intergenerational harmony, parenting abroad, and household peace.',
      ur: 'بیرونِ ملک بچوں کی تربیت، والدین و اولاد کے تعلقات اور گھریلو امن کے لیے باوقار رہنمائی۔',
      ar: 'دعم متزن للوئام بين الأجيال وتربية الأبناء في المهجر واستقرار البيت.',
    },
    heroLead: {
      en: 'Bridging generational values between parents and children growing up across the UK, Europe, North America, Australia, the Gulf, and Pakistan.',
      ur: 'پاکستان اور بیرونِ ملک پرورش پانے والی نئی نسل اور والدین کے درمیان احترام، محبت اور افہام و تفہیم کا پل۔',
      ar: 'تعزيز التفاهم بين الوالدين والأبناء عبر الثقافات والأجيال بروح من المودة والاحترام.',
    },
    introduction: [
      {
        en: 'Raising children abroad while preserving faith, warmth, and open family communication brings unique joys and challenges. Our Family Guidance sessions provide a confidential space to reflect on parenting, elder care across borders, and family harmony.',
        ur: 'دیارِ غیر میں دینی و اخلاقی اقدار، خاندانی محبت اور کھلی گفتگو کو برقرار رکھتے ہوئے بچوں کی تربیت ایک اہم ذمہ داری ہے۔ ہماری خاندانی رہنمائی والدین اور اہلِ خانہ کو پرسکون مشاورت فراہم کرتی ہے۔',
        ar: 'تقدم جلسات الإرشاد الأسري مساحة آمنة لمناقشة تحديات التربية في المهجر وبر الوالدين والوئام داخل البيت.',
      },
    ],
    pillars: [
      {
        title: { en: 'Intergenerational Dialogue', ur: 'والدین اور نوجوان نسل میں ہم آہنگی', ar: 'الحوار بين الأجيال' },
        description: {
          en: 'Practical ways for parents and young adults to listen deeply without cultural friction.',
          ur: 'ثقافتی کشیدگی کے بغیر والدین اور نوجوان بچوں کے درمیان اعتماد اور مکالمہ قائم کرنے کے طریقے۔',
          ar: 'أساليب عملية لتقريب وجهات النظر بين الوالدين والأبناء الشباب.',
        },
      },
      {
        title: { en: 'Household Peace & Boundaries', ur: 'گھریلو سکون اور متوازن حدود', ar: 'سكينة المنزل والحدود الصحية' },
        description: {
          en: 'Navigate extended family dynamics with respect, fairness, and emotional steadiness.',
          ur: 'مشترکہ خاندانی معاملات میں انصاف، احترام اور ذہنی سکون برقرار رکھنے کی رہنمائی۔',
          ar: 'إدارة علاقات الأسرة الممتدة بعدل ولطف وتوازن.',
        },
      },
      {
        title: { en: 'Faith-Rooted Values Abroad', ur: 'بیرونِ ملک اقدار کا تحفظ', ar: 'ترسيخ القيم في المهجر' },
        description: {
          en: 'Encourage positive cultural and spiritual identity in children without harshness.',
          ur: 'سختی کے بجائے محبت اور حکمت کے ساتھ بچوں میں مثبت دینی اور ثقافتی شناخت کا فروغ۔',
          ar: 'غرس الهوية الإيجابية والقيم الأخلاقية لدى الأبناء بالحكمة والرفق.',
        },
      },
    ],
    processSteps: [
      { en: 'Request a confidential session tailored to parents, couples, or individuals.', ur: 'والدین، جوڑوں یا انفرادی طور پر خفیہ مشاورت کی درخواست دیں۔', ar: 'اطلب جلسة سرية للوالدين أو الأسرة.' },
      { en: 'Explore family dynamics calmly with a culturally fluent specialist.', ur: 'ثقافتی آگاہی رکھنے والے مشیر کے ساتھ گھریلو معاملات کا پرسکون جائزہ لیں۔', ar: 'ناقش تفاصيل الأسرة مع مختص يفهم السياق الثقافي.' },
      { en: 'Apply practical habits that foster calm and mutual respect at home.', ur: 'گھر میں امن اور باہمی عزت بڑھانے کے عملی اصول اپنائیں۔', ar: 'طبّق خطوات عملية تعزز الهدوء والاحترام داخل المنزل.' },
    ],
    ethicalBoundary: {
      en: 'Family guidance is educational and supportive in nature. For clinical mental health conditions or safeguarding concerns, please consult licensed professionals in your country of residence.',
      ur: 'خاندانی رہنمائی تعلیمی اور مشاورتی نوعیت کی ہے۔ سنگین نفسیاتی یا قانونی معاملات میں اپنے ملک کے مستند ماہرین سے رجوع کریں۔',
      ar: 'الإرشاد الأسري توجيهي وداعم ولا يغني عن الرعاية النفسية الإكلينيكية أو الخدمات القانونية في بلد إقامتك.',
    },
    relatedSlugs: ['marriage-relationship-guidance', 'spiritual-consultation', 'dua-and-wazifa'],
    faqs: [
      {
        question: { en: 'Is everything discussed kept strictly confidential?', ur: 'کیا سیشن میں ہونے والی تمام گفتگو مکمل طور پر خفیہ رکھی جاتی ہے؟', ar: 'هل تُحفظ جميع تفاصيل الجلسة بسرية تامة؟' },
        answer: {
          en: 'Yes. Client privacy is a foundational rule of ASTROTALK PK; personal details and session discussions are never shared publicly or with third parties.',
          ur: 'جی ہاں۔ صارف کی رازداری ہمارا بنیادی اصول ہے اور کسی بھی ذاتی گفتگو کو کبھی تیسرے فریق کے ساتھ شیئر نہیں کیا جاتا۔',
          ar: 'نعم، السرية التامة مبدأ أساسي ولا تُشارك بيانات العملاء أو تفاصيل الجلسات مع أي طرف ثالث.',
        },
      },
    ],
  },
  {
    slug: 'spiritual-consultation',
    order: '10',
    domain: 'islamic-spiritual',
    image: ASSETS.counsel,
    imagePosition: 'center center',
    title: {
      en: 'Spiritual Consultation',
      ur: 'عمومی روحانی مشاورت',
      ar: 'الاستشارة الروحية العامة',
    },
    shortDescription: {
      en: 'One-to-one reflective spiritual consultations to help you find inner stillness, ethical direction, and clarity.',
      ur: 'قلبی سکون، اخلاقی سمت اور زندگی کے اہم موڑ پر باوقار انفرادی روحانی مشاورت۔',
      ar: 'جلسات إرشاد روحي فردية لتعزيز الطمأنينة والوضوح الداخلي واتخاذ قرارات متزنة.',
    },
    heroLead: {
      en: 'A quiet, private consultation space when you are unsure which discipline fits best—offering respectful listening and structured direction.',
      ur: 'جب آپ کو معلوم نہ ہو کہ کون سا شعبہ سب سے موزوں ہے تو پرسکون سماعت اور واضح سمت کے لیے انفرادی روحانی مشاورت۔',
      ar: 'مساحة استشارية هادئة ومخصصة تساعدك على ترتيب أولوياتك الروحية والشخصية بكل احترام ووضوح.',
    },
    introduction: [
      {
        en: 'Life transitions—relocating abroad, grief, career uncertainty, or feeling spiritually disconnected—often call for a grounded conversation rather than quick labels. Our general Spiritual Consultation connects you with an experienced specialist for unhurried, respectful dialogue.',
        ur: 'بیرونِ ملک منتقلی، کسی عزیز کی جدائی، پیشہ ورانہ الجھن یا روحانی بے چینی کے لمحات میں جلد بازی کے بجائے ایک سنجیدہ اور پرسکون گفتگو کی ضرورت ہوتی ہے۔ ہماری روحانی مشاورت آپ کو یہی باوقار ماحول فراہم کرتی ہے۔',
        ar: 'تتطلب مراحل الانتقال في الحياة أو الشعور بالتشتت الروحي حواراً هادئاً ومتأنياً بعيداً عن الأحكام المتسرعة.',
      },
    ],
    pillars: [
      {
        title: { en: 'Unhurried Private Dialogue', ur: 'پرسکون اور بلا عجلت گفتگو', ar: 'حوار خاص وهادئ' },
        description: {
          en: 'Dedicated session time to articulate what weighs on your mind in English, Urdu, or Arabic.',
          ur: 'انگریزی، اردو یا عربی میں بلا جھجھک اپنے دل کی بات بیان کرنے کے لیے مکمل وقت۔',
          ar: 'وقت مخصص للتعبير بأريحية عما يشغلك باللغة التي ترتاح لها.',
        },
      },
      {
        title: { en: 'Clarity on Next Steps', ur: 'اگلے قدم کی واضح سمت', ar: 'وضوح الخطوات التالية' },
        description: {
          en: 'Identify whether Sunnah-based practices, family counselling, or practical planning will best serve your current season.',
          ur: 'اس بات کا تعین کہ آپ کے موجودہ حالات میں مسنون اذکار، خاندانی مشاورت یا عملی منصوبہ بندی میں سے کیا بہتر رہے گا۔',
          ar: 'تحديد المسار الأنسب لك سواء عبر الأوراد المأثورة أو الإرشاد الأسري أو التخطيط العملي.',
        },
      },
      {
        title: { en: 'Zero Pressure, Full Transparency', ur: 'بغیر کسی دباؤ کے مکمل شفافیت', ar: 'شفافية كاملة دون أي ضغط' },
        description: {
          en: 'No upselling of costly remedies or recurring rituals—just honest, grounded guidance.',
          ur: 'مہنگے عملیات یا غیر ضروری اخراجات کے بجائے صرف دیانتدارانہ اور سچی رہنمائی۔',
          ar: 'لا تسويق لطقوس مكلفة ولا وعود مبالغ فيها، بل توجيه صادق ومتزن.',
        },
      },
    ],
    processSteps: [
      { en: 'Choose your preferred language and consultation method.', ur: 'اپنی پسندیدہ زبان اور رابطے کا ذریعہ منتخب کریں۔', ar: 'اختر اللغة وقناة التواصل المفضلة.' },
      { en: 'Confirm your appointment time in your local time zone.', ur: 'اپنے مقامی ٹائم زون کے مطابق وقت مقرر کریں۔', ar: 'أكد موعدك وفق منطقتك الزمنية.' },
      { en: 'Speak privately with a calm, experienced specialist.', ur: 'تجربہ کار ماہر کے ساتھ رازداری میں گفتگو کریں۔', ar: 'تحدث بخصوصية مع مختص ذي خبرة ووقار.' },
    ],
    ethicalBoundary: {
      en: 'Spiritual consultations offer calm perspective and faith-informed reflection. They do not promise miraculous outcomes or replace professional healthcare.',
      ur: 'روحانی مشاورت قلبی سکون اور مثبت رہنمائی کے لیے ہے؛ یہ معجزاتی ضمانت یا طبی علاج کا متبادل نہیں ہے۔',
      ar: 'الاستشارات الروحية تقدم منظوراً هادئاً وتأملاً إيمانياً ولا تعد بمعجزات ولا تغني عن الرعاية الصحية.',
    },
    relatedSlugs: ['rohani-ilaj', 'online-istikhara', 'family-guidance'],
    faqs: [
      {
        question: { en: 'How long is a typical consultation session?', ur: 'ایک عام مشاورتی سیشن کتنے وقت کا ہوتا ہے؟', ar: 'كم تستغرق جلسة الاستشارة عادةً؟' },
        answer: {
          en: 'Standard sessions are structured for 30 to 45 minutes, clearly listed along with the configured base fee on each specialist profile before booking.',
          ur: 'عموماً ایک سیشن ۳۰ سے ۴۵ منٹ کا ہوتا ہے، جس کی مکمل تفصیل اور بنیادی فیس ہر ماہر کے پروفائل پر پہلے سے درج ہوتی ہے۔',
          ar: 'تتراوح الجلسة القياسية بين 30 و45 دقيقة، وتُعرض مدتها ورسومها الأساسية بوضوح في ملف كل خبير قبل الحجز.',
        },
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
