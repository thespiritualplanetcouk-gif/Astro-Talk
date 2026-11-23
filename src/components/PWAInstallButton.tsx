import { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../context/LanguageContext';

interface PWAInstallButtonProps {
  compact?: boolean;
  className?: string;
}

export function PWAInstallButton({ compact = false, className = '' }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();
  const { lang } = useLanguage();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled || (!isInstallable && !isIOS)) return null;

  const label =
    lang === 'ur' ? 'ایپ انسٹال کریں' : lang === 'ar' ? 'تثبيت التطبيق' : compact ? 'Install App' : 'Install AstroTalk App';

  const handleClick = async () => {
    if (isInstallable) {
      await promptInstall();
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 border border-[#164E3C]/25 bg-[#F1F5EF] hover:bg-[#164E3C] text-[#164E3C] hover:text-white transition-colors text-xs font-medium min-h-[40px] px-3.5 py-2 cursor-pointer ${className}`}
      >
        <Download className="w-3.5 h-3.5 shrink-0" />
        <span>{label}</span>
      </button>

      {showIOSGuide && (
        <div
          className="fixed inset-0 z-[70] bg-[#15243A]/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Install ASTROTALK PK on iOS"
        >
          <div className="bg-[#FAF8F2] border border-[#C6A15B]/40 text-[#26332D] max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#164E3C] font-semibold">
                  {lang === 'ur' ? 'آئی فون / آئی پیڈ ایپ' : lang === 'ar' ? 'تثبيت على iOS' : 'Install on iPhone & iPad'}
                </p>
                <h3 className="font-display text-2xl text-[#15243A] mt-1">
                  {lang === 'ur' ? 'ہوم اسکرین پر شامل کریں' : lang === 'ar' ? 'أضف إلى الشاشة الرئيسية' : 'Add AstroTalk PK to Home Screen'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="p-2 text-[#26332D]/70 hover:text-[#164E3C] cursor-pointer"
                aria-label="Close guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ol className="space-y-3 text-sm text-[#26332D]/85 list-decimal ps-5">
              <li>
                {lang === 'ur' ? (
                  'سفاری براؤزر میں نیچے شیئر (Share) آئیکن پر ٹیپ کریں۔'
                ) : lang === 'ar' ? (
                  'اضغط على أيقونة المشاركة (Share) في شريط سفاري السفلي.'
                ) : (
                  <span className="inline-flex items-center gap-1.5 flex-wrap">
                    Tap the <Share className="w-3.5 h-3.5 inline text-[#164E3C]" /> <strong>Share</strong> button in Safari.
                  </span>
                )}
              </li>
              <li>
                {lang === 'ur'
                  ? 'فہرست میں "Add to Home Screen" منتخب کریں۔'
                  : lang === 'ar'
                    ? 'اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen).'
                    : 'Scroll down and tap "Add to Home Screen".'}
              </li>
              <li>
                {lang === 'ur'
                  ? 'اوپر "Add" پر ٹیپ کریں—ایپ فوراً دستیاب ہو جائے گی۔'
                  : lang === 'ar'
                    ? 'اضغط على "إضافة" لتشغيل المنصة كتطبيق مستقل.'
                    : 'Tap "Add" to open AstroTalk PK anytime like a native app.'}
              </li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
