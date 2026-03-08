import { motion } from "framer-motion";
import heroCross from "@/assets/hero-cross.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Radial glow background */}
      <div className="absolute inset-0 bg-gradient-radial-gold" />

      {/* Light rays */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 0.12, 0.06], scaleY: [0, 1.5, 1] }}
            transition={{ delay: 0.2 + i * 0.12, duration: 2.5, ease: "easeOut" }}
            className="absolute top-0"
            style={{
              left: `${10 + i * 11}%`,
              width: "1px",
              height: "100%",
              transformOrigin: "top",
              background: `linear-gradient(to bottom, hsl(var(--gold) / 0.3), hsl(var(--gold) / 0.05), transparent)`,
              filter: "blur(6px)",
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 0.6, 0] }}
            transition={{
              duration: 6 + Math.random() * 4,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Cross illustration */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-6"
      >
        <motion.img
          src={heroCross}
          alt="Golden Cross"
          className="w-32 h-32 object-contain drop-shadow-[0_0_30px_hsl(var(--gold)/0.4)]"
          animate={{ 
            filter: [
              "drop-shadow(0 0 20px hsl(40 70% 55% / 0.3))",
              "drop-shadow(0 0 40px hsl(40 70% 55% / 0.5))",
              "drop-shadow(0 0 20px hsl(40 70% 55% / 0.3))",
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Expanding glow rings */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.8, 1.6, 1.3], opacity: [0, 0.3, 0.1] }}
          transition={{ delay: 0.8, duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-primary/20"
          style={{ filter: "blur(4px)" }}
        />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.8, 2, 1.6], opacity: [0, 0.15, 0] }}
          transition={{ delay: 1, duration: 3, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-primary/10"
          style={{ filter: "blur(8px)" }}
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="text-5xl md:text-6xl font-display font-light tracking-wide text-gradient-gold mb-3"
      >
        The 9PM Prayer
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-4"
      />

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="text-base text-muted-foreground font-light max-w-xs text-center mb-2"
      >
        Uniting the world in prayer every night at 9PM.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="text-xs text-muted-foreground/40 tracking-widest uppercase mb-16"
      >
        The Lord's Prayer • Together as One
      </motion.p>

      {/* Enter button — premium gradient */}
      <motion.button
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="btn-premium px-14 py-4 rounded-full text-primary-foreground font-body font-semibold text-lg tracking-widest uppercase gold-glow-strong"
      >
        <span className="relative z-10">Enter</span>
      </motion.button>

      {/* Bottom decorative lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.2, duration: 1.5 }}
        className="absolute bottom-12 w-48 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.4, duration: 1.5 }}
        className="absolute bottom-10 w-24 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
      />
    </motion.div>
  );
};

export default SplashScreen;
