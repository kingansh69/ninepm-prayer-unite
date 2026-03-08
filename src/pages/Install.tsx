import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Smartphone, Plus, ArrowUp, X, ChevronRight } from "lucide-react";
import ParticleField from "@/components/ParticleField";
import { useNavigate } from "react-router-dom";

const Install = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [activeTab, setActiveTab] = useState<"iphone" | "android">("iphone");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua);
    setIsIOS(ios);
    setActiveTab(ios ? "iphone" : "android");

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  const iosSteps = [
    {
      icon: <Share2 className="w-6 h-6 text-primary" />,
      title: "Tap the Share button",
      description: "Find the share icon at the bottom of Safari (square with arrow pointing up).",
    },
    {
      icon: <Plus className="w-6 h-6 text-primary" />,
      title: 'Tap "Add to Home Screen"',
      description: "Scroll down in the share menu and select this option.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      title: 'Tap "Add"',
      description: "Confirm in the top right corner. The app will appear on your home screen!",
    },
  ];

  const androidSteps = [
    {
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      title: "Tap the menu ⋮",
      description: "Tap the three dots in the top right corner of Chrome.",
    },
    {
      icon: <Plus className="w-6 h-6 text-primary" />,
      title: '"Install App" or "Add to Home Screen"',
      description: "Look for either option in the dropdown menu.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      title: 'Tap "Install"',
      description: "Confirm the installation. It will appear on your home screen like a native app!",
    },
  ];

  const steps = activeTab === "iphone" ? iosSteps : androidSteps;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleField />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 min-h-screen px-4 py-10 max-w-lg mx-auto flex flex-col"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 gold-glow"
          >
            <Smartphone className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-display text-foreground gold-text-glow mb-2">
            Install the App
          </h1>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Add 9PM Prayer to your home screen for the best experience — no app store needed.
          </p>
        </div>

        {/* Native install button */}
        {deferredPrompt && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNativeInstall}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base mb-8 gold-glow"
          >
            ✨ Install Now — One Tap
          </motion.button>
        )}

        {/* Tab selector */}
        <div className="flex gap-2 mb-6">
          {(["iphone", "android"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground gold-glow"
                  : "glass-panel text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "iphone" ? "🍎 iPhone" : "🤖 Android"}
            </button>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-3 flex-1"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-4 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-0.5">{step.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {step.icon}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate("/")}
          className="mt-8 py-3 rounded-xl glass-panel text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
        >
          ← Back to App
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Install;
