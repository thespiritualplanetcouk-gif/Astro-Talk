import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/international';

export function FloatingWhatsApp() {
  const { t } = useLanguage();
  const href = buildWhatsAppUrl(
    '923000000000',
    'Assalam-o-Alaikum ASTROTALK PK, I would like assistance connecting with a consultation specialist.'
  );

  // Shown cleanly on desktop bottom-start so it never collides with LiveChatWidget (bottom-end) or mobile bottom navigation
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.footer.centralSupport}
      className="hidden lg:inline-flex fixed bottom-6 start-6 z-40 items-center gap-2.5 h-12 px-4 bg-white text-[#164E3C] border border-[#C6A15B]/60 shadow-[0_12px_30px_-10px_rgba(22,78,60,0.22)] hover:bg-[#F1F5EF] hover:border-[#164E3C] transition-all"
    >
      <MessageCircle className="w-4 h-4 text-[#164E3C] shrink-0" />
      <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
        {t.expertActions.whatsapp}
      </span>
    </a>
  );
}
