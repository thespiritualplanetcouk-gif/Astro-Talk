import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES } from '../data/services';
import { TOOLS_CATALOG } from '../data/knowledge';
import { buildWhatsAppUrl } from '../utils/international';
import type { Language } from '../types';

export function Footer() {
  const { lang, setLang, t, loc } = useLanguage();

  const centralWhatsApp = buildWhatsAppUrl(
    '923000000000',
    'Assalam-o-Alaikum ASTROTALK PK Central Coordination Desk, I would like guidance choosing the right consultation service.'
  );

  const regions = [
    'United Kingdom',
    'Europe',
    'United States',
    'Canada',
    'Australia',
    'United Arab Emirates',
    'Saudi Arabia',
    'Pakistan',
  ];

  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ur', label: 'اردو' },
    { code: 'ar', label: 'العربية' },
  ];

  return (
    <footer className="bg-[#060D1A] border-t border-[#C6A35A]/20 text-[#A9B2BE]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              to="/"
              className="inline-block font-display text-2xl font-semibold tracking-[0.14em] text-[#F6F2E9]"
            >
              ASTROTALK <span className="text-[#C6A35A]">PK</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#A9B2BE] max-w-sm">
              {t.footer.description}
            </p>
            <p className="text-xs leading-relaxed text-[#8F9BA9] border-t border-[#C6A35A]/15 pt-4 max-w-sm">
              {t.footer.ethicalNote}
            </p>

            {/* Footer Language Switcher */}
            <div className="pt-2 flex items-center gap-3 text-xs">
              <Globe className="w-4 h-4 text-[#C6A35A]" />
              {langs.map((item, idx) => (
                <span key={item.code} className="inline-flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setLang(item.code)}
                    className={`cursor-pointer transition-colors ${
                      lang === item.code
                        ? 'text-[#E5CD91] font-semibold underline underline-offset-4'
                        : 'text-[#A9B2BE] hover:text-[#F6F2E9]'
                    }`}
                  >
                    {item.label}
                  </button>
                  {idx < langs.length - 1 && <span aria-hidden="true" className="text-[#C6A35A]/30">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E5CD91]">
              {t.footer.servicesHeading}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.slice(0, 7).map((svc) => (
                <li key={svc.slug}>
                  <Link
                    to={`/services/${svc.slug}`}
                    className="hover:text-[#F6F2E9] transition-colors"
                  >
                    {loc(svc.title)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-[#E5CD91] hover:underline text-xs">
                  {t.sections.viewAllServices}
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Platform Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E5CD91]">
              {t.footer.toolsHeading}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {TOOLS_CATALOG.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="hover:text-[#F6F2E9] transition-colors"
                  >
                    {loc(tool.title)}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E5CD91] pt-4">
              {t.footer.platformHeading}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/experts" className="hover:text-[#F6F2E9] transition-colors">{t.nav.ourExperts}</Link></li>
              <li><Link to="/knowledge" className="hover:text-[#F6F2E9] transition-colors">{t.nav.knowledgeCenter}</Link></li>
              <li><Link to="/about" className="hover:text-[#F6F2E9] transition-colors">{t.nav.aboutUs}</Link></li>
              <li><Link to="/contact" className="hover:text-[#F6F2E9] transition-colors">{t.nav.contactUs}</Link></li>
              <li><Link to="/admin" className="hover:text-[#F6F2E9] transition-colors">{t.nav.adminPortal}</Link></li>
            </ul>
          </div>

          {/* International & Support Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E5CD91]">
              {t.footer.internationalHeading}
            </h3>
            <p className="text-sm leading-relaxed text-[#A9B2BE]">
              {regions.join(' · ')}
            </p>

            <div className="pt-4 space-y-3 border-t border-[#C6A35A]/15">
              <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E5CD91]">
                {t.footer.supportHeading}
              </h3>
              <a
                href={centralWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-[#F6F2E9] hover:text-[#E5CD91] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#C6A35A] shrink-0" />
                <span>{t.footer.centralSupport}</span>
              </a>
              <a
                href="mailto:support@astrotalkpk.com"
                className="flex items-center gap-2.5 text-sm text-[#A9B2BE] hover:text-[#F6F2E9] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C6A35A] shrink-0" />
                <span>support@astrotalkpk.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-14 pt-6 border-t border-[#C6A35A]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#8F9BA9]">
          <p>{t.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-[#F6F2E9] transition-colors">
              {t.footer.privacyPolicy}
            </Link>
            <span aria-hidden="true" className="text-[#C6A35A]/30">·</span>
            <Link to="/terms" className="hover:text-[#F6F2E9] transition-colors">
              {t.footer.terms}
            </Link>
            <span aria-hidden="true" className="text-[#C6A35A]/30">·</span>
            <Link to="/disclaimer" className="hover:text-[#F6F2E9] transition-colors">
              {t.footer.disclaimer}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
