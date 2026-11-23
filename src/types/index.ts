export type Language = 'en' | 'ur' | 'ar';

export type ConsultationMethod = 'whatsapp' | 'phone' | 'appointment';

export type CurrencyCode = 'PKR' | 'GBP' | 'USD' | 'EUR' | 'CAD' | 'AUD' | 'AED' | 'SAR';

export interface LocalizedText {
  en: string;
  ur: string;
  ar: string;
}

export interface ServiceFAQ {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface DuaReference {
  title: LocalizedText;
  arabic: string;
  transliteration: string;
  urduTranslation: string;
  englishTranslation: string;
  reference: string;
}

export interface ServiceCategory {
  slug: string;
  order: string;
  domain: 'astrology' | 'islamic-spiritual' | 'counseling';
  title: LocalizedText;
  shortDescription: LocalizedText;
  heroLead: LocalizedText;
  introduction: LocalizedText[];
  pillars: { title: LocalizedText; description: LocalizedText }[];
  processSteps: LocalizedText[];
  ethicalBoundary: LocalizedText;
  image: string;
  imagePosition?: string;
  relatedSlugs: string[];
  faqs: ServiceFAQ[];
  duaReferences?: DuaReference[];
}

export interface ExpertProfile {
  slug: string;
  isSampleProfile: boolean;
  name: LocalizedText;
  title: LocalizedText;
  primarySpeciality: LocalizedText;
  serviceSlugs: string[];
  domain: 'astrology' | 'islamic-spiritual' | 'counseling';
  yearsExperienceLabel: LocalizedText;
  experienceYears: number;
  qualifications: LocalizedText[];
  languages: Language[];
  consultationMethods: ConsultationMethod[];
  availabilityLabel: LocalizedText;
  availabilityWindowPkt: string;
  availableForBooking: boolean;
  feePkr: number;
  sessionDurationMinutes: number;
  location: LocalizedText;
  bio: LocalizedText;
  approach: LocalizedText;
  whatsappNumber: string; // International format without +
  phoneNumber: string; // International display format with +
  photo: string;
  badges: ('verified-criteria' | 'experienced-specialist' | 'featured-sample')[];
}

export interface ZodiacSignData {
  slug: string;
  symbol: string;
  order: number;
  startDegree: number;
  dateRange: LocalizedText;
  name: LocalizedText;
  element: LocalizedText;
  modality: LocalizedText;
  rulingPlanet: LocalizedText;
  summary: LocalizedText;
  strengths: LocalizedText[];
  reflectionPrompt: LocalizedText;
  compatibleSlugs: string[];
}

export interface KnowledgeArticle {
  slug: string;
  category: 'astrology' | 'islamic-spiritual' | 'istikhara' | 'dua-wazifa' | 'numerology' | 'family';
  categoryLabel: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  readMinutes: number;
  updatedDate: string;
  image: string;
  sections: {
    heading: LocalizedText;
    body: LocalizedText;
  }[];
  relatedServiceSlug: string;
}

export interface ToolDefinition {
  slug: string;
  category: 'astronomy' | 'numerology' | 'calendar';
  title: LocalizedText;
  shortDescription: LocalizedText;
  methodologyNote: LocalizedText;
}
