import type { KnowledgeArticle, ToolDefinition } from '../types';
import { ASSETS } from './services';

export const TOOLS_CATALOG: ToolDefinition[] = [
  {
    slug: 'birth-chart',
    category: 'astronomy',
    title: {
      en: 'Birth Chart Generator',
      ur: 'مفت پیدائشی زائچہ (Birth Chart)',
      ar: 'مولّد خريطة الميلاد الفلكية',
    },
    shortDescription: {
      en: 'Calculate Sun, Moon, Rising Sign, and 10 planetary ecliptic longitudes using real astronomical ephemeris formulas.',
      ur: 'حقیقی فلکیاتی فارمولوں کے ذریعے سورج، چاند، طالع اور دس سیاروں کے درست درجات معلوم کریں۔',
      ar: 'احسب مواقع الشمس والقمر والطالع والكواكب العشرة باستخدام معادلات فلكية حقيقية.',
    },
    methodologyNote: {
      en: 'Powered by VSOP87/ELP2000 astronomical calculations (astronomy-engine). Birth details stay strictly in your browser and are never stored publicly.',
      ur: 'یہ حساب کتاب حقیقی فلکیاتی انجن پر مبنی ہے۔ آپ کی تاریخِ پیدائش صرف آپ کے براؤزر میں رہتی ہے اور کہیں شائع نہیں ہوتی۔',
      ar: 'يعتمد على حسابات فلكية دقيقة (VSOP87) داخل متصفحك فقط مع حفظ تام للخصوصية.',
    },
  },
  {
    slug: 'sun-sign',
    category: 'astronomy',
    title: {
      en: 'Sun Sign Calculator',
      ur: 'برجِ شمس (Sun Sign) کیلکولیٹر',
      ar: 'حاسبة البرج الشمسي',
    },
    shortDescription: {
      en: 'Determine exact solar longitude—especially helpful for cusp birth dates where approximate calendar tables can differ.',
      ur: 'سورج کا درست فلکیاتی درجہ معلوم کریں—خاص طور پر سرحدی تاریخوں (Cusp Dates) کے لیے نہایت مفید۔',
      ar: 'تحديد دقيق لموقع الشمس الفلكي خاصة لمواليد التواريخ الحدية بين برجين.',
    },
    methodologyNote: {
      en: 'Computes true apparent geocentric solar ecliptic longitude for your chosen date and UTC offset.',
      ur: 'منتخب تاریخ کے مطابق سورج کا حقیقی فلکیاتی طول البلد شمار کیا جاتا ہے۔',
      ar: 'يحسب الطول السماوي الحقيقي للشمس في تاريخ ووقت ميلادك.',
    },
  },
  {
    slug: 'moon-sign',
    category: 'astronomy',
    title: {
      en: 'Moon Sign Calculator',
      ur: 'برجِ قمر (Moon Sign) کیلکولیٹر',
      ar: 'حاسبة البرج القمري',
    },
    shortDescription: {
      en: 'Calculate the Moon\'s exact zodiac sign and illumination phase on the day and hour you were born.',
      ur: 'پیدائش کے دن اور وقت پر چاند کا درست برج اور چاند کی منزل شمار کریں۔',
      ar: 'احسب برج القمر الدقيق وطور القمر يوم وساعة ميلادك.',
    },
    methodologyNote: {
      en: 'The Moon moves ~13° per day; providing an accurate birth hour ensures precise lunar sign calculation.',
      ur: 'چاند روزانہ تقریباً ۱۳ درجے حرکت کرتا ہے؛ درست گھنٹہ درج کرنے سے نتیجہ زیادہ مستند ہوتا ہے۔',
      ar: 'يتحرك القمر نحو 13 درجة يومياً؛ لذا فإن تحديد ساعة الميلاد يمنح نتيجة أدق.',
    },
  },
  {
    slug: 'rising-sign',
    category: 'astronomy',
    title: {
      en: 'Rising Sign (Ascendant) Calculator',
      ur: 'برجِ طالع (Rising Sign) کیلکولیٹر',
      ar: 'حاسبة البرج الطالع',
    },
    shortDescription: {
      en: 'Compute the zodiac sign ascending on the eastern horizon from your birth time, latitude, and longitude.',
      ur: 'پیدائش کے وقت اور شہر کے جغرافیائی عرض و طول البلد سے مشرقی افق پر طلوع ہونے والا برج معلوم کریں۔',
      ar: 'احسب البرج الصاعد في الأفق الشرقي اعتماداً على وقت ومدينة الميلاد.',
    },
    methodologyNote: {
      en: 'Uses Greenwich Apparent Sidereal Time (GAST), city latitude/longitude, and mean ecliptic obliquity.',
      ur: 'گرین وچ سیڈیریل ٹائم اور شہر کے درست عرض و طول البلد کی بنیاد پر شمار کیا جاتا ہے۔',
      ar: 'يُحسب عبر الزمن النجمي وإحداثيات مدينة الميلاد وميل دائرة البروج.',
    },
  },
  {
    slug: 'abjad-numerology',
    category: 'numerology',
    title: {
      en: 'Abjad Calculator (Hisab al-Jummal)',
      ur: 'علمِ ابجد کیلکولیٹر (حساب الجمل)',
      ar: 'حاسبة الجُمَّل (الأبجد)',
    },
    shortDescription: {
      en: 'Letter-by-letter Eastern Abjad calculation supporting Urdu, Arabic, and phonetic Latin transliteration.',
      ur: 'اردو، عربی اور انگریزی ناموں کے ہر حرف کی واضح تفصیل کے ساتھ کلاسیکی ابجد کیلکولیٹر۔',
      ar: 'حساب تفصيلي حرفاً بحرف وفق جدول الجُمَّل المشرقي للأسماء العربية والأردية.',
    },
    methodologyNote: {
      en: 'Uses classical Eastern Abjad values (ا=1 through غ=1000). Enter Arabic or Urdu script for exact traditional totals.',
      ur: 'کلاسیکی مشرقی ابجد جدول (الف=۱ تا غین=۱۰۰۰) استعمال ہوتا ہے۔ درست نتائج کے لیے اردو یا عربی املا درج کریں۔',
      ar: 'يعتمد جدول الجُمَّل المشرقي الأصلي (أ=1 حتى غ=1000).',
    },
  },
  {
    slug: 'life-path',
    category: 'numerology',
    title: {
      en: 'Life Path Number Calculator',
      ur: 'لائف پاتھ نمبر (علمِ اعداد)',
      ar: 'حاسبة رقم المسار الشخصي',
    },
    shortDescription: {
      en: 'Transparent step-by-step Pythagorean birth-date reduction showing year, month, day sums, and master numbers.',
      ur: 'سال، مہینے اور دن کے اعداد کی واضح تفصیل کے ساتھ پیدائشی عدد معلوم کریں۔',
      ar: 'تفصيل حسابي شفاف لجمع أرقام السنة والشهر واليوم واستخراج رقم المسار.',
    },
    methodologyNote: {
      en: 'Applies classical Pythagorean digit reduction preserving Master Numbers 11, 22, and 33.',
      ur: 'کلاسیکی عددی طریقے کے مطابق مفرد عدد اور ماسٹر نمبرز (۱۱، ۲۲، ۳۳) کی شناخت کی جاتی ہے۔',
      ar: 'يستخدم الاختزال العددي الكلاسيكي مع إظهار الأرقام الرئيسية 11 و22 و33.',
    },
  },
  {
    slug: 'name-compatibility',
    category: 'numerology',
    title: {
      en: 'Name Compatibility Calculator',
      ur: 'ناموں کی عددی ہم آہنگی',
      ar: 'توافق الأسماء العددي',
    },
    shortDescription: {
      en: 'Compare two names using classical numeric harmony patterns as a lighthearted cultural reflection tool.',
      ur: 'روایتی عددی اصولوں کے تحت دو ناموں کی ہم آہنگی کا جائزہ لیں۔',
      ar: 'مقارنة رمزية بين اسمين وفق التوافقات العددية الكلاسيكية.',
    },
    methodologyNote: {
      en: 'Reflective cultural numerology only—never a substitute for character verification, family counsel, or Istikhara.',
      ur: 'یہ محض ایک روایتی عددی مشاہدہ ہے؛ رشتے کے فیصلے ہمیشہ کردار، مشورے اور استخارہ کی بنیاد پر کریں۔',
      ar: 'للتأمل الثقافي فقط ولا يُعتمد عليه في قرارات الزواج التي تقوم على الخلق والتكافؤ والاستخارة.',
    },
  },
  {
    slug: 'zodiac-compatibility',
    category: 'astronomy',
    title: {
      en: 'Zodiac Compatibility Explorer',
      ur: 'بروج کی باہمی مطابقت',
      ar: 'توافق الأبراج الفلكية',
    },
    shortDescription: {
      en: 'Explore elemental harmony (Fire, Earth, Air, Water) and modality dynamics between any two zodiac signs.',
      ur: 'آتشی، خاکی، بادی اور آبی عناصر کی بنیاد پر دو بروج کے روایتی مزاج اور ہم آہنگی کو سمجھیں۔',
      ar: 'استكشف التفاعل العنصري (ناري، ترابي، هوائي، مائي) بين أي برجين.',
    },
    methodologyNote: {
      en: 'Compares classical astrological elements and modalities as an educational reference.',
      ur: 'کلاسیکی عناصر اور بروج کی اقسام کا تعلیمی و معلوماتی موازنہ پیش کیا جاتا ہے۔',
      ar: 'يقارن العناصر والطبائع الفلكية الكلاسيكية كمرجع تعليمي.',
    },
  },
  {
    slug: 'hijri-calendar',
    category: 'calendar',
    title: {
      en: 'Hijri Calendar Converter',
      ur: 'ہجری اور عیسوی کیلنڈر',
      ar: 'محوّل التقويم الهجري (أم القرى)',
    },
    shortDescription: {
      en: 'Convert any Gregorian date into the Islamic Umm al-Qura Hijri date alongside real lunar illumination.',
      ur: 'کسی بھی عیسوی تاریخ کو ام القریٰ ہجری تاریخ اور چاند کی اصل روشنی کے ساتھ دیکھیں۔',
      ar: 'حوّل أي تاريخ ميلادي إلى تقويم أم القرى الهجري مع نسبة إضاءة القمر الفلكية.',
    },
    methodologyNote: {
      en: 'Uses the international Umm al-Qura calendar standard; actual local crescent sighting may vary by ±1 day by region.',
      ur: 'ام القریٰ کیلنڈر معیار استعمال کیا گیا ہے؛ مقامی رویتِ ہلال کے مطابق ایک دن کا فرق ممکن ہے۔',
      ar: 'يعتمد تقويم أم القرى الرسمي، وقد تختلف الرؤية المحلية للهلال بيوم واحد حسب المنطقة.',
    },
  },
  {
    slug: 'moon-phase',
    category: 'calendar',
    title: {
      en: 'Moon Phase Calendar',
      ur: 'چاند کی منازل کا کیلنڈر',
      ar: 'تقويم أطوار ومنازل القمر',
    },
    shortDescription: {
      en: 'View real-time lunar illumination and the next eight exact astronomical New, Quarter, and Full Moon timestamps.',
      ur: 'چاند کی موجودہ روشنی اور آئندہ آٹھ نئے چاند، تربیع اور بدر کے درست فلکیاتی اوقات دیکھیں۔',
      ar: 'استعرض إضاءة القمر الحالية والتواريخ الفلكية الدقيقة للأطوار الثمانية القادمة.',
    },
    methodologyNote: {
      en: 'Calculated directly from lunar orbital mechanics via astronomy-engine in UTC and your browser local time.',
      ur: 'فلکیاتی حساب کتاب کے ذریعے UTC اور آپ کے مقامی وقت میں درست منازلِ قمر دکھائی جاتی ہیں۔',
      ar: 'محسوبة مباشرة عبر المعادلات المدارية للقمر بتوقيت UTC وتوقيتك المحلي.',
    },
  },
];

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    slug: 'understanding-salat-al-istikhara',
    category: 'istikhara',
    categoryLabel: { en: 'Istikhara Education', ur: 'تعلیمِ استخارہ', ar: 'فقه الاستخارة' },
    title: {
      en: 'Understanding Salat al-Istikhara: Separating Sunnah Clarity from Common Myths',
      ur: 'صلوٰۃ الاستخارہ کا صحیح مفہوم: سنتِ نبوی اور عام غلط فہمیوں میں فرق',
      ar: 'فهم صلاة الاستخارة: التمييز بين الهدي النبوي والمفاهيم الشائعة',
    },
    excerpt: {
      en: 'Why authentic Istikhara does not depend on seeing coloured dreams—and how pairing Dua with practical Mashwara brings serenity.',
      ur: 'مسنون استخارہ مخصوص خوابوں کا محتاج کیوں نہیں، اور دعا کے ساتھ مشورہ کیسے سکون عطا کرتا ہے۔',
      ar: 'لماذا لا تشترط الاستخارة الصحيحة رؤية منامات معينة، وكيف يجمع المسلم بين الدعاء والمشورة.',
    },
    readMinutes: 6,
    updatedDate: 'November 2026',
    image: ASSETS.istikhara,
    relatedServiceSlug: 'online-istikhara',
    sections: [
      {
        heading: { en: 'What the Sunnah Actually Teaches', ur: 'سنتِ نبویؐ کی اصل تعلیم کیا ہے؟', ar: 'ما الذي تعلّمه السنة النبوية فعلاً؟' },
        body: {
          en: 'Jabir ibn Abdullah (may Allah be pleased with him) reported that the Prophet (peace be upon him) used to teach the companions Istikhara in all matters just as he taught them a Surah of the Quran. The practice consists of two voluntary rak\'ahs followed by the comprehensive supplication asking Allah to facilitate the decision if it holds goodness for one\'s faith, livelihood, and ultimate outcome—or to turn it away gently if not.',
          ur: 'حضرت جابر بن عبداللہ رضی اللہ عنہ سے روایت ہے کہ نبی کریم ﷺ صحابہ کرام کو تمام معاملات میں استخارہ اسی اہتمام سے سکھاتے تھے جیسے قرآن کی کوئی سورت سکھاتے ہوں۔ اس کا مسنون طریقہ دو رکعت نفل کے بعد جامع دعائے استخارہ پڑھنا ہے جس میں اللہ سے دین، دنیا اور انجام کے اعتبار سے خیر مانگی جاتی ہے۔',
          ar: 'عن جابر بن عبد الله رضي الله عنهما قال: كان رسول الله ﷺ يعلمنا الاستخارة في الأمور كلها كما يعلمنا السورة من القرآن؛ وهي ركعتان من غير الفريضة يعقبهما الدعاء المأثور بطلب الخير في الدين والمعاش وعاقبة الأمر.',
        },
      },
      {
        heading: { en: 'Why Dreams Are Not Required', ur: 'خواب آنا کیوں ضروری نہیں؟', ar: 'لماذا لا يُشترط رؤية منام؟' },
        body: {
          en: 'Classical jurists across Islamic traditions emphasize that no authentic narration requires seeing white, green, red, or black colours in a dream. Instead, after performing Istikhara and consulting trustworthy people (Istishara), one proceeds with the best lawful course. Ease in circumstances or clear practical obstacles often serve as the most grounded indicators.',
          ur: 'جید علماء کرام واضح کرتے ہیں کہ کسی صحیح حدیث میں سفید، سبز یا سیاہ خواب دیکھنے کی شرط وارد نہیں ہوئی۔ استخارہ اور بااعتماد لوگوں سے مشورے کے بعد معاملے میں آسانی یا دلی اطمینان ہی سب سے واضح علامت ہے۔',
          ar: 'يؤكد العلماء أنه لا يوجد نص صحيح يشترط رؤية ألوان معينة في المنام، بل يمضي الإنسان بعد الاستخارة والاستشارة، ويكون التيسير أو الصرف العملي علامة التوفيق.',
        },
      },
    ],
  },
  {
    slug: 'astronomy-vs-astrology-clear-distinction',
    category: 'astrology',
    categoryLabel: { en: 'Astrology Education', ur: 'علمِ نجوم کی آگاہی', ar: 'ثقافة فلكية' },
    title: {
      en: 'Astronomical Ephemeris vs. Astrological Interpretation: Why Transparency Matters',
      ur: 'فلکیاتی حساب کتاب بمقابلہ نجومی تعبیر: شفافیت کیوں ضروری ہے؟',
      ar: 'الحساب الفلكي مقابل التفسير التنجيمي: لماذا تهم الشفافية؟',
    },
    excerpt: {
      en: 'How mathematical planetary positions are computed using real orbital mechanics—and why ASTROTALK PK keeps astrology distinct from Islamic creed.',
      ur: 'سیاروں کے درست درجات کیسے شمار کیے جاتے ہیں اور ہم علمِ نجوم کو اسلامی شرعی تعلیمات سے الگ کیوں رکھتے ہیں۔',
      ar: 'كيف تُحسب مواقع الكواكب بالمعادلات المدارية، ولماذا نفصل بين الفلك التراثي والعقيدة الإسلامية.',
    },
    readMinutes: 5,
    updatedDate: 'November 2026',
    image: ASSETS.astrology,
    relatedServiceSlug: 'astrology',
    sections: [
      {
        heading: { en: 'Real Orbital Astronomy', ur: 'حقیقی فلکیاتی حساب کتاب', ar: 'علم الفلك الرياضي الحقيقي' },
        body: {
          en: 'When our Birth Chart or Today\'s Sky panel states that the Sun is at a specific degree or that lunar illumination is a certain percentage, those figures come directly from mathematical ephemeris models (VSOP87 / ELP2000). Anyone with an astronomical almanac can verify those coordinates independently.',
          ur: 'جب ہمارے زائچے یا آج کے فلکیاتی مشاہدات میں سورج یا چاند کا درجہ اور روشنی کا تناسب دکھایا جاتا ہے تو یہ حقیقی سائنسی و ریاضیاتی فارمولوں سے شمار ہوتا ہے جن کی تصدیق کسی بھی فلکیاتی تقویم سے کی جا سکتی ہے۔',
          ar: 'عندما تعرض أدواتنا درجة الشمس أو نسبة إضاءة القمر، فهي أرقام محسوبة مباشرة من نماذج فلكية رياضية يمكن التحقق منها بأي تقويم فلكي.',
        },
      },
      {
        heading: { en: 'Respectful Boundaries with Faith', ur: 'دین اور روایت کے درمیان واضح احترام', ar: 'فصل محترم بين التراث والدين' },
        body: {
          en: 'Astrological symbolism is a cultural and historical interpretive tradition—not empirical science and never a component of Islamic theology. Presenting that boundary openly respects both intellectual honesty and religious integrity.',
          ur: 'نجومی تعبیر ایک تاریخی و ثقافتی روایت ہے—نہ کہ سائنسی حتمیت اور نہ ہی اسلامی شریعت کا حصہ۔ اس فرق کو واضح رکھنا دیانتداری اور دینی احترام دونوں کا تقاضا ہے۔',
          ar: 'التفسير التنجيمي تقليد ثقافي وتاريخي، وليس علماً تجريبياً ولا جزءاً من العقيدة الإسلامية؛ وتوضيح هذا الحد يصون الأمانة العلمية والدينية معاً.',
        },
      },
    ],
  },
  {
    slug: 'authentic-prophetic-protection-ruqyah',
    category: 'islamic-spiritual',
    categoryLabel: { en: 'Islamic Spiritual Guidance', ur: 'اسلامی روحانی رہنمائی', ar: 'الإرشاد الروحي' },
    title: {
      en: 'Calm Spiritual Protection: Authentic Quranic Ruqyah Without Fear or Superstition',
      ur: 'پرسکون شرعی تحفظ: خوف اور وہم کے بغیر مستند قرآنی رقیہ',
      ar: 'التحصين الشرعي الهادئ: الرقية القرآنية الصحيحة بلا تهويل',
    },
    excerpt: {
      en: 'A practical overview of morning and evening Adhkar, self-Ruqyah, and how to safeguard your household peace responsibly.',
      ur: 'صبح و شام کے مسنون اذکار، خود دم کرنے کا طریقہ اور گھریلو سکون کے تحفظ کی ذمہ دارانہ رہنمائی۔',
      ar: 'نظرة عملية على أذكار الصباح والمساء ورقية الإنسان لنفسه لحفظ سكينة البيت.',
    },
    readMinutes: 6,
    updatedDate: 'November 2026',
    image: ASSETS.spiritual,
    relatedServiceSlug: 'rohani-ilaj',
    sections: [
      {
        heading: { en: 'Empowerment Over Dependency', ur: 'انحصار کے بجائے خود اعتمادی', ar: 'التمكين بدلاً من التعلق بالأشخاص' },
        body: {
          en: 'Authentic Islamic spiritual care teaches believers to turn directly to Allah through Surah Al-Fatihah, Ayat al-Kursi, the last two verses of Surah Al-Baqarah, and the three Quls (Al-Ikhlas, Al-Falaq, An-Nas). No intermediary holds exclusive mystical power over Quranic verses.',
          ur: 'مستند اسلامی تعلیمات انسان کو براہِ راست اللہ کی طرف رجوع کرنا سکھاتی ہیں—سورۃ الفاتحہ، آیت الکرسی، سورۃ البقرہ کی آخری دو آیات اور معوذات ہر مسلمان خود پڑھ سکتا ہے۔',
          ar: 'يعلمنا الإسلام التوجه المباشر إلى الله عبر الفاتحة وآية الكرسي وخواتيم البقرة والمعوذات، فليست بركة القرآن حكراً على أحد.',
        },
      },
    ],
  },
  {
    slug: 'eastern-abjad-hisab-al-jummal-guide',
    category: 'numerology',
    categoryLabel: { en: 'Abjad & Numerology', ur: 'علمِ ابجد اور اعداد', ar: 'حساب الجُمَّل' },
    title: {
      en: 'Introduction to Hisab al-Jummal: How Classical Eastern Abjad Numerals Work',
      ur: 'حساب الجمل کا تعارف: کلاسیکی مشرقی علمِ ابجد کیسے کام کرتا ہے؟',
      ar: 'مقدمة في حساب الجُمَّل: كيف يعمل النظام الأبجدي المشرقي؟',
    },
    excerpt: {
      en: 'Explore the 28-letter alphanumeric system used across classical Arabic, Persian, and Urdu literary history.',
      ur: 'عربی، فارسی اور اردو ادب کی تاریخ میں ۲۸ حروف کے عددی نظام اور اس کے اصولوں کا جائزہ۔',
      ar: 'تعرّف على النظام العددي للأحرف الثمانية والعشرين في التراث العربي والفارسي والأردي.',
    },
    readMinutes: 5,
    updatedDate: 'November 2026',
    image: ASSETS.astrology,
    relatedServiceSlug: 'numerology',
    sections: [
      {
        heading: { en: 'Units, Tens, and Hundreds', ur: 'اکائی، دہائی اور سینکڑے کی ترتیب', ar: 'الآحاد والعشرات والمئات' },
        body: {
          en: 'The Abjad sequence—Abjad, Hawwaz, Hutti, Kalaman, Sa\'fas, Qarashat, Thakhadh, Dazagh—assigns values 1–9 to the first nine letters, 10–90 to the next nine, 100–900 to the next nine, and 1000 to Ghayn (غ). Poets historically composed verses whose letter sum encoded the exact Hijri year of an architectural monument or historical milestone.',
          ur: 'ابجد، ہوز، حطی، کلمن، سعفص، قرشت، ثخذ، ضظغ کے سلسلے میں پہلے نو حروف کو ۱ تا ۹، اگلے نو کو ۱۰ تا ۹۰، پھر ۱۰۰ تا ۹۰۰ اور غین کو ۱۰۰۰ کا عدد دیا جاتا ہے۔ قدیم شعراء اسی نظام سے تاریخ گوئی کے قطعات لکھتے تھے۔',
          ar: 'يرتب نظام أبجد هوز حطي كلمن سعفص قرشت ثخذ ضظغ الحروف من الآحاد إلى العشرات والمئات حتى الألف، وقد اشتهر به المؤرخون والشعراء.',
        },
      },
    ],
  },
  {
    slug: 'overseas-pakistani-marriage-communication',
    category: 'family',
    categoryLabel: { en: 'Family & Relationships', ur: 'خاندان اور رشتے', ar: 'الأسرة والزواج' },
    title: {
      en: 'Navigating Marriage & Family Expectations Across Continents',
      ur: 'سمندر پار خاندانوں میں شادی اور باہمی توقعات کا متوازن حل',
      ar: 'إدارة توقعات الزواج والأسرة عبر القارات بوعي وحكمة',
    },
    excerpt: {
      en: 'Thoughtful communication habits for Pakistani families balancing heritage, career mobility, and emotional harmony abroad.',
      ur: 'بیرونِ ملک مقیم پاکستانی خاندانوں کے لیے روایات، عملی زندگی اور گھریلو سکون میں توازن کے اصول۔',
      ar: 'مبادئ تواصل ناضجة للأسر المغتربة لتحقيق التوازن بين الأصالة ومتطلبات الحياة الحديثة.',
    },
    readMinutes: 5,
    updatedDate: 'November 2026',
    image: ASSETS.counsel,
    relatedServiceSlug: 'marriage-relationship-guidance',
    sections: [
      {
        heading: { en: 'Clarity Before Commitment', ur: 'رشتے سے پہلے واضح گفتگو', ar: 'الوضوح قبل الارتباط' },
        body: {
          en: 'Many preventable tensions arise when key expectations around work, living arrangements, travel, and family support remain unspoken before marriage. Calm, dignified conversation—paired with Istikhara and elder wisdom—lays a resilient foundation.',
          ur: 'بہت سی قابلِ تدارک الجھنیں اس وقت پیدا ہوتی ہیں جب ملازمت، رہائش، سفر اور خاندانی ذمہ داریوں پر شادی سے پہلے واضح بات نہ کی جائے۔ استخارہ اور بڑوں کی حکمت کے ساتھ شائستہ مکالمہ مضبوط بنیاد رکھتا ہے۔',
          ar: 'يمكن تفادي كثير من الخلافات المستقبلية عبر الحوار الهادئ والصريح حول تفاصيل الحياة قبل الزواج، مقترناً بالاستخارة وحكمة الكبار.',
        },
      },
    ],
  },
  {
    slug: 'etiquette-of-dua-daily-remembrance',
    category: 'dua-wazifa',
    categoryLabel: { en: 'Dua & Wazifa Resources', ur: 'دعائیں اور اذکار', ar: 'الأدعية والأذكار' },
    title: {
      en: 'The Etiquette of Dua: Building a Grounded Daily Adhkar Rhythm',
      ur: 'دعا کے آداب: روزانہ مسنون اذکار کا پرسکون معمول کیسے بنائیں؟',
      ar: 'آداب الدعاء: كيف تبني ورداً يومياً مطمئناً ومستداماً؟',
    },
    excerpt: {
      en: 'Why sincerity, gratitude, and verified Prophetic wording outweigh complex unverified routines.',
      ur: 'اخلاص، شکر گزاری اور مسنون الفاظ پیچیدہ اور غیر مصدقہ وظائف سے کہیں زیادہ بابرکت کیوں ہیں۔',
      ar: 'لماذا يتفوق الإخلاص والألفاظ النبوية الثابتة على الأوراد المعقدة غير الموثقة.',
    },
    readMinutes: 4,
    updatedDate: 'November 2026',
    image: ASSETS.spiritual,
    relatedServiceSlug: 'dua-and-wazifa',
    sections: [
      {
        heading: { en: 'Consistency Over Excess', ur: 'کثرت کے بجائے مستقل مزاجی', ar: 'المداومة أحب من التكلف' },
        body: {
          en: 'The Prophet (peace be upon him) reminded believers that the most beloved deeds to Allah are those done consistently, even if small. Five minutes of attentive morning and evening Adhkar recited with understanding transforms daily composure far more sustainably than unsustainable marathons.',
          ur: 'نبی کریم ﷺ کا ارشادِ گرامی ہے کہ اللہ کے نزدیک سب سے محبوب عمل وہ ہے جو ہمیشہ کیا جائے چاہے تھوڑا ہی ہو۔ صبح و شام سمجھ کر پڑھے گئے چند منٹ کے مسنون اذکار دل کو دائمی سکون بخشتے ہیں۔',
          ar: 'أحب الأعمال إلى الله أدومها وإن قل؛ فدقائق معدودة من أذكار الصباح والمساء بحضور قلب وتدبر أعمق أثراً وأكثر استدامة.',
        },
      },
    ],
  },
];

export function getArticleBySlug(slug: string): KnowledgeArticle | undefined {
  return KNOWLEDGE_ARTICLES.find((a) => a.slug === slug);
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS_CATALOG.find((t) => t.slug === slug);
}
