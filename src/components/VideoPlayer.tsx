import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Share2, Maximize2, Captions, Check } from "lucide-react";
import type { Language } from "@/lib/languages";
import { useState, useEffect } from "react";
import { recordPrayer, getUser, updateUser, getPrayerStreak } from "@/lib/storage";

interface VideoPlayerProps {
  language: Language;
  onBack: () => void;
}

const VideoPlayer = ({ language, onBack }: VideoPlayerProps) => {
  const [subtitles, setSubtitles] = useState(true);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [ambientPulse] = useState(true);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Vibrate gently when prayer starts
    if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "The 9PM Prayer",
      text: `Join me in the Lord's Prayer every night at 9PM (${language.name}). Download here:`,
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        const user = getUser();
        if (user) updateUser({ shareCount: (user.shareCount || 0) + 1 });
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      }
    } catch {}
  };

  const handleComplete = () => {
    setCompleted(true);
    setShowParticles(true);
    recordPrayer();
    if (navigator.vibrate) navigator.vibrate([50, 100, 50, 100, 50]);
    // Hide particles after animation
    setTimeout(() => setShowParticles(false), 4000);
  };

  const streak = getPrayerStreak();
  const ccParam = subtitles ? "&cc_load_policy=1" : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-30 bg-background flex flex-col"
    >
      {/* Ambient glow background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={ambientPulse ? { opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[80px]" />
      </motion.div>

      {/* Completion golden particles */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: "50vw",
                y: "50vh",
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
                scale: [0, 1, 0.5],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
              className="absolute w-2 h-2 rounded-full bg-primary"
              style={{ filter: "blur(1px)", boxShadow: "0 0 8px hsl(var(--primary) / 0.6)" }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 relative z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-2.5 rounded-full bg-secondary/50 backdrop-blur-sm text-foreground/70 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Now Playing</p>
          <p className="text-foreground font-display text-lg">
            {language.flag} {language.nativeName}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="p-2.5 rounded-full bg-secondary/50 backdrop-blur-sm text-foreground/70 hover:text-foreground transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Video Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              {/* Golden glow behind */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.3, 0.15] }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute w-64 h-64 rounded-full bg-primary/20 blur-[60px]"
              />
              
              {/* Checkmark with ring animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.2 }}
                className="relative mb-8"
              >
                <div className="w-28 h-28 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center gold-glow">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                  >
                    <Check className="w-14 h-14 text-primary" />
                  </motion.div>
                </div>
                {/* Expanding ring */}
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-primary/30"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-primary/20"
                />
              </motion.div>

              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-3xl font-display text-foreground gold-text-glow mb-3"
              >
                Prayer Complete
              </motion.h3>
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-muted-foreground text-base mb-2 max-w-xs"
              >
                Thank you for joining tonight's prayer.
              </motion.p>
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-muted-foreground/60 text-sm font-display italic mb-8"
              >
                God bless you and keep you.
              </motion.p>

              {streak > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5, type: "spring" }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
                >
                  <span className="text-lg">🔥</span>
                  <span className="text-sm text-foreground font-medium">{streak} day streak</span>
                </motion.div>
              )}

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="px-10 py-3.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium transition-all hover:bg-primary/20 gold-glow"
              >
                Return Home
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full max-w-lg"
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-full max-w-lg mx-4">
                    <div className="relative w-full rounded-2xl overflow-hidden ambient-glow" style={{ paddingBottom: "56.25%" }}>
                      <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-2xl" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="ambient-glow rounded-2xl overflow-hidden">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-2xl"
                    src={`https://www.youtube.com/embed/${language.videoId}?autoplay=1&rel=0&modestbranding=1${ccParam}&hl=${language.code}`}
                    title={`Lord's Prayer in ${language.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setLoading(false)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        {!completed && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
          >
            <button
              onClick={() => setSubtitles(!subtitles)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all ${
                subtitles
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-secondary/50 text-muted-foreground border border-transparent"
              }`}
            >
              <Captions className="w-4 h-4" />
              Subtitles
            </button>
            <button
              onClick={() => {
                const iframe = document.querySelector("iframe");
                iframe?.requestFullscreen?.();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary/50 text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
              Fullscreen
            </button>
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/30 text-sm hover:bg-primary/20 transition-colors"
            >
              <Check className="w-4 h-4" />
              Complete
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom quote */}
      {!completed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center pb-8 px-4 relative z-10"
        >
          <p className="text-sm text-muted-foreground/50 font-display italic">
            "Our Father, who art in heaven…"
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VideoPlayer;
