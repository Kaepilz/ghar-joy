// Language Context for i18n support (Nepali/English)
// Provides translation functionality across the app
import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ne';

interface Translations {
  [key: string]: {
    en: string;
    ne: string;
  };
}

// Translation dictionary for all UI strings
const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', ne: 'गृहपृष्ठ' },
  'nav.products': { en: 'Products', ne: 'उत्पादनहरू' },
  'nav.sell': { en: 'Sell', ne: 'बिक्री गर्नुहोस्' },
  'nav.buzz': { en: 'Community', ne: 'समुदाय' },
  'nav.spin': { en: 'Spin', ne: 'स्पिन' },
  'nav.gifts': { en: 'Gifts', ne: 'उपहारहरू' },
  'nav.cart': { en: 'Cart', ne: 'कार्ट' },
  'nav.profile': { en: 'Profile', ne: 'प्रोफाइल' },
  
  // Common
  'common.save': { en: 'Save', ne: 'सुरक्षित गर्नुहोस्' },
  'common.cancel': { en: 'Cancel', ne: 'रद्द गर्नुहोस्' },
  'common.edit': { en: 'Edit', ne: 'सम्पादन गर्नुहोस्' },
  'common.delete': { en: 'Delete', ne: 'मेटाउनुहोस्' },
  'common.submit': { en: 'Submit', ne: 'पेश गर्नुहोस्' },
  'common.search': { en: 'Search', ne: 'खोज्नुहोस्' },
  'common.loading': { en: 'Loading...', ne: 'लोड गर्दै...' },
  
  // Greetings
  'greeting.morning': { en: 'Good morning', ne: 'शुभ प्रभात' },
  'greeting.afternoon': { en: 'Good afternoon', ne: 'शुभ दिन' },
  'greeting.evening': { en: 'Good evening', ne: 'शुभ साँझ' },
  'greeting.night': { en: 'Hello night owl', ne: 'नमस्ते रात्री जाग्ने' },
  
  // Products
  'product.addToCart': { en: 'Add to Cart', ne: 'कार्टमा थप्नुहोस्' },
  'product.buyNow': { en: 'Buy Now', ne: 'अहिले किन्नुहोस्' },
  'product.condition': { en: 'Condition', ne: 'अवस्था' },
  'product.new': { en: 'New', ne: 'नयाँ' },
  'product.almostNew': { en: 'Almost New', ne: 'लगभग नयाँ' },
  'product.used': { en: 'Used', ne: 'प्रयोग गरिएको' },
  'product.seller': { en: 'Seller', ne: 'विक्रेता' },
  
  // Spinner
  'spinner.title': { en: 'Spin to Win!', ne: 'स्पिन गरेर जित्नुहोस्!' },
  'spinner.spinsLeft': { en: 'Spins Left', ne: 'बाँकी स्पिन' },
  'spinner.spin': { en: 'Spin Now', ne: 'अहिले स्पिन गर्नुहोस्' },
  'spinner.claim': { en: 'Claim Now', ne: 'अहिले दावी गर्नुहोस्' },
  'spinner.youWon': { en: 'You Won', ne: 'तपाईंले जित्नुभयो' },
  
  // Community
  'community.createPost': { en: 'Create Post', ne: 'पोस्ट बनाउनुहोस्' },
  'community.whatsOnMind': { en: "What's on your mind?", ne: 'तपाईंको मनमा के छ?' },
  'community.like': { en: 'Like', ne: 'मन पराउनुहोस्' },
  'community.comment': { en: 'Comment', ne: 'टिप्पणी' },
  'community.share': { en: 'Share', ne: 'साझेदारी' },
  'community.addFriend': { en: 'Add Friend', ne: 'साथी थप्नुहोस्' },
  'community.removeFriend': { en: 'Remove Friend', ne: 'साथी हटाउनुहोस्' },
  'community.mutualFriends': { en: 'mutual friends', ne: 'आपसी साथीहरू' },
  
  // AI
  'ai.mentor.title': { en: 'AI Seller Mentor', ne: 'एआई विक्रेता सल्लाहकार' },
  'ai.bargain.title': { en: 'AI Bargain Bot', ne: 'एआई सौदा बोट' },
  'ai.typing': { en: 'Typing...', ne: 'टाइप गर्दै...' },
  'ai.sendMessage': { en: 'Send message', ne: 'सन्देश पठाउनुहोस्' },
  'ai.acceptSend': { en: 'Accept & Send', ne: 'स्वीकार र पठाउनुहोस्' },
  'ai.editSend': { en: 'Edit & Send', ne: 'सम्पादन र पठाउनुहोस्' },
  'ai.regenerate': { en: 'Regenerate', ne: 'पुन: उत्पन्न' },
  
  // Gifts
  'gifts.title': { en: 'Free Gifts', ne: 'निःशुल्क उपहारहरू' },
  'gifts.bazaarTokens': { en: 'Bazaar Tokens', ne: 'बजार टोकनहरू' },
  'gifts.claimGift': { en: 'Claim Gift', ne: 'उपहार दावी गर्नुहोस्' },
  'gifts.progress': { en: 'Progress', ne: 'प्रगति' },
  'gifts.howToEarn': { en: 'How to Earn', ne: 'कसरी कमाउने' },
  
  // Profile
  'profile.editProfile': { en: 'Edit Profile', ne: 'प्रोफाइल सम्पादन' },
  'profile.friends': { en: 'Friends', ne: 'साथीहरू' },
  'profile.purchases': { en: 'Purchases', ne: 'खरिदहरू' },
  'profile.listings': { en: 'Listings', ne: 'सूचीहरू' },
  'profile.posts': { en: 'Posts', ne: 'पोस्टहरू' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
