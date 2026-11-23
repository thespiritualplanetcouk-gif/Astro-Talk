import { motion } from 'motion/react';
import { QURAN_INSPIRATION_VERSES } from '../data/quranVerses';
import { useLanguage } from '../context/LanguageContext';

export function QuranInspirationSection() {
  const { lang } = useLanguage();

  // Order verses cleanly as requested: الرعد 13:28, الشرح 94:5, الطلاق 65:3, الحديد 57:4
  const orderedIds = ['ar-rad-13-28', 'ash-sharh-94-5', 'at-talaq-65-3', 'al-hadid-57-4'];
  const verses = orderedIds
    .map((id) => QURAN_INSPIRATION_VERSES.find((v) => v.id === id))
    .filter((v): v is (typeof QURAN_INSPIRATION_VERSES)[number] => Boolean(v));

  const heading =
    lang === 'ur'
      ? 'قرآنی آیاتِ سکون اور اطمینانِ قلب'
      : lang === 'ar'
        ? 'آياتٌ قرآنية للسكينة والطمأنينة'
        : 'Quranic Verses of Tranquility – قرآنی آیاتِ سکون';

  const subtitle =
    lang === 'ur'
      ? 'قلب کے اطمینان، مشکل میں صبر اور اللہ پر توکل کے لیے قرآنِ کریم کے مستند الفاظ۔'
      : lang === 'ar'
        ? 'تذكيرٌ إيماني هادئ بطمأنينة الذكر وحسن التوكل على الله في كل مراحل الحياة.'
        : 'Authentic Quranic reminders of remembrance, ease after hardship, and reliance upon Allah—presented with Arabic calligraphy and Urdu translation.';

  const note =
    lang === 'ur'
      ? 'یہ قرآنی آیات صرف روحانی اطمینان اور تذکیر کے لیے پیش کی گئی ہیں، نہ کہ کسی تجارتی وعدے یا نتیجے کی ضمانت کے طور پر۔'
      : lang === 'ar'
        ? 'تُعرض هذه الآيات الكريمة للتأمل الروحي والتذكير الإيماني فقط، وليست وعداً تجارياً أو ضماناً لنتائج.'
        : 'Presented respectfully for spiritual reflection and remembrance only—never as commercial promises or guarantees of consultation outcomes.';

  return (
    <section
      aria-labelledby="quran-inspiration-heading"
      className="py-20 lg:py-24 bg-[#F1F5EF] islamic-lattice-ivory border-y border-[#C6A15B]/30 relative overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#164E3C] font-semibold">
            {lang === 'ur'
              ? 'قرآنِ کریم سے روحانی اطمینان'
              : lang === 'ar'
                ? 'سكينة القلوب'
                : 'Quranic Reflection · قرآنِ کریم'}
          </p>
          <h2
            id="quran-inspiration-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#15243A] mt-3 leading-tight text-balance"
          >
            {heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5A53] leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {verses.map((verse, idx) => (
            <motion.article
              key={verse.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="group relative bg-white gold-hairline p-7 sm:p-8 flex flex-col justify-between overflow-hidden"
            >
              {/* Delicate geometric corner ornament */}
              <svg
                aria-hidden="true"
                viewBox="0 0 64 64"
                className="pointer-events-none absolute top-0 end-0 w-16 h-16 text-[#C6A15B]/25 group-hover:text-[#C6A15B]/45 transition-colors"
              >
                <path d="M64 0 L64 64 L0 0 Z" fill="currentColor" opacity="0.12" />
                <path d="M64 12 L12 12 L12 0" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="48" cy="16" r="2.2" fill="currentColor" />
              </svg>

              <div>
                <div className="flex items-center justify-between gap-3 text-xs text-[#164E3C] font-semibold">
                  <span dir="rtl" lang="ar" className="font-arabic text-base">
                    {verse.surahAr}
                  </span>
                  <span className="tabular-nums-mono text-[#C6A15B]">
                    {verse.surahEn} · {verse.reference}
                  </span>
                </div>

                {/* Readable Arabic Calligraphy */}
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-[26px] sm:text-[30px] text-[#164E3C] leading-[2.15] mt-5 text-center py-5 px-4 bg-[#FAF8F2] border-y border-[#EAD9AD]/80"
                >
                  {verse.arabic}
                </p>

                {/* Proper Urdu Nastaliq Translation + English Meaning */}
                <div className="mt-5 space-y-3">
                  <p
                    dir="rtl"
                    lang="ur"
                    className="font-urdu text-[16px] sm:text-[17px] text-[#15243A] text-right leading-[2.25]"
                  >
                    {verse.urdu}
                  </p>
                  <p className="text-sm text-[#4A5A53] leading-relaxed">
                    “{verse.english}”
                  </p>
                </div>
              </div>

              <p className="mt-5 pt-4 border-t border-[#EAD9AD]/70 text-xs text-[#6E7E77] leading-relaxed">
                {lang === 'ur'
                  ? verse.reflectionUr
                  : lang === 'ar'
                    ? verse.reflectionAr
                    : verse.reflectionEn}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#566760] max-w-2xl mx-auto">
          {note}
        </p>
      </div>
    </section>
  );
}
