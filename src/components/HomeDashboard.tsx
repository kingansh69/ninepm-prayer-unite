import { motion } from "framer-motion";
import { Play, Bell, Share2, Globe, BellOff } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { getUser, updateUser } from "@/lib/storage";
import { getLanguageByCode } from "@/lib/languages";
import { useState, useEffect } from "react";

interface HomeDashboardProps {
  onPlayPrayer: () => void;
  onSelectLanguage: () => void;
  onShare: () => void;
}

const HomeDashboard = ({ onPlayPrayer, onSelectLanguage, onShare }: HomeDashboardProps) => {
  const user = getUser();
  const [reminderEnabled, setReminderEnabled] = useState(user?.reminderEnabled ?? false);
  const selectedLang = user?.selectedLanguage ? getLanguageByCode(user.selectedLanguage) : null;
  const [isPrayerTime, setIsPrayerTime] = useState(false);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      setIsPrayerTime(h === 21 && m < 10);
    };
    check();
    const i = setInterval(check, 10000);
    return () => clearInterval(i);
  }, []);

  const toggleReminder = async () => {
    if (!reminderEnabled && "Notification" in window) {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        setReminderEnabled(true);
        updateUser({ reminderEnabled: true });
        // Vibrate on enable
        if (navigator.vibrate) navigator.vibrate(50);
      }
    } else {
      setReminderEnabled(false);
      updateUser({ reminderEnabled: false });
    }
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen relative z-10 px-4 pt-6 pb-24 max-w-lg mx-auto"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Tonight</p>
        <h1 className="text-3xl font-display font-light text-foreground gold-text-glow">
          The 9PM Prayer
        </h1>
      </motion.div>

      {/* Countdown */}
      <motion.div variants={item} className="flex justify-center mb-8">
        <CountdownTimer />
      </motion.div>

      {/* Hero Play Card */}
      <motion.div variants={item}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPlayPrayer}
          className={`w-full glass-panel p-6 mb-4 flex items-center gap-5 transition-all duration-300 ${
            isPrayerTime ? "border-primary/50 gold-glow" : "hover:border-primary/30"
          }`}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
            isPrayerTime
              ? "bg-primary text-primary-foreground"
              : "bg-primary/15 text-primary"
          }`}>
            <Play className="w-6 h-6 ml-0.5" />
          </div>
          <div className="text-left flex-1">
            <p className="text-lg font-display text-foreground">
              {isPrayerTime ? "Join Prayer Now" : "Tonight's Prayer"}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {selectedLang
                ? `${selectedLang.flag} ${selectedLang.nativeName}`
                : "Tap to select a language"}
            </p>
          </div>
          {isPrayerTime && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-primary"
            />
          )}
        </motion.button>
      </motion.div>

      {/* Language Selection */}
      <motion.button
        variants={item}
        whileTap={{ scale: 0.98 }}
        onClick={onSelectLanguage}
        className="w-full glass-panel p-4 mb-4 flex items-center gap-4 hover:border-primary/30 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        <div className="text-left flex-1">
          <p className="text-sm text-foreground">Prayer Language</p>
          <p className="text-xs text-muted-foreground">
            {selectedLang ? `${selectedLang.flag} ${selectedLang.name}` : "Choose language"}
          </p>
        </div>
      </motion.button>

      {/* Reminder Card */}
      <motion.button
        variants={item}
        whileTap={{ scale: 0.98 }}
        onClick={toggleReminder}
        className="w-full glass-panel p-4 mb-4 flex items-center justify-between hover:border-primary/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            {reminderEnabled ? (
              <Bell className="w-5 h-5 text-primary" />
            ) : (
              <BellOff className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div className="text-left">
            <p className="text-sm text-foreground">9PM Reminder</p>
            <p className="text-xs text-muted-foreground">
              {reminderEnabled ? "Active • 9:00 PM daily" : "Tap to enable"}
            </p>
          </div>
        </div>
        <div
          className={`w-12 h-7 rounded-full transition-all duration-300 flex items-center px-1 ${
            reminderEnabled ? "bg-primary" : "bg-muted"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full transition-all duration-300 ${
              reminderEnabled
                ? "translate-x-5 bg-primary-foreground"
                : "bg-muted-foreground/50"
            }`}
          />
        </div>
      </motion.button>

      {/* Share Card */}
      <motion.button
        variants={item}
        whileTap={{ scale: 0.98 }}
        onClick={onShare}
        className="w-full glass-panel p-4 mb-6 flex items-center gap-4 hover:border-primary/30 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Share2 className="w-5 h-5 text-primary" />
        </div>
        <div className="text-left flex-1">
          <p className="text-sm text-foreground">Invite Friends & Family</p>
          <p className="text-xs text-muted-foreground">Share the 9PM Prayer</p>
        </div>
      </motion.button>

      {/* Mission */}
      <motion.div variants={item} className="text-center px-4">
        <p className="text-sm text-muted-foreground/60 font-display italic leading-relaxed">
          "For where two or three gather in my name,
          <br />
          there am I with them."
        </p>
        <p className="text-xs text-muted-foreground/40 mt-2">Matthew 18:20</p>
      </motion.div>
    </motion.div>
  );
};

export default HomeDashboard;
