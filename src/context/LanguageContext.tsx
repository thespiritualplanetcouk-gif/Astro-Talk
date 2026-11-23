import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Language, LocalizedText } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import type { UIStrings } from '../i18n/translations';

interface LanguageContextValue {
  lang: Language;
  isRtl: boolean;
  setLang: (lang: Language) => void;
  t: UIStrings;
  loc: (text: LocalizedText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitialLang(): Language {
  if (typeof window === 'undefined') return 'en';
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get('lang');
  if (queryLang === 'en' || queryLang === 'ur' || queryLang === 'ar') {
    return queryLang;
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(detectInitialLang);

  const isRtl = lang === 'ur' || lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [lang, isRtl]);

  const setLang = (next: Language) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (next === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', next);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const value = useMemo<LanguageContextValue>(() => {
    return {
      lang,
      isRtl,
      setLang,
      t: TRANSLATIONS[lang],
      loc: (text: LocalizedText) => text[lang] ?? text.en,
    };
  }, [lang, isRtl]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
