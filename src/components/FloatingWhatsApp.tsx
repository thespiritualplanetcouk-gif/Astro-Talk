import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/international';

export function FloatingWhatsApp() {
  const { t } = useLanguage();
  const href = buildWhatsAppUrl(
    '923000000000',
    'Assalam-o-Alaikum ASTROTALK PK, I would like assistance connecting with a consultation specialist.'
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.footer.centralSupport}
      className="fixed bottom-5 end-5 z-40 inline-flex items-center gap-2.5 h-11 px-4 bg-[#0C3028] text-[#F6F2E9] border border-[#C6A35A]/50 shadow-xl hover:bg-[#123D32] hover:border-[#E5CD91] transition-colors"
    >
      <MessageCircle className="w-4 h-4 text-[#E5CD91] shrink-0" />
      <span className="hidden sm:inline text-xs font-medium tracking-wide whitespace-nowrap">
        {t.expertActions.whatsapp}
      </span>
    </a>
  );
}
