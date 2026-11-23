import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SeoHeadProps {
  title: string;
  description: string;
}

export function SeoHead({ title, description }: SeoHeadProps) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title.includes('ASTROTALK PK') ? title : `${title} — ASTROTALK PK`;
    document.title = fullTitle;

    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', fullTitle);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[name="twitter:title"]', fullTitle);
    updateMeta('meta[name="twitter:description"]', description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && typeof window !== 'undefined') {
      canonical.setAttribute('href', `${window.location.origin}${location.pathname}`);
    }
  }, [title, description, location.pathname]);

  return null;
}
