import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Moon, Globe, Users } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Moon,
    title: "Nightly Prayer",
    description: "Every night at 9PM, join thousands around the world in praying the Lord's Prayer together.",
    accent: "Unite in faith at the same moment, across every timezone.",
  },
  {
    icon: Globe,
    title: "Your Language",
    description: "Choose from 12+ languages to pray in the tongue closest to your heart.",
    accent: "From English to Arabic, Hindi to Swahili.",
  },
  {
    icon: Users,
    title: "Invite Others",
    description: "Share the prayer with friends and family. The more who pray, the stronger we become.",
    accent: "One prayer. One world. Every night.",
  },
];

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[step];
  const Icon = slide.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 max-w-lg mx-auto"
    >
      {/* Progress dots */}
      <div className="absolute top-8 flex gap-2">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === step ? 24 : 8,
              backgroundColor: i === step ? "hsl(var(--primary))" : "hsl(var(--muted))",
            }}
            className="h-2 rounded-full transition-all"
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-8 gold-glow"
          >
            <Icon className="w-9 h-9 text-primary" />
          </motion.div>

          <h2 className="text-3xl font-display font-light text-foreground gold-text-glow mb-4">
            {slide.title}
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-3 max-w-xs">
            {slide.description}
          </p>
          <p className="text-primary/70 text-sm font-display italic">
            {slide.accent}
          </p>
        </motion.div>
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleNext}
        className="mt-16 w-full max-w-xs py-4 rounded-2xl bg-primary text-primary-foreground font-medium text-lg tracking-wide gold-glow transition-all"
      >
        {step < slides.length - 1 ? "Next" : "Get Started"}
      </motion.button>

      {step < slides.length - 1 && (
        <button
          onClick={onComplete}
          className="mt-4 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors"
        >
          Skip
        </button>
      )}
    </motion.div>
  );
};

export default OnboardingFlow;
