import { motion } from "framer-motion";
import { User, Globe, Bell, Share2, ExternalLink, Info, LogOut, Download } from "lucide-react";
import { getUser, updateUser, clearUser } from "@/lib/storage";
import { getLanguageByCode } from "@/lib/languages";
import { useState, useEffect } from "react";

interface ProfileScreenProps {
  onSelectLanguage: () => void;
  onShare: () => void;
  onLogout: () => void;
}

const ProfileScreen = ({ onSelectLanguage, onShare, onLogout }: ProfileScreenProps) => {
  const user = getUser();
  const [reminderEnabled, setReminderEnabled] = useState(user?.reminderEnabled ?? false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const selectedLang = user?.selectedLanguage ? getLanguageByCode(user.selectedLanguage) : null;

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const toggleReminder = async () => {
    if (!reminderEnabled && "Notification" in window) {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        setReminderEnabled(true);
        updateUser({ reminderEnabled: true });
      }
    } else {
      setReminderEnabled(false);
      updateUser({ reminderEnabled: false });
    }
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen relative z-10 px-4 pt-8 pb-24 max-w-lg mx-auto"
    >
      {/* Profile header */}
      <motion.div variants={item} className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 gold-glow">
          <User className="w-9 h-9 text-primary" />
        </div>
        <h2 className="text-2xl font-display text-foreground gold-text-glow">Your Profile</h2>
        {user && (
          <p className="text-sm text-muted-foreground mt-1">
            {user.countryCode} {user.phoneNumber}
          </p>
        )}
      </motion.div>

      {/* Settings items */}
      <div className="space-y-3">
        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectLanguage}
          className="w-full glass-panel p-4 flex items-center gap-4 hover:border-primary/30 transition-colors"
        >
          <Globe className="w-5 h-5 text-primary shrink-0" />
          <div className="text-left flex-1">
            <p className="text-sm text-foreground">Prayer Language</p>
            <p className="text-xs text-muted-foreground">
              {selectedLang ? `${selectedLang.flag} ${selectedLang.name}` : "Not selected"}
            </p>
          </div>
        </motion.button>

        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={toggleReminder}
          className="w-full glass-panel p-4 flex items-center justify-between hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-primary shrink-0" />
            <div className="text-left">
              <p className="text-sm text-foreground">Daily Reminder</p>
              <p className="text-xs text-muted-foreground">
                {reminderEnabled ? "9:00 PM daily" : "Off"}
              </p>
            </div>
          </div>
          <div className={`w-12 h-7 rounded-full transition-all duration-300 flex items-center px-1 ${reminderEnabled ? "bg-primary" : "bg-muted"}`}>
            <div className={`w-5 h-5 rounded-full transition-all duration-300 ${reminderEnabled ? "translate-x-5 bg-primary-foreground" : "bg-muted-foreground/50"}`} />
          </div>
        </motion.button>

        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={onShare}
          className="w-full glass-panel p-4 flex items-center gap-4 hover:border-primary/30 transition-colors"
        >
          <Share2 className="w-5 h-5 text-primary shrink-0" />
          <div className="text-left">
            <p className="text-sm text-foreground">Invite Friends</p>
            <p className="text-xs text-muted-foreground">
              {user && user.shareCount > 0 ? `Shared ${user.shareCount} times` : "Share the prayer"}
            </p>
          </div>
        </motion.button>

        {deferredPrompt && (
          <motion.button
            variants={item}
            whileTap={{ scale: 0.98 }}
            onClick={handleInstall}
            className="w-full glass-panel p-4 flex items-center gap-4 hover:border-primary/30 transition-colors"
          >
            <Download className="w-5 h-5 text-primary shrink-0" />
            <div className="text-left">
              <p className="text-sm text-foreground">Install App</p>
              <p className="text-xs text-muted-foreground">Add to home screen</p>
            </div>
          </motion.button>
        )}

        <motion.div variants={item} className="glass-panel p-4 flex items-start gap-4">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground mb-1">About</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The 9PM Prayer unites people around the world in praying the Lord's Prayer every night at 9PM local time. One prayer. One world. Every night.
            </p>
          </div>
        </motion.div>

        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full glass-panel p-4 flex items-center gap-4 hover:border-destructive/30 transition-colors"
        >
          <LogOut className="w-5 h-5 text-destructive shrink-0" />
          <p className="text-sm text-destructive">Sign Out</p>
        </motion.button>
      </div>

      <motion.div variants={item} className="text-center mt-8">
        <p className="text-xs text-muted-foreground/40">
          {user?.timezone}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ProfileScreen;
