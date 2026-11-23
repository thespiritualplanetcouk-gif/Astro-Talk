import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { lang } = useLanguage();

  useEffect(() => {
    const goOffline = () => setIsOffline(true);
    const goOnline = () => setIsOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 inset-x-4 sm:inset-x-auto sm:start-1/2 sm:-translate-x-1/2 z-[65] bg-[#15243A] text-[#FAF8F2] border border-[#C6A15B]/45 px-4 py-2.5 shadow-xl flex items-center gap-2.5 text-xs"
    >
      <WifiOff className="w-4 h-4 text-[#EAD9AD] shrink-0" />
      <span>
        {lang === 'ur'
          ? 'آپ اس وقت آف لائن ہیں۔ فلکیاتی اور ابجد ٹولز اب بھی کام کرتے ہیں۔'
          : lang === 'ar'
            ? 'أنت غير متصل بالإنترنت حالياً. أدوات الحساب الفلكي ما زالت متاحة.'
            : 'You are currently offline. Astronomy and Abjad calculators remain available.'}
      </span>
    </div>
  );
}
