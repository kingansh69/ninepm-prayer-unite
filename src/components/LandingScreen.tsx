import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface LandingScreenProps {
  onBegin: () => void;
}

const LandingScreen = ({ onBegin }: LandingScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10"
    >
      {/* Cross / spiritual icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="w-16 h-16 rounded-full border-2 border-primary/40 flex items-center justify-center gold-glow">
          <span className="text-primary text-3xl font-display">✝</span>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-5xl md:text-7xl font-display font-light tracking-wide text-foreground gold-text-glow mb-4"
      >
        The 9PM Prayer
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-lg md:text-xl text-muted-foreground font-light max-w-md mb-2"
      >
        Uniting the world in prayer every night at 9PM.
      </motion.p>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-sm text-muted-foreground/60 mb-12"
      >
        The Lord's Prayer • Together as One
      </motion.p>

      {/* CTA Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onBegin}
        className="group relative px-10 py-4 rounded-full bg-primary/10 border border-primary/30 text-primary font-body font-medium text-lg tracking-wide gold-glow transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 flex items-center gap-3"
      >
        Begin Prayer
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </motion.button>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1.2 }}
        className="absolute bottom-12 w-32 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
    </motion.div>
  );
};

export default LandingScreen;
