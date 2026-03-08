import { motion } from "framer-motion";
import { Share2, Copy, MessageCircle, Mail, Check, Link2 } from "lucide-react";
import { useState } from "react";
import { getUser, updateUser } from "@/lib/storage";

const ShareScreen = () => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const shareMessage = "Join me in the Lord's Prayer every night at 9PM. Install here:";
  const shareUrl = window.location.origin;
  const fullMessage = `${shareMessage} ${shareUrl}`;

  const incrementShareCount = () => {
    const user = getUser();
    if (user) {
      updateUser({ shareCount: (user.shareCount || 0) + 1 });
    }
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "The 9PM Prayer",
          text: shareMessage,
          url: shareUrl,
        });
        incrementShareCount();
        setShared(true);
        setTimeout(() => setShared(false), 3000);
      }
    } catch {}
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullMessage);
    incrementShareCount();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    incrementShareCount();
    window.open(`https://wa.me/?text=${encodeURIComponent(fullMessage)}`, "_blank");
  };

  const handleSMS = () => {
    incrementShareCount();
    window.open(`sms:?body=${encodeURIComponent(fullMessage)}`, "_blank");
  };

  const handleEmail = () => {
    incrementShareCount();
    window.open(
      `mailto:?subject=${encodeURIComponent("Join The 9PM Prayer")}&body=${encodeURIComponent(fullMessage)}`,
      "_blank"
    );
  };

  const user = getUser();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen relative z-10 px-4 pt-8 pb-24 max-w-lg mx-auto"
    >
      <motion.div variants={item} className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 gold-glow">
          <Share2 className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-display text-foreground gold-text-glow mb-2">
          Share the Prayer
        </h2>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Invite friends and family to join the nightly prayer together.
        </p>
      </motion.div>

      {/* Share message preview */}
      <motion.div variants={item} className="glass-panel p-4 mb-6">
        <p className="text-sm text-foreground/80 italic leading-relaxed">
          "{shareMessage}"
        </p>
        <p className="text-xs text-primary mt-2">{shareUrl}</p>
      </motion.div>

      {/* Share buttons */}
      <div className="space-y-3">
        {navigator.share && (
          <motion.button
            variants={item}
            whileTap={{ scale: 0.98 }}
            onClick={handleNativeShare}
            className="w-full glass-panel p-4 flex items-center gap-4 hover:border-primary/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm text-foreground">Share</p>
              <p className="text-xs text-muted-foreground">Use your phone's share menu</p>
            </div>
            {shared && <Check className="w-5 h-5 text-primary" />}
          </motion.button>
        )}

        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={handleWhatsApp}
          className="w-full glass-panel p-4 flex items-center gap-4 hover:border-primary/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[hsl(142,70%,30%)]/20 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-[hsl(142,70%,50%)]" />
          </div>
          <div className="text-left">
            <p className="text-sm text-foreground">WhatsApp</p>
            <p className="text-xs text-muted-foreground">Send to contacts or groups</p>
          </div>
        </motion.button>

        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={handleSMS}
          className="w-full glass-panel p-4 flex items-center gap-4 hover:border-primary/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm text-foreground">SMS</p>
            <p className="text-xs text-muted-foreground">Send a text message</p>
          </div>
        </motion.button>

        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={handleEmail}
          className="w-full glass-panel p-4 flex items-center gap-4 hover:border-primary/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm text-foreground">Email</p>
            <p className="text-xs text-muted-foreground">Send an email invitation</p>
          </div>
        </motion.button>

        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopy}
          className="w-full glass-panel p-4 flex items-center gap-4 hover:border-primary/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5 text-primary" />}
          </div>
          <div className="text-left">
            <p className="text-sm text-foreground">{copied ? "Copied!" : "Copy Link"}</p>
            <p className="text-xs text-muted-foreground">Copy message to clipboard</p>
          </div>
        </motion.button>
      </div>

      {/* Share count */}
      {user && user.shareCount > 0 && (
        <motion.div variants={item} className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            You've shared <span className="text-primary font-medium">{user.shareCount}</span> time{user.shareCount !== 1 ? "s" : ""}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ShareScreen;
