import { motion } from "framer-motion";
import { Bell, Share2, X, Clock, Download } from "lucide-react";
import { useState, useEffect } from "react";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

const SettingsPanel = ({ open, onClose }: SettingsPanelProps) => {
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const toggleReminder = async () => {
    if (!reminderEnabled) {
      if ("Notification" in window) {
        const perm = await Notification.requestPermission();
        if (perm === "granted") {
          setReminderEnabled(true);
          // Schedule with service worker would happen here
          localStorage.setItem("prayer-reminder", "true");
        }
      }
    } else {
      setReminderEnabled(false);
      localStorage.removeItem("prayer-reminder");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "The 9PM Prayer",
      text: "Join me in the Lord's Prayer every night at 9PM. Download here:",
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert("Link copied to clipboard!");
      }
    } catch {}
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  if (!open) return null;

  const now = new Date();
  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-lg glass-panel rounded-b-none p-6 pb-10"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display text-foreground">Settings</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timezone Info */}
        <div className="glass-panel p-4 mb-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-sm text-foreground">Your prayer time</p>
            <p className="text-xs text-muted-foreground">9:00 PM · {userTZ}</p>
          </div>
        </div>

        {/* Reminder Toggle */}
        <button
          onClick={toggleReminder}
          className="w-full glass-panel p-4 mb-4 flex items-center justify-between group hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-sm text-foreground">Daily 9PM Reminder</p>
              <p className="text-xs text-muted-foreground">Get notified every night</p>
            </div>
          </div>
          <div className={`w-12 h-7 rounded-full transition-all duration-300 flex items-center px-1 ${reminderEnabled ? "bg-primary" : "bg-secondary"}`}>
            <div className={`w-5 h-5 rounded-full transition-all duration-300 ${reminderEnabled ? "translate-x-5 bg-primary-foreground" : "bg-muted-foreground/50"}`} />
          </div>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="w-full glass-panel p-4 mb-4 flex items-center gap-3 hover:border-primary/30 transition-colors"
        >
          <Share2 className="w-5 h-5 text-primary" />
          <div className="text-left">
            <p className="text-sm text-foreground">Invite Friends</p>
            <p className="text-xs text-muted-foreground">Share the 9PM Prayer</p>
          </div>
        </button>

        {/* Install */}
        {deferredPrompt && (
          <button
            onClick={handleInstall}
            className="w-full glass-panel p-4 flex items-center gap-3 hover:border-primary/30 transition-colors"
          >
            <Download className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-sm text-foreground">Install App</p>
              <p className="text-xs text-muted-foreground">Add to home screen</p>
            </div>
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SettingsPanel;
