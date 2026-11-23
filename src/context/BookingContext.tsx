import React, { createContext, useContext, useState } from 'react';
import type { ConsultationMethod, Language } from '../types';

export interface BookingPrefill {
  serviceSlug?: string;
  expertSlug?: string;
  language?: Language;
  consultationType?: ConsultationMethod;
}

interface BookingContextValue {
  isOpen: boolean;
  prefill: BookingPrefill;
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});

  const openBooking = (nextPrefill: BookingPrefill = {}) => {
    setPrefill(nextPrefill);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider value={{ isOpen, prefill, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return ctx;
}
