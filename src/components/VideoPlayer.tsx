import { motion } from "framer-motion";
import { ArrowLeft, Share2, Maximize2, Captions } from "lucide-react";
import type { Language } from "./LanguageSelection";
import { useState } from "react";

interface VideoPlayerProps {
  language: Language;
  onBack: () => void;
}

const VideoPlayer = ({ language, onBack }: VideoPlayerProps) => {
  const [subtitles, setSubtitles] = useState(true);

  const handleShare = async () => {
    const shareData = {
      title: "The 9PM Prayer",
      text: `Join me in the Lord's Prayer every night at 9PM (${language.name}). Download here:`,
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

  const ccParam = subtitles ? "&cc_load_policy=1" : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative z-10 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-2 rounded-full bg-secondary/50 text-foreground/70 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Now Playing</p>
          <p className="text-foreground font-display text-lg">{language.flag} {language.nativeName}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="p-2 rounded-full bg-secondary/50 text-foreground/70 hover:text-foreground transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Video Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-lg ambient-glow rounded-2xl overflow-hidden"
        >
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full rounded-2xl"
              src={`https://www.youtube.com/embed/${language.videoId}?autoplay=1&rel=0&modestbranding=1${ccParam}&hl=${language.code}`}
              title={`Lord's Prayer in ${language.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4 mt-6"
        >
          <button
            onClick={() => setSubtitles(!subtitles)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
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
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            Fullscreen
          </button>
        </motion.div>
      </div>

      {/* Bottom message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center pb-8 px-4"
      >
        <p className="text-sm text-muted-foreground/60 font-display italic">
          "For where two or three gather in my name, there am I with them."
        </p>
        <p className="text-xs text-muted-foreground/40 mt-1">Matthew 18:20</p>
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;
