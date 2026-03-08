import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { languages, type Language } from "@/lib/languages";
import { getUser, updateUser } from "@/lib/storage";

interface LanguageSelectionProps {
  onSelectLanguage: (lang: Language) => void;
  onBack: () => void;
  showBackButton?: boolean;
}

const LanguageSelection = ({ onSelectLanguage, onBack, showBackButton = true }: LanguageSelectionProps) => {
  const user = getUser();
  const currentLang = user?.selectedLanguage;

  const handleSelect = (lang: Language) => {
    updateUser({ selectedLanguage: lang.code });
    onSelectLanguage(lang);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative z-10 px-4 pt-8 pb-24 max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="flex items-center mb-8">
        {showBackButton && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 rounded-full bg-secondary/50 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        )}
        <div className={`flex-1 text-center ${showBackButton ? "pr-9" : ""}`}>
          <h2 className="text-2xl font-display font-light text-foreground gold-text-glow">
            Choose Language
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Select your prayer language</p>
        </div>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-2 gap-3">
        {languages.map((lang, i) => {
          const isSelected = currentLang === lang.code;
          return (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(lang)}
              className={`glass-panel p-4 flex flex-col items-center gap-2 transition-all duration-300 relative ${
                isSelected
                  ? "border-primary/50 gold-glow"
                  : "hover:border-primary/30"
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
              <span className="text-3xl">{lang.flag}</span>
              <span className="text-foreground font-medium text-sm">{lang.nativeName}</span>
              <span className="text-muted-foreground text-xs">{lang.name}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default LanguageSelection;
export type { Language };
