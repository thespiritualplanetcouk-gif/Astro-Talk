import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react';
import { getArticleBySlug, KNOWLEDGE_ARTICLES } from '../data/knowledge';
import { useLanguage } from '../context/LanguageContext';
import { EditorialImage } from '../components/EditorialImage';
import { SeoHead } from '../components/SeoHead';
import { InteractiveTiltCard } from '../components/InteractiveTiltCard';

export function KnowledgeCenterPage() {
  const { slug } = useParams<{ slug?: string }>();
  const { t, loc } = useLanguage();
  const [selectedCat, setSelectedCat] = useState<string>('all');

  if (slug) {
    const article = getArticleBySlug(slug);
    if (!article) {
      return (
        <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center bg-[#FAF8F2] min-h-screen">
          <h1 className="font-display text-4xl text-[#15243A]">Article Not Found</h1>
          <Link
            to="/knowledge"
            className="inline-block mt-6 px-6 py-3 bg-[#164E3C] text-white font-semibold text-sm rounded-sm"
          >
            {t.sections.viewKnowledge}
          </Link>
        </div>
      );
    }

    return (
      <article className="pt-24 pb-24 bg-[#FAF8F2] text-[#26332D] min-h-screen">
        <SeoHead title={loc(article.title)} description={loc(article.excerpt)} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/knowledge"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#164E3C] hover:underline mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{t.sections.viewKnowledge}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#566760] mb-3">
            <span className="font-semibold text-[#164E3C]">{loc(article.categoryLabel)}</span>
            <span aria-hidden="true">·</span>
            <span>{article.updatedDate}</span>
            <span aria-hidden="true">·</span>
            <span>
              {article.readMinutes} {t.common.minRead}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#15243A] leading-tight">
            {loc(article.title)}
          </h1>

          <p className="text-lg text-[#4B5C55] mt-5 leading-relaxed border-b border-[#C6A15B]/30 pb-8">
            {loc(article.excerpt)}
          </p>

          <div className="my-8 aspect-[16/9] overflow-hidden border border-[#C6A15B]/35 rounded-sm shadow-sm">
            <EditorialImage
              src={article.image}
              alt={loc(article.title)}
              priority
              className="w-full h-full object-cover"
              fallbackTitle={loc(article.title)}
            />
          </div>

          <div className="space-y-8">
            {article.sections.map((sec, i) => (
              <section key={i} className="space-y-3">
                <h2 className="font-display text-3xl font-semibold text-[#15243A]">
                  {loc(sec.heading)}
                </h2>
                <p className="text-base text-[#26332D] leading-[1.85]">{loc(sec.body)}</p>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#C6A15B]/30 flex flex-wrap items-center justify-between gap-4">
            <Link
              to={`/services/${article.relatedServiceSlug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#164E3C] text-white text-xs font-semibold hover:bg-[#26745A] transition-colors rounded-sm"
            >
              <span>Explore Related Consultation Service</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/experts" className="text-xs font-semibold text-[#164E3C] hover:underline">
              {t.sections.viewAllExperts}
            </Link>
          </div>
        </div>
      </article>
    );
  }

  const categories = [
    { key: 'all', label: 'All Topics' },
    { key: 'astrology', label: 'Astrology Education' },
    { key: 'islamic-spiritual', label: 'Islamic Spiritual Guidance' },
    { key: 'istikhara', label: 'Istikhara Education' },
    { key: 'dua-wazifa', label: 'Dua & Wazifa' },
    { key: 'numerology', label: 'Numerology' },
    { key: 'family', label: 'Family Guidance' },
  ];

  const visibleArticles =
    selectedCat === 'all'
      ? KNOWLEDGE_ARTICLES
      : KNOWLEDGE_ARTICLES.filter((a) => a.category === selectedCat);

  return (
    <div className="pt-24 pb-24 bg-[#FAF8F2] text-[#26332D] min-h-screen">
      <SeoHead
        title="Knowledge Center — Astrology, Istikhara & Spiritual Guidance"
        description="Read thoughtful, ethically grounded articles on Salat al-Istikhara, classical ephemeris astronomy, authentic Quranic Ruqyah, Eastern Abjad, and family harmony."
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl pb-10 border-b border-[#C6A15B]/30">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#164E3C] mb-3">
            Editorial Reading Room
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#15243A]">
            {t.sections.knowledgeTitle}
          </h1>
          <p className="text-base text-[#566760] mt-3 leading-relaxed">
            {t.sections.knowledgeSubtitle}
          </p>
        </header>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCat(cat.key)}
              className={`min-h-[44px] px-4 py-2 text-xs font-medium transition-all cursor-pointer whitespace-nowrap rounded-sm ${
                selectedCat === cat.key
                  ? 'bg-[#164E3C] text-white font-semibold shadow-sm'
                  : 'bg-white text-[#26332D] border border-[#C6A15B]/35 hover:border-[#164E3C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleArticles.map((article) => (
            <InteractiveTiltCard key={article.slug} className="h-full">
              <article className="group h-full bg-white border border-[#C6A15B]/35 hover:border-[#C6A15B] flex flex-col overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all">
                <div className="aspect-[16/10] overflow-hidden bg-[#F1F5EF]">
                  <EditorialImage
                    src={article.image}
                    alt={loc(article.title)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fallbackTitle={loc(article.title)}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#566760]">
                      <span className="font-semibold text-[#164E3C]">
                        {loc(article.categoryLabel)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {article.readMinutes} {t.common.minRead}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-[#15243A] mt-2 leading-snug">
                      <Link
                        to={`/knowledge/${article.slug}`}
                        className="hover:text-[#164E3C] transition-colors"
                      >
                        {loc(article.title)}
                      </Link>
                    </h2>
                    <p className="text-sm text-[#566760] mt-2.5 leading-relaxed line-clamp-3">
                      {loc(article.excerpt)}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#C6A15B]/25">
                    <Link
                      to={`/knowledge/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#164E3C] hover:underline"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{t.sections.readArticle}</span>
                    </Link>
                  </div>
                </div>
              </article>
            </InteractiveTiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
