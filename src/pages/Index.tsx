import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import LandingScreen from "@/components/LandingScreen";
import LanguageSelection from "@/components/LanguageSelection";
import VideoPlayer from "@/components/VideoPlayer";
import SettingsPanel from "@/components/SettingsPanel";
import type { Language } from "@/components/LanguageSelection";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

type Screen = "landing" | "languages" | "player";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSelectLanguage = (lang: Language) => {
    setSelectedLanguage(lang);
    setScreen("player");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleField />

      {/* Settings button */}
      {screen !== "landing" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSettingsOpen(true)}
          className="fixed top-4 right-4 z-40 p-2.5 rounded-full bg-secondary/50 backdrop-blur-sm text-foreground/70 hover:text-foreground transition-colors"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {screen === "landing" && (
          <LandingScreen key="landing" onBegin={() => setScreen("languages")} />
        )}
        {screen === "languages" && (
          <LanguageSelection
            key="languages"
            onSelectLanguage={handleSelectLanguage}
            onBack={() => setScreen("landing")}
          />
        )}
        {screen === "player" && selectedLanguage && (
          <VideoPlayer
            key="player"
            language={selectedLanguage}
            onBack={() => setScreen("languages")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {settingsOpen && (
          <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
