import { MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/international';
import { CENTRAL_PHONE_NUMBER, CENTRAL_WHATSAPP_NUMBER } from '../data/homepageContent';

export function FloatingWhatsApp() {
  const { t } = useLanguage();
  const href = buildWhatsAppUrl(
    CENTRAL_WHATSAPP_NUMBER,
    'Assalam-o-Alaikum ASTROTALK PK, I would like assistance connecting with a consultation specialist.'
  );

  // Cleanly positioned at bottom-start on both desktop and mobile (above MobileBottomNav), never colliding with LiveChatWidget at bottom-end
  return (
    <div className="fixed bottom-20 lg:bottom-6 start-4 lg:start-6 z-40 flex items-center gap-2">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.footer.centralSupport}
        className="inline-flex items-center gap-2 h-12 px-3.5 sm:px-4 bg-white text-[#164E3C] border border-[#C6A15B]/70 shadow-[0_12px_30px_-10px_rgba(22,78,60,0.28)] hover:bg-[#164E3C] hover:text-white active:scale-[0.97] transition-all"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
          WhatsApp
        </span>
      </a>

      <a
        href={`tel:${CENTRAL_PHONE_NUMBER.replace(/\s+/g, '')}`}
        aria-label="Call an Expert"
        className="lg:hidden inline-flex items-center justify-center w-12 h-12 bg-[#FAF8F2] text-[#15243A] border border-[#C6A15B]/70 shadow-[0_12px_30px_-10px_rgba(21,36,58,0.24)] active:scale-[0.97] transition-all"
      >
        <Phone className="w-4 h-4 text-[#164E3C]" />
      </a>
    </div>
  );
}
