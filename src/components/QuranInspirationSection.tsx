import { motion } from 'motion/react';
import { QURAN_INSPIRATION_VERSES } from '../data/quranVerses';
import { useLanguage } from '../context/LanguageContext';

export function QuranInspirationSection() {
  const { lang } = useLanguage();

  const heading =
    lang === 'ur'
      ? 'قرآنی آیاتِ سکون اور امید'
      : lang === 'ar'
        ? 'آياتٌ قرآنية للسكينة والطمأنينة'
        : 'Timeless Quranic Reflections for Peace & Trust';

  const subtitle =
    lang === 'ur'
      ? 'قلب کے اطمینان، مشکل میں صبر اور اللہ پر توکل کے لیے قرآنِ کریم کے مستند الفاظ۔'
      : lang === 'ar'
        ? 'تذكيرٌ إيماني هادئ بطمأنينة الذكر وحسن التوكل على الله في كل مراحل الحياة.'
        : 'Serene reminders of remembrance, ease after hardship, and reliance upon Allah—shared purely for spiritual reflection.';

  const note =
    lang === 'ur'
      ? 'یہ قرآنی آیات صرف روحانی اطمینان اور تذکیر کے لیے پیش کی گئی ہیں، نہ کہ کسی خدمت کی ضمانت کے طور پر۔'
      : lang === 'ar'
        ? 'تُعرض هذه الآيات الكريمة للتأمل الروحي والتذكير الإيماني فقط، وليست وعداً تجارياً أو ضماناً لنتائج.'
        : 'Presented strictly for peaceful reflection and remembrance—never as commercial claims or guaranteed consultation outcomes.';

  return (
    <section
      aria-labelledby="quran-inspiration-heading"
      className="py-20 lg:py-24 bg-[#F1F5EF] islamic-lattice-ivory border-y border-[#C6A15B]/25 relative overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#164E3C] font-semibold">
            {lang === 'ur' ? 'قرآنِ کریم سے روحانی اطمینان' : lang === 'ar' ? 'سكينة القلوب' : 'Spiritual Inspiration'}
          </p>
          <h2
            id="quran-inspiration-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#15243A] mt-3 leading-tight"
          >
            {heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5A53] leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {QURAN_INSPIRATION_VERSES.map((verse, idx) => (
            <motion.article
              key={verse.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="group relative bg-white gold-hairline p-7 sm:p-8 flex flex-col justify-between overflow-hidden"
            >
              {/* Delicate geometric corner accent */}
              <svg
                aria-hidden="true"
                viewBox="0 0 64 64"
                className="pointer-events-none absolute top-0 end-0 w-16 h-16 text-[#C6A15B]/22 group-hover:text-[#C6A15B]/45 transition-colors"
              >
                <path d="M64 0 L64 64 L0 0 Z" fill="currentColor" opacity="0.12" />
                <path d="M64 12 L12 12 L12 0" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="48" cy="16" r="2.2" fill="currentColor" />
              </svg>

              <div>
                <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-[#164E3C] font-medium">
                  <span>
                    {lang === 'ur' ? verse.surahUr : lang === 'ar' ? verse.surahAr : verse.surahEn}
                  </span>
                  <span className="tabular-nums-mono text-[#C6A15B] font-semibold">
                    {verse.reference}
                  </span>
                </div>

                {/* Verified Arabic Calligraphy */}
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl sm:text-[28px] text-[#164E3C] leading-[2.05] mt-5 text-center py-4 px-3 bg-[#FAF8F2] border-y border-[#EAD9AD]/70"
                >
                  {verse.arabic}
                </p>

                {/* English & Urdu Translations */}
                <div className="mt-5 space-y-3">
                  <p className="text-sm sm:text-[15px] text-[#26332D] leading-relaxed font-medium">
                    “{verse.english}”
                  </p>
                  <p
                    dir="rtl"
                    lang="ur"
                    className="font-urdu text-[15px] text-[#4A5A53] text-right leading-[2.15]"
                  >
                    {verse.urdu}
                  </p>
                </div>
              </div>

              <p className="mt-5 pt-4 border-t border-[#EAD9AD]/65 text-xs text-[#6E7E77] leading-relaxed">
                {lang === 'ur'
                  ? verse.reflectionUr
                  : lang === 'ar'
                    ? verse.reflectionAr
                    : verse.reflectionEn}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#6E7E77] max-w-2xl mx-auto">
          {note}
        </p>
      </div>
    </section>
  );
}
