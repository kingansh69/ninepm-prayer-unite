import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  videoId: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", videoId: "ehPMHq6M-1k" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", videoId: "G1XJ5lRXBBE" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", videoId: "jPJnGymS-8Q" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷", videoId: "6bT1jFLCNvs" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", videoId: "E6pXczMoeIA" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", videoId: "0P9RF6EFzRk" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", videoId: "0P9RF6EFzRk" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", videoId: "0P9RF6EFzRk" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", videoId: "0P9RF6EFzRk" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", videoId: "0P9RF6EFzRk" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪", videoId: "0P9RF6EFzRk" },
  { code: "tl", name: "Filipino", nativeName: "Tagalog", flag: "🇵🇭", videoId: "0P9RF6EFzRk" },
];

interface LanguageSelectionProps {
  onSelectLanguage: (lang: Language) => void;
  onBack: () => void;
}

const LanguageSelection = ({ onSelectLanguage, onBack }: LanguageSelectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative z-10 px-4 py-8 max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="flex items-center mb-8">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-2 rounded-full bg-secondary/50 text-foreground/70 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <div className="flex-1 text-center pr-9">
          <h2 className="text-2xl font-display font-light text-foreground">Choose Language</h2>
          <p className="text-sm text-muted-foreground mt-1">Select your prayer language</p>
        </div>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-2 gap-3">
        {languages.map((lang, i) => (
          <motion.button
            key={lang.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectLanguage(lang)}
            className="glass-panel p-4 flex flex-col items-center gap-2 transition-all duration-300 hover:border-primary/30 hover:gold-glow"
          >
            <span className="text-3xl">{lang.flag}</span>
            <span className="text-foreground font-medium text-sm">{lang.nativeName}</span>
            <span className="text-muted-foreground text-xs">{lang.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default LanguageSelection;
export type { Language };
