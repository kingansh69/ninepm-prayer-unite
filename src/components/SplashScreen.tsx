import { motion } from "framer-motion";

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
      {/* Light rays */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 0.08, 0.04], scaleY: [0, 1.5, 1] }}
            transition={{ delay: 0.3 + i * 0.15, duration: 2, ease: "easeOut" }}
            className="absolute top-0 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent"
            style={{
              left: `${20 + i * 12}%`,
              width: "2px",
              height: "100%",
              transformOrigin: "top",
              filter: "blur(8px)",
            }}
          />
        ))}
      </div>

      {/* Cross icon reveal */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center gold-glow">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-primary text-5xl font-display"
          >
            ✝
          </motion.span>
        </div>
        {/* Glow ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.3, 1.1], opacity: [0, 0.4, 0.15] }}
          transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-primary/20"
          style={{ filter: "blur(4px)" }}
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-5xl md:text-6xl font-display font-light tracking-wide text-foreground gold-text-glow mb-3"
      >
        The 9PM Prayer
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="text-base text-muted-foreground font-light max-w-xs text-center mb-2"
      >
        Uniting the world in prayer every night at 9PM.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="text-xs text-muted-foreground/50 mb-16"
      >
        The Lord's Prayer • Together as One
      </motion.p>

      {/* Enter button */}
      <motion.button
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="relative px-12 py-4 rounded-full border border-primary/40 text-primary font-body font-medium text-lg tracking-widest uppercase gold-glow transition-all duration-500 hover:bg-primary/10 hover:border-primary/60 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <span className="relative z-10">Enter</span>
      </motion.button>

      {/* Bottom decorative */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-10 w-40 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
    </motion.div>
  );
};

export default SplashScreen;
