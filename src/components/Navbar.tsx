import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES } from '../data/services';
import { TOOLS_CATALOG } from '../data/knowledge';
import type { Language } from '../types';

export function Navbar() {
  const { lang, setLang, t, loc } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<'services' | 'tools' | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ur', label: 'اردو' },
    { code: 'ar', label: 'العربية' },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#091426]/95 backdrop-blur-md border-b border-[#C6A35A]/20'
          : 'bg-[#091426]/75 backdrop-blur-sm border-b border-[#C6A35A]/10'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark (single line, clean luxury typography) */}
        <Link
          to="/"
          className="font-display text-xl lg:text-2xl font-semibold tracking-[0.14em] text-[#F6F2E9] hover:text-[#E5CD91] transition-colors whitespace-nowrap shrink-0"
        >
          ASTROTALK <span className="text-[#C6A35A]">PK</span>
        </Link>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-6 text-[13.5px] font-medium text-[#D6DCE5]"
        >
          <Link
            to="/services/astrology"
            className={`whitespace-nowrap shrink-0 py-1 border-b transition-colors ${
              isActive('/services/astrology')
                ? 'text-[#E5CD91] border-[#C6A35A]'
                : 'border-transparent hover:text-[#F6F2E9] hover:border-[#C6A35A]/40'
            }`}
          >
            {t.nav.astrology}
          </Link>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'services' ? null : 'services')}
              aria-expanded={openMenu === 'services'}
              className={`flex items-center gap-1 whitespace-nowrap shrink-0 py-1 border-b transition-colors cursor-pointer ${
                isActive('/services') && !isActive('/services/astrology') && !isActive('/services/online-istikhara')
                  ? 'text-[#E5CD91] border-[#C6A35A]'
                  : 'border-transparent hover:text-[#F6F2E9] hover:border-[#C6A35A]/40'
              }`}
            >
              <span>{t.nav.spiritualServices}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#C6A35A] transition-transform duration-200 ${
                  openMenu === 'services' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openMenu === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute start-0 top-full mt-3 w-[540px] bg-[#0B182E] border border-[#C6A35A]/25 shadow-2xl p-5"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#C6A35A]/15">
                    <span className="text-xs tracking-wider uppercase text-[#C6A35A]">
                      {t.nav.allServices}
                    </span>
                    <Link
                      to="/services"
                      className="text-xs text-[#E5CD91] hover:underline whitespace-nowrap"
                    >
                      {t.sections.viewAllServices}
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
                    {SERVICES.map((svc) => (
                      <Link
                        key={svc.slug}
                        to={`/services/${svc.slug}`}
                        className="group block py-1.5 border-b border-transparent hover:border-[#C6A35A]/20 transition-colors"
                      >
                        <div className="text-sm text-[#F6F2E9] group-hover:text-[#E5CD91] transition-colors">
                          {loc(svc.title)}
                        </div>
                        <div className="text-[11.5px] text-[#A9B2BE] line-clamp-1 mt-0.5">
                          {loc(svc.shortDescription)}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/services/online-istikhara"
            className={`whitespace-nowrap shrink-0 py-1 border-b transition-colors ${
              isActive('/services/online-istikhara')
                ? 'text-[#E5CD91] border-[#C6A35A]'
                : 'border-transparent hover:text-[#F6F2E9] hover:border-[#C6A35A]/40'
            }`}
          >
            {t.nav.istikhara}
          </Link>

          <Link
            to="/experts"
            className={`whitespace-nowrap shrink-0 py-1 border-b transition-colors ${
              isActive('/experts')
                ? 'text-[#E5CD91] border-[#C6A35A]'
                : 'border-transparent hover:text-[#F6F2E9] hover:border-[#C6A35A]/40'
            }`}
          >
            {t.nav.ourExperts}
          </Link>

          {/* Tools Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'tools' ? null : 'tools')}
              aria-expanded={openMenu === 'tools'}
              className={`flex items-center gap-1 whitespace-nowrap shrink-0 py-1 border-b transition-colors cursor-pointer ${
                isActive('/tools')
                  ? 'text-[#E5CD91] border-[#C6A35A]'
                  : 'border-transparent hover:text-[#F6F2E9] hover:border-[#C6A35A]/40'
              }`}
            >
              <span>{t.nav.freeTools}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#C6A35A] transition-transform duration-200 ${
                  openMenu === 'tools' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openMenu === 'tools' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute start-0 top-full mt-3 w-[480px] bg-[#0B182E] border border-[#C6A35A]/25 shadow-2xl p-5"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#C6A35A]/15">
                    <span className="text-xs tracking-wider uppercase text-[#C6A35A]">
                      {t.nav.freeTools}
                    </span>
                    <Link to="/tools" className="text-xs text-[#E5CD91] hover:underline whitespace-nowrap">
                      {t.sections.viewAllTools}
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {TOOLS_CATALOG.map((tool) => (
                      <Link
                        key={tool.slug}
                        to={`/tools/${tool.slug}`}
                        className="py-1.5 text-sm text-[#F6F2E9] hover:text-[#E5CD91] transition-colors"
                      >
                        {loc(tool.title)}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/knowledge"
            className={`whitespace-nowrap shrink-0 py-1 border-b transition-colors ${
              isActive('/knowledge')
                ? 'text-[#E5CD91] border-[#C6A35A]'
                : 'border-transparent hover:text-[#F6F2E9] hover:border-[#C6A35A]/40'
            }`}
          >
            {t.nav.knowledgeCenter}
          </Link>

          <Link
            to="/about"
            className={`whitespace-nowrap shrink-0 py-1 border-b transition-colors ${
              isActive('/about')
                ? 'text-[#E5CD91] border-[#C6A35A]'
                : 'border-transparent hover:text-[#F6F2E9] hover:border-[#C6A35A]/40'
            }`}
          >
            {t.nav.aboutUs}
          </Link>

          <Link
            to="/contact"
            className={`whitespace-nowrap shrink-0 py-1 border-b transition-colors ${
              isActive('/contact')
                ? 'text-[#E5CD91] border-[#C6A35A]'
                : 'border-transparent hover:text-[#F6F2E9] hover:border-[#C6A35A]/40'
            }`}
          >
            {t.nav.contactUs}
          </Link>
        </nav>

        {/* Zone 3: Language Switcher + Single Primary CTA */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div
            role="group"
            aria-label="Language selector"
            className="flex items-center text-xs border border-[#C6A35A]/25 divide-x divide-[#C6A35A]/20 rtl:divide-x-reverse"
          >
            {langs.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLang(item.code)}
                className={`px-2 sm:px-2.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  lang === item.code
                    ? 'bg-[#C6A35A] text-[#091426] font-semibold'
                    : 'text-[#D6DCE5] hover:text-[#F6F2E9] bg-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Link
            to="/experts"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide bg-[#C6A35A] text-[#091426] hover:bg-[#E5CD91] transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.findExpert}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="xl:hidden p-2 text-[#F6F2E9] hover:text-[#E5CD91] transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Slide-Down Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-[#091426] border-b border-[#C6A35A]/25 max-h-[82vh] overflow-y-auto"
          >
            <div className="px-5 py-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {[
                  { to: '/', label: t.nav.home },
                  { to: '/services/astrology', label: t.nav.astrology },
                  { to: '/services', label: t.nav.spiritualServices },
                  { to: '/services/online-istikhara', label: t.nav.istikhara },
                  { to: '/experts', label: t.nav.ourExperts },
                  { to: '/tools', label: t.nav.freeTools },
                  { to: '/knowledge', label: t.nav.knowledgeCenter },
                  { to: '/about', label: t.nav.aboutUs },
                  { to: '/contact', label: t.nav.contactUs },
                  { to: '/admin', label: t.nav.adminPortal },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`py-2.5 px-2 text-base border-b border-[#C6A35A]/10 transition-colors ${
                      isActive(item.to) ? 'text-[#E5CD91] font-medium' : 'text-[#F6F2E9] hover:text-[#E5CD91]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/experts"
                  className="block w-full text-center py-3 px-4 bg-[#C6A35A] text-[#091426] font-semibold text-sm hover:bg-[#E5CD91] transition-colors"
                >
                  {t.nav.findExpert}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
