import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useLanguage } from './LanguageContext';

export interface LiveChatMessage {
  id: string;
  sender: 'customer' | 'support' | 'system';
  senderName: string;
  text: string;
  createdAtUtc: string;
}

interface ChatContextValue {
  isOpen: boolean;
  isMinimized: boolean;
  connected: boolean;
  supportOnline: boolean;
  sessionId: string | null;
  customerName: string;
  customerContact: string;
  messages: LiveChatMessage[];
  unreadCount: number;
  setCustomerName: (v: string) => void;
  setCustomerContact: (v: string) => void;
  openChat: () => void;
  closeChat: () => void;
  toggleMinimize: () => void;
  sendMessage: (text: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

function getWsUrl(): string {
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${window.location.host}/ws/chat`;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [connected, setConnected] = useState(false);
  const [supportOnline, setSupportOnline] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [messages, setMessages] = useState<LiveChatMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const sessionTokenRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);
  const isOpenRef = useRef(false);
  const isMinimizedRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
    isMinimizedRef.current = isMinimized;
    if (isOpen && !isMinimized) {
      setUnreadCount(0);
    }
  }, [isOpen, isMinimized]);

  // Fetch initial real human support desk status without forcing a WS connection until needed
  useEffect(() => {
    fetch('/api/chat/status')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.supportOnline === 'boolean') {
          setSupportOnline(data.supportOnline);
        }
      })
      .catch(() => {
        // Offline or server restarting
      });
  }, []);

  const connectSocket = useCallback((sid: string, token: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      return;
    }
    try {
      const ws = new WebSocket(getWsUrl());
      wsRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
        ws.send(JSON.stringify({ type: 'customer:join', sessionId: sid, sessionToken: token }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'chat:joined') {
            if (typeof data.supportOnline === 'boolean') setSupportOnline(data.supportOnline);
            if (Array.isArray(data.messages)) {
              setMessages(data.messages);
            }
          } else if (data.type === 'presence' && typeof data.supportOnline === 'boolean') {
            setSupportOnline(data.supportOnline);
          } else if (data.type === 'chat:message' && data.message) {
            const incoming = data.message as LiveChatMessage;
            setMessages((prev) => (prev.some((m) => m.id === incoming.id) ? prev : [...prev, incoming]));
            if (incoming.sender === 'support' && (!isOpenRef.current || isMinimizedRef.current)) {
              setUnreadCount((c) => c + 1);
            }
          }
        } catch {
          // ignore malformed payload
        }
      };

      ws.onclose = () => {
        setConnected(false);
        wsRef.current = null;
        if (sessionIdRef.current && sessionTokenRef.current) {
          reconnectTimerRef.current = window.setTimeout(() => {
            if (sessionIdRef.current && sessionTokenRef.current) {
              connectSocket(sessionIdRef.current, sessionTokenRef.current);
            }
          }, 3500);
        }
      };
    } catch {
      setConnected(false);
    }
  }, []);

  const ensureSession = useCallback(async (): Promise<{ sid: string; token: string } | null> => {
    if (sessionIdRef.current && sessionTokenRef.current) {
      connectSocket(sessionIdRef.current, sessionTokenRef.current);
      return { sid: sessionIdRef.current, token: sessionTokenRef.current };
    }

    try {
      const res = await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim() || 'Guest Visitor',
          customerContact: customerContact.trim(),
          language: lang,
        }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (data.sessionId && data.sessionToken) {
        sessionIdRef.current = data.sessionId;
        sessionTokenRef.current = data.sessionToken;
        setSessionId(data.sessionId);
        if (typeof data.supportOnline === 'boolean') setSupportOnline(data.supportOnline);
        if (Array.isArray(data.messages)) setMessages(data.messages);
        connectSocket(data.sessionId, data.sessionToken);
        return { sid: data.sessionId, token: data.sessionToken };
      }
    } catch {
      return null;
    }
    return null;
  }, [connectSocket, customerContact, customerName, lang]);

  useEffect(() => {
    return () => {
      if (reconnectTimerRef.current) window.clearTimeout(reconnectTimerRef.current);
      wsRef.current?.close();
    };
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
    void ensureSession();
  }, [ensureSession]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => {
      const next = !prev;
      if (!next) setUnreadCount(0);
      return next;
    });
  }, []);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text) return;
      const session = await ensureSession();
      if (!session) return;

      const msgId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const optimistic: LiveChatMessage = {
        id: msgId,
        sender: 'customer',
        senderName: customerName.trim() || 'You',
        text,
        createdAtUtc: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimistic]);

      const sendOverSocket = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(
            JSON.stringify({
              type: 'customer:message',
              id: msgId,
              text,
              senderName: customerName.trim() || 'Guest Visitor',
              contact: customerContact.trim(),
            })
          );
          return true;
        }
        return false;
      };

      if (!sendOverSocket()) {
        // Wait briefly for freshly created WebSocket to open
        window.setTimeout(() => {
          sendOverSocket();
        }, 450);
      }
    },
    [customerContact, customerName, ensureSession]
  );

  return (
    <ChatContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
