import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isPrayerTime, setIsPrayerTime] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(21, 0, 0, 0);

      if (now >= target) {
        const diff = now.getTime() - target.getTime();
        if (diff < 10 * 60 * 1000) {
          setIsPrayerTime(true);
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
          return;
        }
        target.setDate(target.getDate() + 1);
      }

      setIsPrayerTime(false);
      const ms = target.getTime() - now.getTime();
      const hours = Math.floor(ms / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const totalSecondsInDay = 24 * 60 * 60;
  const remainingSeconds = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const progress = isPrayerTime ? 1 : 1 - remainingSeconds / totalSecondsInDay;
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference * (1 - progress);

  if (isPrayerTime) {
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center"
      >
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r="58" fill="none" stroke="hsl(var(--muted))" strokeWidth="2" opacity="0.2" />
            <circle
              cx="65" cy="65" r="58" fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={0}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--gold-light))" />
                <stop offset="50%" stopColor="hsl(var(--gold))" />
                <stop offset="100%" stopColor="hsl(var(--gold-glow))" />
              </linearGradient>
            </defs>
          </svg>
          {/* Inner glow */}
          <div className="absolute inset-4 rounded-full bg-primary/5 blur-sm" />
          <div className="text-center">
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary text-2xl font-display font-semibold gold-text-glow-strong"
            >
              NOW
            </motion.p>
          </div>
        </div>
        <p className="text-primary text-sm mt-3 font-display italic gold-text-glow">It's time to pray</p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="58" fill="none" stroke="hsl(var(--muted))" strokeWidth="1.5" opacity="0.2" />
          {/* Background track dots */}
          {[...Array(60)].map((_, i) => {
            const angle = (i / 60) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const cx = 65 + 58 * Math.cos(rad);
            const cy = 65 + 58 * Math.sin(rad);
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="0.5"
                fill="hsl(var(--muted-foreground))"
                opacity="0.15"
              />
            );
          })}
          <motion.circle
            cx="65" cy="65" r="58" fill="none"
            stroke="url(#gold-gradient-timer)"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--gold) / 0.4))" }}
          />
          <defs>
            <linearGradient id="gold-gradient-timer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--gold-light))" />
              <stop offset="100%" stopColor="hsl(var(--gold-glow))" />
            </linearGradient>
          </defs>
        </svg>
        {/* Inner glow */}
        <div className="absolute inset-6 rounded-full bg-primary/3 blur-sm" />
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest mb-1">Next prayer in</p>
          <div className="flex items-baseline gap-1 text-foreground font-body">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.hours)}</span>
              <span className="text-[8px] text-muted-foreground/40 uppercase">hrs</span>
            </div>
            <span className="text-primary/60 text-lg mb-2">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.minutes)}</span>
              <span className="text-[8px] text-muted-foreground/40 uppercase">min</span>
            </div>
            <span className="text-primary/60 text-lg mb-2">:</span>
            <div className="flex flex-col items-center">
              <motion.span
                key={timeLeft.seconds}
                initial={{ opacity: 0.5, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-semibold tabular-nums"
              >
                {pad(timeLeft.seconds)}
              </motion.span>
              <span className="text-[8px] text-muted-foreground/40 uppercase">sec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
