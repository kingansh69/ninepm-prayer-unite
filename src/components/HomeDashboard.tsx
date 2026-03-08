import { motion } from "framer-motion";
import { Play, Bell, Share2, Globe, BellOff, Check, Flame, Calendar } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { getUser, updateUser, prayedToday, prayedYesterday, getPrayerStreak } from "@/lib/storage";
import { getLanguageByCode } from "@/lib/languages";
import { useState, useEffect } from "react";
import heroCross from "@/assets/hero-cross.png";

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

  const didPrayToday = prayedToday();
  const didPrayYesterday = prayedYesterday();
  const streak = getPrayerStreak();

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
        if (navigator.vibrate) navigator.vibrate(50);
      }
    } else {
      setReminderEnabled(false);
      updateUser({ reminderEnabled: false });
    }
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen relative z-10 px-4 pt-6 pb-28 max-w-lg mx-auto"
    >
      {/* Header with cross */}
      <motion.div variants={item} className="text-center mb-5">
        <motion.img
          src={heroCross}
          alt=""
          className="w-10 h-10 object-contain mx-auto mb-2 opacity-60"
          animate={{ 
            filter: [
              "drop-shadow(0 0 8px hsl(40 70% 55% / 0.2))",
              "drop-shadow(0 0 16px hsl(40 70% 55% / 0.4))",
              "drop-shadow(0 0 8px hsl(40 70% 55% / 0.2))",
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em] mb-1">Tonight's Prayer</p>
        <h1 className="text-3xl font-display font-light text-gradient-gold">
          The 9PM Prayer
        </h1>
      </motion.div>

      {/* Countdown */}
      <motion.div variants={item} className="flex justify-center mb-6">
        <CountdownTimer />
      </motion.div>

      {/* Prayer History Card */}
      <motion.div variants={item} className="glass-panel-elevated p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {didPrayToday ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-primary" />
                </motion.div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-muted-foreground/60" />
                </div>
              )}
              <div>
                <p className="text-sm text-foreground font-medium">
                  {didPrayToday ? "Prayed tonight ✓" : "Not yet prayed today"}
                </p>
                <p className="text-xs text-muted-foreground/60">
                  {didPrayYesterday ? "Prayed yesterday ✓" : "Missed yesterday"}
                </p>
              </div>
            </div>
          </div>
          {streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary/10 border border-primary/20 gold-glow"
            >
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-gradient-gold">{streak}</span>
              <span className="text-[10px] text-muted-foreground/60">day{streak !== 1 ? "s" : ""}</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Hero Play Card */}
      <motion.div variants={item}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPlayPrayer}
          className={`w-full glass-panel-elevated p-6 mb-4 flex items-center gap-5 transition-all duration-500 ${
            isPrayerTime ? "border-primary/50 gold-glow-strong" : ""
          }`}
        >
          <motion.div
            animate={isPrayerTime ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
              isPrayerTime
                ? "btn-premium"
                : "bg-primary/15 border border-primary/20"
            }`}
          >
            <Play className={`w-6 h-6 ml-0.5 relative z-10 ${isPrayerTime ? "text-primary-foreground" : "text-primary"}`} />
          </motion.div>
          <div className="text-left flex-1">
            <p className="text-lg font-display text-foreground">
              {isPrayerTime ? "Join Prayer Now" : didPrayToday ? "Pray Again" : "Tonight's Prayer"}
            </p>
            <p className="text-sm text-muted-foreground/70 mt-0.5">
              {selectedLang
                ? `${selectedLang.flag} ${selectedLang.nativeName}`
                : "Tap to select a language"}
            </p>
          </div>
          {isPrayerTime && (
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-primary"
              style={{ boxShadow: "0 0 8px hsl(var(--gold) / 0.5)" }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Language Selection */}
        <motion.button
          variants={item}
          whileTap={{ scale: 0.97 }}
          onClick={onSelectLanguage}
          className="glass-panel-elevated p-4 flex flex-col items-center gap-3 text-center"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-foreground font-medium">Language</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">
              {selectedLang ? `${selectedLang.flag} ${selectedLang.name}` : "Choose"}
            </p>
          </div>
        </motion.button>

        {/* Share */}
        <motion.button
          variants={item}
          whileTap={{ scale: 0.97 }}
          onClick={onShare}
          className="glass-panel-elevated p-4 flex flex-col items-center gap-3 text-center"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Share2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-foreground font-medium">Invite</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">Share the prayer</p>
          </div>
        </motion.button>
      </div>

      {/* Reminder Card */}
      <motion.button
        variants={item}
        whileTap={{ scale: 0.98 }}
        onClick={toggleReminder}
        className="w-full glass-panel-elevated p-4 mb-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            {reminderEnabled ? (
              <Bell className="w-5 h-5 text-primary" />
            ) : (
              <BellOff className="w-5 h-5 text-muted-foreground/60" />
            )}
          </div>
          <div className="text-left">
            <p className="text-sm text-foreground font-medium">9PM Reminder</p>
            <p className="text-xs text-muted-foreground/60">
              {reminderEnabled ? "Active • 9:00 PM daily" : "Tap to enable"}
            </p>
          </div>
        </div>
        <div
          className={`w-12 h-7 rounded-full transition-all duration-300 flex items-center px-1 ${
            reminderEnabled ? "bg-primary" : "bg-muted"
          }`}
        >
          <motion.div
            animate={{ x: reminderEnabled ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`w-5 h-5 rounded-full ${
              reminderEnabled ? "bg-primary-foreground" : "bg-muted-foreground/50"
            }`}
          />
        </div>
      </motion.button>

      {/* Mission */}
      <motion.div variants={item} className="text-center px-6">
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-4" />
        <p className="text-sm text-muted-foreground/50 font-display italic leading-relaxed">
          "For where two or three gather in my name,
          <br />
          there am I with them."
        </p>
        <p className="text-[10px] text-muted-foreground/30 mt-2 tracking-wider uppercase">Matthew 18:20</p>
      </motion.div>
    </motion.div>
  );
};

export default HomeDashboard;
