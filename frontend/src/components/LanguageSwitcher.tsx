import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'english', flag: '🇺🇸' },
  { code: 'vi', name: 'vietnamese', flag: '🇻🇳' },
];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 glass-button px-3 py-2 rounded-lg text-slate-700 hover:text-slate-900 transition-colors"
        aria-label={t('change_language')}
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:flex items-center space-x-1">
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
        </span>
        <ChevronDown className={clsx(
          "w-4 h-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 w-48 glass-panel rounded-xl p-2 z-50 border border-white/20"
            >
              <div className="px-3 py-2 border-b border-slate-300/30 mb-2">
                <p className="text-slate-800 font-medium text-sm">{t('language')}</p>
              </div>
              
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  whileHover={{ x: 4 }}
                  onClick={() => changeLanguage(language.code)}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all text-left',
                    language.code === i18n.language
                      ? 'bg-blue-100/20 text-blue-800 border border-blue-200/30'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/15'
                  )}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex-1">
                    <span className="text-sm font-medium">
                      {t(language.name)}
                    </span>
                    <div className="text-xs text-slate-500 capitalize">
                      {language.code}
                    </div>
                  </div>
                  {language.code === i18n.language && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
