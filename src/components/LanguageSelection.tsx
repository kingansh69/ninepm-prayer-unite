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

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative z-10 px-4 pt-8 pb-28 max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="flex items-center mb-8">
        {showBackButton && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2.5 rounded-full bg-secondary/50 backdrop-blur-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        )}
        <div className={`flex-1 text-center ${showBackButton ? "pr-10" : ""}`}>
          <h2 className="text-2xl font-display font-light text-gradient-gold">
            Choose Language
          </h2>
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-2 mb-1" />
          <p className="text-xs text-muted-foreground/60">Select your prayer language</p>
        </div>
      </div>

      {/* Language Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3"
      >
        {languages.map((lang) => {
          const isSelected = currentLang === lang.code;
          return (
            <motion.button
              key={lang.code}
              variants={item}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(lang)}
              className={`glass-panel-elevated p-5 flex flex-col items-center gap-2.5 transition-all duration-300 relative overflow-hidden ${
                isSelected ? "border-primary/50 gold-glow" : ""
              }`}
            >
              {/* Shimmer on selected */}
              {isSelected && (
                <div className="absolute inset-0 shimmer pointer-events-none" />
              )}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-primary-foreground" />
                </motion.div>
              )}
              <span className="text-4xl">{lang.flag}</span>
              <span className="text-foreground font-medium text-sm">{lang.nativeName}</span>
              <span className="text-muted-foreground/60 text-[10px] uppercase tracking-wider">{lang.name}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default LanguageSelection;
export type { Language };
