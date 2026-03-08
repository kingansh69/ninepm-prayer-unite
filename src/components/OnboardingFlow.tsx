import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import onboardingMoon from "@/assets/onboarding-moon.png";
import onboardingGlobe from "@/assets/onboarding-globe.png";
import onboardingUnity from "@/assets/onboarding-unity.png";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const slides = [
  {
    image: onboardingMoon,
    title: "Nightly Prayer",
    description: "Every night at 9PM, join thousands around the world in praying the Lord's Prayer together.",
    accent: "Unite in faith at the same moment, across every timezone.",
  },
  {
    image: onboardingGlobe,
    title: "Your Language",
    description: "Choose from 12+ languages to pray in the tongue closest to your heart.",
    accent: "From English to Arabic, Hindi to Swahili.",
  },
  {
    image: onboardingUnity,
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-between px-6 py-12 relative z-10 max-w-lg mx-auto"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial-gold pointer-events-none" />

      {/* Progress dots */}
      <div className="flex gap-3 relative z-10">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === step ? 28 : 8,
              backgroundColor: i === step ? "hsl(var(--primary))" : "hsl(var(--muted))",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="h-2 rounded-full"
          />
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center flex-1 justify-center relative z-10"
        >
          {/* Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="relative mb-10"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-44 h-44 object-contain drop-shadow-[0_0_30px_hsl(var(--gold)/0.3)]"
            />
            {/* Glow behind */}
            <div className="absolute inset-0 rounded-full bg-primary/5 blur-[40px] -z-10 scale-150" />
          </motion.div>

          <h2 className="text-4xl font-display font-light text-gradient-gold mb-4">
            {slide.title}
          </h2>
          <div className="w-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-4" />
          <p className="text-muted-foreground text-base leading-relaxed mb-4 max-w-xs">
            {slide.description}
          </p>
          <p className="text-primary/60 text-sm font-display italic">
            {slide.accent}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Bottom actions */}
      <div className="w-full max-w-xs relative z-10">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className="w-full btn-premium py-4 rounded-2xl text-primary-foreground font-semibold text-lg tracking-wide gold-glow-strong"
        >
          <span className="relative z-10">
            {step < slides.length - 1 ? "Continue" : "Get Started"}
          </span>
        </motion.button>

        {step < slides.length - 1 && (
          <button
            onClick={onComplete}
            className="w-full mt-4 text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default OnboardingFlow;
