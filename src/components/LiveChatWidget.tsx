import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Minus, Send, X, MessageCircle, Calendar } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useChat } from '../context/ChatContext';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { buildWhatsAppUrl } from '../utils/international';

export function LiveChatWidget() {
  const {
    isOpen,
    isMinimized,
    connected,
    supportOnline,
    sessionId,
    customerName,
    customerContact,
    messages,
    unreadCount,
    setCustomerName,
    setCustomerContact,
    openChat,
    closeChat,
    toggleMinimize,
    sendMessage,
  } = useChat();

  const { lang } = useLanguage();
  const { openBooking } = useBooking();
  const navigate = useNavigate();

  const [draft, setDraft] = useState('');
  const [showProfileStep, setShowProfileStep] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const welcomeMessage =
    lang === 'ur'
      ? 'ایسٹروٹاک پی کے میں خوش آمدید! ہم آپ کی کس طرح مدد کر سکتے ہیں؟ ہماری ٹیم خدمات کی تلاش، درست ماہر کے انتخاب اور مشاورت کے اہتمام میں آپ کی رہنمائی کر سکتی ہے۔'
      : lang === 'ar'
        ? 'مرحباً بكم في ASTROTALK PK! كيف يمكننا مساعدتكم اليوم؟ يمكن لفريقنا مساعدتكم في استكشاف الخدمات واختيار المختص المناسب وترتيب الاستشارة.'
        : 'Welcome to AstroTalk PK! How may we assist you today? Our team can help you explore services, find the right specialist and arrange a consultation.';

  const quickReplies = [
    {
      label: lang === 'ur' ? 'خدمات دیکھیں' : lang === 'ar' ? 'استكشاف الخدمات' : 'Explore Services',
      action: () => {
        void sendMessage('I would like to explore your consultation services.');
        navigate('/services');
      },
    },
    {
      label: lang === 'ur' ? 'ماہر تلاش کریں' : lang === 'ar' ? 'البحث عن خبير' : 'Find an Expert',
      action: () => {
        void sendMessage('Please help me find the right specialist for my needs.');
        navigate('/experts');
      },
    },
    {
      label: lang === 'ur' ? 'مشاورت بُک کریں' : lang === 'ar' ? 'حجز استشارة' : 'Book a Consultation',
      action: () => {
        void sendMessage('I would like to book a private consultation.');
        openBooking({ language: lang });
      },
    },
    {
      label: lang === 'ur' ? 'آن لائن استخارہ' : lang === 'ar' ? 'الاستخارة أونلاين' : 'Online Istikhara',
      action: () => {
        void sendMessage('I would like guidance regarding Online Istikhara.');
      },
    },
    {
      label: lang === 'ur' ? 'روحانی علاج' : lang === 'ar' ? 'الإرشاد الروحي' : 'Rohani Ilaj',
      action: () => {
        void sendMessage('I would like information about Online Rohani Ilaj guidance.');
      },
    },
    {
      label: lang === 'ur' ? 'سپورٹ سے بات کریں' : lang === 'ar' ? 'التحدث مع الدعم' : 'Speak to Support',
      action: () => {
        setShowProfileStep(true);
        void sendMessage('I would like to speak directly with the AstroTalk PK support team.');
      },
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const text = draft;
    setDraft('');
    await sendMessage(text);
  };

  const whatsappFallbackHref = buildWhatsAppUrl(
    '923000000000',
    `Assalam-o-Alaikum ASTROTALK PK Support (${sessionId ?? 'Web Chat'}), my name is ${
      customerName.trim() || 'a visitor'
    }. I would like assistance arranging a consultation.`
  );

  return (
    <>
      {/* Desktop & Mobile Floating Live Chat Launcher (positioned cleanly above mobile bottom bar) */}
      <AnimatePresence>
        {(!isOpen || isMinimized) && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={openChat}
            aria-label={lang === 'ur' ? 'لائیو چیٹ کھولیں' : lang === 'ar' ? 'فتح المحادثة المباشرة' : 'Open Live Chat'}
            className="fixed bottom-20 lg:bottom-6 end-4 lg:end-6 z-40 inline-flex items-center gap-2.5 h-12 px-4 sm:px-5 bg-[#164E3C] text-white border border-[#C6A15B]/75 shadow-[0_14px_34px_-10px_rgba(22,78,60,0.45)] hover:bg-[#1E614B] active:scale-[0.97] transition-all cursor-pointer"
          >
            <span className="relative flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-[#EAD9AD]" />
              <span
                aria-hidden="true"
                className={`absolute -top-1 -end-1 w-2 h-2 rounded-full ${
                  supportOnline ? 'bg-emerald-300 animate-status-pulse' : 'bg-[#EAD9AD]'
                }`}
              />
            </span>
            <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
              {lang === 'ur' ? 'لائیو چیٹ' : lang === 'ar' ? 'محادثة مباشرة' : 'Live Chat'}
            </span>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold bg-[#C6A15B] text-[#15243A] rounded-full">
                {unreadCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Live Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label="ASTROTALK PK Live Support Chat"
            className="fixed bottom-20 lg:bottom-6 end-3 sm:end-6 z-50 w-[calc(100vw-1.5rem)] max-w-[390px] bg-[#FAF8F2] border border-[#C6A15B]/55 shadow-[0_24px_60px_-15px_rgba(21,36,58,0.38)] flex flex-col max-h-[74vh] sm:max-h-[580px] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#164E3C] text-white px-4 py-3.5 border-b border-[#C6A15B]/35 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      supportOnline ? 'bg-emerald-300 animate-status-pulse' : 'bg-[#EAD9AD]'
                    }`}
                  />
                  <h2 className="font-display text-lg font-semibold tracking-wide truncate">
                    ASTROTALK <span className="text-[#EAD9AD]">PK</span>
                  </h2>
                </div>
                <p className="text-[11px] text-[#EAD9AD]/90 mt-0.5 truncate">
                  {supportOnline
                    ? lang === 'ur'
                      ? 'لائیو سپورٹ ٹیم آن لائن ہے'
                      : lang === 'ar'
                        ? 'فريق الدعم متاح الآن'
                        : 'Human Support Team Online'
                    : lang === 'ur'
                      ? 'سپورٹ انکوائری ڈیسک · پیغام محفوظ ہو گا'
                      : lang === 'ar'
                        ? 'مكتب الدعم · تُحفظ رسائلك لفريقنا'
                        : 'Support Enquiry Desk · Live when agent joins'}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={toggleMinimize}
                  aria-label="Minimize chat"
                  className="p-2 text-[#EAD9AD] hover:text-white transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={closeChat}
                  aria-label="Close chat"
                  className="p-2 text-[#EAD9AD] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Optional Customer Name & Contact Strip (Collapsible) */}
            <div className="px-4 py-2.5 bg-[#F1F5EF] border-b border-[#C6A15B]/25">
              <button
                type="button"
                onClick={() => setShowProfileStep((v) => !v)}
                className="w-full flex items-center justify-between text-[11px] font-medium text-[#164E3C] cursor-pointer"
              >
                <span>
                  {customerName || customerContact
                    ? `${customerName || 'Guest'} ${customerContact ? `· ${customerContact}` : ''}`
                    : lang === 'ur'
                      ? 'اپنا نام اور واٹس ایپ / ای میل شامل کریں (تجویز کردہ)'
                      : lang === 'ar'
                        ? 'أضف اسمك ورقم واتساب أو البريد (مستحسن)'
                        : 'Add your name & WhatsApp / email for follow-up'}
                </span>
                <span className="text-[#C6A15B] underline">{showProfileStep ? 'Hide' : 'Edit'}</span>
              </button>

              {showProfileStep && (
                <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={lang === 'ur' ? 'آپ کا نام' : lang === 'ar' ? 'الاسم' : 'Your name'}
                    className="w-full px-2.5 py-2 text-xs bg-white border border-[#C6A15B]/35 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={customerContact}
                    onChange={(e) => setCustomerContact(e.target.value)}
                    placeholder={
                      lang === 'ur' ? 'واٹس ایپ یا ای میل' : lang === 'ar' ? 'واتساب أو البريد' : 'WhatsApp or Email'
                    }
                    className="w-full px-2.5 py-2 text-xs bg-white border border-[#C6A15B]/35 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-[#FAF8F2]">
              {/* Welcome Message */}
              <div className="bg-white border border-[#C6A15B]/30 p-3.5 text-xs sm:text-[13px] text-[#26332D] leading-relaxed shadow-xs">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#164E3C] mb-1">
                  AstroTalk PK Coordination Desk
                </p>
                <p>{welcomeMessage}</p>
              </div>

              {/* Quick Reply Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {quickReplies.map((qr) => (
                  <button
                    key={qr.label}
                    type="button"
                    onClick={qr.action}
                    className="px-2.5 py-1.5 text-[11px] font-medium bg-white border border-[#164E3C]/25 text-[#164E3C] hover:bg-[#164E3C] hover:text-white transition-colors cursor-pointer"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>

              {/* Live Messages */}
              {messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                        isCustomer
                          ? 'bg-[#164E3C] text-white'
                          : 'bg-white border border-[#C6A15B]/35 text-[#26332D]'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                    </div>
                    <span className="mt-1 text-[10px] text-[#6E7E77] tabular-nums-mono">
                      {msg.senderName} ·{' '}
                      {new Date(msg.createdAtUtc).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                );
              })}

              {messages.length > 0 && !supportOnline && (
                <div className="bg-[#F1F5EF] border border-[#164E3C]/20 p-3 text-[11px] text-[#4A5A53] leading-relaxed">
                  {lang === 'ur'
                    ? 'آپ کا پیغام محفوظ ہو چکا ہے۔ فوری جواب کے لیے آپ نیچے واٹس ایپ کے ذریعے بھی رابطہ کر سکتے ہیں یا اپائنٹمنٹ فارم پُر کر سکتے ہیں۔'
                    : lang === 'ar'
                      ? 'تم تسجيل رسالتك لدى فريق التنسيق. للرد الأسرع يمكنك أيضاً التواصل عبر واتساب أدناه أو حجز موعد.'
                      : 'Your message is logged in our live support inbox. While no human coordinator is actively connected right now, you can also reach us immediately on WhatsApp or request an appointment below.'}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Direct WhatsApp & Booking Utility Row */}
            <div className="px-4 py-2 bg-[#F1F5EF] border-t border-[#C6A15B]/25 flex items-center justify-between gap-2 text-[11px]">
              <a
                href={whatsappFallbackHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#164E3C] hover:text-[#26745A] font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>
                  {lang === 'ur' ? 'واٹس ایپ پر جاری رکھیں' : lang === 'ar' ? 'المتابعة عبر واتساب' : 'Continue on WhatsApp'}
                </span>
              </a>
              <button
                type="button"
                onClick={() => openBooking({ language: lang })}
                className="inline-flex items-center gap-1 text-[#26332D] hover:text-[#164E3C] font-medium cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>{lang === 'ur' ? 'اپائنٹمنٹ' : lang === 'ar' ? 'موعد' : 'Book Slot'}</span>
              </button>
            </div>

            {/* Message Composer */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-white border-t border-[#C6A15B]/30 flex items-center gap-2"
            >
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={1000}
                placeholder={
                  lang === 'ur'
                    ? 'اپنا پیغام لکھیں...'
                    : lang === 'ar'
                      ? 'اكتب رسالتك هنا...'
                      : 'Type your message...'
                }
                className="flex-1 min-h-[42px] px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-[#C6A15B]/35 text-[#26332D] focus:border-[#164E3C] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Send message"
                className="min-w-[42px] min-h-[42px] inline-flex items-center justify-center bg-[#164E3C] text-white hover:bg-[#1E614B] disabled:opacity-45 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {sessionId && (
              <div className="px-4 py-1 bg-[#FAF8F2] border-t border-[#EAD9AD]/60 flex items-center justify-between text-[10px] text-[#6E7E77] tabular-nums-mono">
                <span>Ref: {sessionId}</span>
                <span>{connected ? 'Live Socket Connected' : 'Reconnecting...'}</span>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
