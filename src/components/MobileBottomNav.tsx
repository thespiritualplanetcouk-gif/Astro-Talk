import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Compass,
  Users,
  MessageSquare,
  LayoutGrid,
  X,
  Calculator,
  BookOpen,
  Info,
  Mail,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useChat } from '../context/ChatContext';
import { PWAInstallButton } from './PWAInstallButton';
import type { Language } from '../types';

export function MobileBottomNav() {
  const { lang, setLang, t } = useLanguage();
  const { openChat, isOpen, unreadCount } = useChat();
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ur', label: 'اردو' },
    { code: 'ar', label: 'العربية' },
  ];

  const labels = {
    home: lang === 'ur' ? 'ہوم' : lang === 'ar' ? 'الرئيسية' : 'Home',
    services: lang === 'ur' ? 'خدمات' : lang === 'ar' ? 'الخدمات' : 'Services',
    experts: lang === 'ur' ? 'ماہرین' : lang === 'ar' ? 'الخبراء' : 'Experts',
    chat: lang === 'ur' ? 'چیٹ' : lang === 'ar' ? 'محادثة' : 'Chat',
    more: lang === 'ur' ? 'مزید' : lang === 'ar' ? 'المزيد' : 'More',
  };

  return (
    <>
      {/* Fixed Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#C6A15B]/35 pb-safe shadow-[0_-8px_24px_-12px_rgba(21,36,58,0.16)]"
      >
        <div className="grid grid-cols-5 h-16 max-w-lg mx-auto">
          {[
            { key: 'home', to: '/', label: labels.home, icon: Home, active: isActive('/') && !moreOpen && !isOpen },
            {
              key: 'services',
              to: '/services',
              label: labels.services,
              icon: Compass,
              active: isActive('/services') && !moreOpen && !isOpen,
            },
            {
              key: 'experts',
              to: '/experts',
              label: labels.experts,
              icon: Users,
              active: isActive('/experts') && !moreOpen && !isOpen,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                to={item.to}
                onClick={() => setMoreOpen(false)}
                className={`relative flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors min-h-[48px] ${
                  item.active ? 'text-[#164E3C]' : 'text-[#4A5A53]'
                }`}
              >
                {item.active && (
                  <motion.span
                    layoutId="mobile-tab-indicator"
                    className="absolute top-0 inset-x-3 h-[2.5px] bg-[#164E3C]"
                  />
                )}
                <Icon className="w-5 h-5" />
                <span className="truncate max-w-full px-1">{item.label}</span>
              </Link>
            );
          })}

          {/* Chat Tab */}
          <button
            type="button"
            onClick={() => {
              setMoreOpen(false);
              openChat();
            }}
            className={`relative flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors min-h-[48px] cursor-pointer ${
              isOpen ? 'text-[#164E3C]' : 'text-[#4A5A53]'
            }`}
          >
            {isOpen && (
              <motion.span
                layoutId="mobile-tab-indicator"
                className="absolute top-0 inset-x-3 h-[2.5px] bg-[#164E3C]"
              />
            )}
            <span className="relative">
              <MessageSquare className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -end-1.5 w-4 h-4 rounded-full bg-[#C6A15B] text-[#15243A] text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </span>
            <span>{labels.chat}</span>
          </button>

          {/* More Bottom Sheet Trigger */}
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            className={`relative flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors min-h-[48px] cursor-pointer ${
              moreOpen ? 'text-[#164E3C]' : 'text-[#4A5A53]'
            }`}
          >
            {moreOpen && (
              <motion.span
                layoutId="mobile-tab-indicator"
                className="absolute top-0 inset-x-3 h-[2.5px] bg-[#164E3C]"
              />
            )}
            <LayoutGrid className="w-5 h-5" />
            <span>{labels.more}</span>
          </button>
        </div>
      </nav>

      {/* App-Like Mobile "More" Bottom Sheet */}
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoreOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-[#15243A]/45 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="More Platform Navigation"
              className="lg:hidden fixed bottom-16 inset-x-0 z-50 bg-[#FAF8F2] border-t border-[#C6A15B]/45 px-5 pt-4 pb-6 shadow-2xl max-h-[75vh] overflow-y-auto"
            >
              <div className="w-10 h-1 bg-[#C6A15B]/45 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-xl text-[#15243A] font-semibold">
                  ASTROTALK <span className="text-[#C6A15B]">PK</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMoreOpen(false)}
                  aria-label="Close drawer"
                  className="p-2 text-[#4A5A53] hover:text-[#164E3C] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { to: '/tools', label: t.nav.freeTools, icon: Calculator },
                  { to: '/knowledge', label: t.nav.knowledgeCenter, icon: BookOpen },
                  { to: '/about', label: t.nav.aboutUs, icon: Info },
                  { to: '/contact', label: t.nav.contactUs, icon: Mail },
                  { to: '/services/online-istikhara', label: t.nav.istikhara, icon: Compass },
                  { to: '/admin', label: t.nav.adminPortal, icon: ShieldCheck },
                ].map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-2.5 p-3.5 bg-white border border-[#C6A15B]/30 text-sm font-medium text-[#26332D] active:bg-[#F1F5EF]"
                    >
                      <Icon className="w-4 h-4 text-[#164E3C] shrink-0" />
                      <span className="truncate">{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Language Switcher inside Bottom Sheet */}
              <div className="mt-5 pt-4 border-t border-[#C6A15B]/25 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#4A5A53]">
                  <Globe className="w-4 h-4 text-[#164E3C]" />
                  <span>Language</span>
                </div>
                <div className="flex items-center border border-[#C6A15B]/40 divide-x divide-[#C6A15B]/30 rtl:divide-x-reverse bg-white">
                  {langs.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => setLang(item.code)}
                      className={`px-3 py-2 text-xs font-medium cursor-pointer ${
                        lang === item.code ? 'bg-[#164E3C] text-white' : 'text-[#26332D]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <PWAInstallButton className="w-full" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
