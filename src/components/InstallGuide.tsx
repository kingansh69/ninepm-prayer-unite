import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Smartphone, Plus, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

interface InstallGuideProps {
  open: boolean;
  onClose: () => void;
}

const iosSteps = [
  {
    title: "Tap the Share button",
    description: "Find the share icon at the bottom of your Safari browser (the square with an arrow pointing up).",
    icon: "share",
  },
  {
    title: "Add to Home Screen",
    description: 'Scroll down in the share menu and tap "Add to Home Screen".',
    icon: "plus",
  },
  {
    title: 'Tap "Add"',
    description: 'Confirm by tapping "Add" in the top right corner. The app will appear on your home screen!',
    icon: "phone",
  },
];

const androidSteps = [
  {
    title: "Tap the menu",
    description: "Tap the three dots (⋮) in the top right of your browser.",
    icon: "menu",
  },
  {
    title: "Install App or Add to Home Screen",
    description: 'Look for "Install app" or "Add to Home screen" in the menu.',
    icon: "plus",
  },
  {
    title: "Confirm install",
    description: 'Tap "Install" to add the app. It will appear on your home screen like a real app!',
    icon: "phone",
  },
];

const StepIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "share": return <ArrowUp className="w-8 h-8 text-foreground" />;
    case "plus": return <Plus className="w-4 h-4 text-foreground" />;
    case "menu": return <span className="text-foreground text-2xl">⋮</span>;
    default: return <span className="text-primary text-xl font-display">✝</span>;
  }
};

const StepVisual = ({ type, step }: { type: string; step: number }) => {
  if (step === 2) {
    return (
      <div className="flex items-center gap-3 mx-auto w-fit">
        <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center gold-glow">
          <span className="text-primary text-xl font-display">✝</span>
        </div>
        <div>
          <p className="text-sm text-foreground font-medium">9PM Prayer</p>
          <p className="text-xs text-muted-foreground">On your home screen</p>
        </div>
      </div>
    );
  }
  if (type === "plus") {
    return (
      <div className="glass-panel px-4 py-3 flex items-center gap-3 mx-auto max-w-[220px]">
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <Plus className="w-4 h-4 text-foreground" />
        </div>
        <span className="text-sm text-foreground">
          {type === "plus" ? "Add to Home Screen" : "Install app"}
        </span>
      </div>
    );
  }
  return (
    <div className="w-16 h-16 rounded-2xl bg-secondary/80 flex items-center justify-center mx-auto">
      <StepIcon type={type} />
    </div>
  );
};

const InstallGuide = forwardRef<HTMLDivElement, InstallGuideProps>(({ open, onClose }, ref) => {
  const [step, setStep] = useState(0);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      onClose();
    }
  };

  if (!open) return null;

  const steps = isIOS ? iosSteps : androidSteps;
  const currentStep = steps[step];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-lg glass-panel rounded-b-none p-6 pb-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-xl font-display text-foreground gold-text-glow mb-1">
            Install the App
          </h3>
          <p className="text-xs text-muted-foreground">
            {isIOS ? "Safari on iPhone" : "Chrome on Android"}
          </p>
        </div>

        {deferredPrompt && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleNativeInstall}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-medium text-base mb-6 gold-glow transition-all"
          >
            Install Now
          </motion.button>
        )}

        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="mb-6">
              <StepVisual type={currentStep.icon} step={step} />
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-3">
              <span className="text-sm text-primary font-semibold">{step + 1}</span>
            </div>
            <h4 className="text-lg font-display text-foreground mb-2">{currentStep.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
              {currentStep.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 rounded-xl bg-secondary/50 text-foreground font-medium text-sm transition-colors hover:bg-secondary/70"
            >
              Back
            </button>
          )}
          <button
            onClick={() => {
              if (step < steps.length - 1) setStep(step + 1);
              else onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-all gold-glow"
          >
            {step < steps.length - 1 ? "Next" : "Got it!"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
});

InstallGuide.displayName = "InstallGuide";

export default InstallGuide;
