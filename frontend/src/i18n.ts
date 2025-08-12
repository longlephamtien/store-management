import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en.json';
import viTranslations from './locales/vi.json';

// Get saved language from localStorage or detect browser language
const getInitialLanguage = (): string => {
  // First, check localStorage
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && ['en', 'vi'].includes(savedLanguage)) {
    return savedLanguage;
  }

  // Then, try to detect browser language
  const browserLanguage = navigator.language.toLowerCase();
  if (browserLanguage.startsWith('vi')) {
    return 'vi';
  }
  
  // Default to English
  return 'en';
};

const resources = {
  en: {
    translation: enTranslations,
  },
  vi: {
    translation: viTranslations,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getInitialLanguage(), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: 'en', // use en if detected lng is not available

    interpolation: {
      escapeValue: false, // react already does escaping
    },

    // Options for react-i18next
    react: {
      useSuspense: false, // Set to false to avoid suspense issues with SSR
    },
  });

// Save language preference to localStorage whenever it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
