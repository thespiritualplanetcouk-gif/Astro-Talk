import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { BookingProvider } from './context/BookingContext';
import { ChatProvider } from './context/ChatContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LiveChatWidget } from './components/LiveChatWidget';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { BookingModal } from './components/BookingModal';
import { HomePage } from './pages/HomePage';
import { ServicesOverviewPage } from './pages/ServicesOverviewPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ExpertsPage } from './pages/ExpertsPage';
import { ExpertProfilePage } from './pages/ExpertProfilePage';
import { ToolsHubPage } from './pages/ToolsHubPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { ZodiacDetailPage } from './pages/ZodiacDetailPage';
import { KnowledgeCenterPage } from './pages/KnowledgeCenterPage';
import { AboutPage, ContactPage, LegalPage } from './pages/AboutContactLegalPages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BookingProvider>
        <ChatProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-[#FAF8F2] text-[#26332D]">
              <Navbar />
              <OfflineIndicator />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesOverviewPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/experts" element={<ExpertsPage />} />
                  <Route path="/experts/:slug" element={<ExpertProfilePage />} />
                  <Route path="/tools" element={<ToolsHubPage />} />
                  <Route path="/tools/:slug" element={<ToolDetailPage />} />
                  <Route path="/zodiac/:sign" element={<ZodiacDetailPage />} />
                  <Route path="/knowledge" element={<KnowledgeCenterPage />} />
                  <Route path="/knowledge/:slug" element={<KnowledgeCenterPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<LegalPage type="privacy" />} />
                  <Route path="/terms" element={<LegalPage type="terms" />} />
                  <Route path="/disclaimer" element={<LegalPage type="disclaimer" />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>
              <Footer />
              <FloatingWhatsApp />
              <LiveChatWidget />
              <MobileBottomNav />
              <BookingModal />
            </div>
          </BrowserRouter>
        </ChatProvider>
      </BookingProvider>
    </LanguageProvider>
  );
}
