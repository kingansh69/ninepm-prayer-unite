import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, ChevronDown, Check, ArrowLeft } from "lucide-react";
import { createUser, getUser } from "@/lib/storage";

const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+254", country: "KE", flag: "🇰🇪" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+63", country: "PH", flag: "🇵🇭" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+966", country: "SA", flag: "🇸🇦" },
];

interface PhoneLoginScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

const PhoneLoginScreen = ({ onComplete, onBack }: PhoneLoginScreenProps) => {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0]);
  const [phone, setPhone] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleContinue = async () => {
    if (phone.length < 6) return;
    setLoading(true);
    
    // Simulate brief loading
    await new Promise((r) => setTimeout(r, 800));
    
    const existing = getUser();
    if (existing && existing.phoneNumber === phone && existing.countryCode === selectedCode.code) {
      // Restore existing account
    } else {
      createUser(phone, selectedCode.code);
    }
    
    setLoading(false);
    setSuccess(true);
    
    setTimeout(() => onComplete(), 1500);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center gold-glow mb-6"
        >
          <Check className="w-10 h-10 text-primary" />
        </motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-display text-foreground gold-text-glow"
        >
          Welcome to Prayer
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground mt-2"
        >
          Your account has been created
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col px-6 pt-8 pb-12 relative z-10 max-w-lg mx-auto"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="self-start p-2 rounded-full bg-secondary/50 text-foreground/70 hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex flex-col"
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 gold-glow">
          <Phone className="w-6 h-6 text-primary" />
        </div>

        <h2 className="text-3xl font-display font-light text-foreground gold-text-glow mb-2">
          Your Phone Number
        </h2>
        <p className="text-muted-foreground text-sm mb-8">
          Enter your phone number to create your prayer account. No verification needed.
        </p>

        {/* Country code + phone input */}
        <div className="flex gap-3 mb-4">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="glass-panel px-4 py-4 flex items-center gap-2 text-foreground hover:border-primary/30 transition-colors min-w-[100px]"
            >
              <span className="text-lg">{selectedCode.flag}</span>
              <span className="text-sm">{selectedCode.code}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>

            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 glass-panel p-2 max-h-60 overflow-y-auto z-50 min-w-[200px]"
              >
                {countryCodes.map((cc) => (
                  <button
                    key={cc.code + cc.country}
                    onClick={() => {
                      setSelectedCode(cc);
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent text-sm text-foreground transition-colors"
                  >
                    <span>{cc.flag}</span>
                    <span>{cc.country}</span>
                    <span className="text-muted-foreground ml-auto">{cc.code}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="Phone number"
            className="flex-1 glass-panel px-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground/50 text-lg tracking-wider focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>

        <p className="text-xs text-muted-foreground/60 mb-8">
          Your phone number is used as your unique ID. No SMS will be sent.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          disabled={phone.length < 6 || loading}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-medium text-lg tracking-wide transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed gold-glow relative overflow-hidden"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mx-auto"
            />
          ) : (
            "Continue"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PhoneLoginScreen;
