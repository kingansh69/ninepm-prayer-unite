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
        // Check if we're within prayer window (9PM - 9:10PM)
        const diff = now.getTime() - target.getTime();
        if (diff < 10 * 60 * 1000) {
          setIsPrayerTime(true);
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
          return;
        }
        // Next day
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

  // Calculate progress for the ring (24h cycle)
  const totalSecondsInDay = 24 * 60 * 60;
  const remainingSeconds = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const progress = isPrayerTime ? 1 : 1 - remainingSeconds / totalSecondsInDay;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference * (1 - progress);

  if (isPrayerTime) {
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center"
      >
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={0}
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
            />
          </svg>
          <div className="text-center">
            <p className="text-primary text-lg font-display font-semibold gold-text-glow">NOW</p>
          </div>
        </div>
        <p className="text-primary text-sm mt-3 font-display italic">It's time to pray</p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="2" opacity="0.3" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="text-center">
          <div className="flex items-baseline gap-0.5 text-foreground font-body">
            <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.hours)}</span>
            <span className="text-muted-foreground text-xs mx-0.5">:</span>
            <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.minutes)}</span>
            <span className="text-muted-foreground text-xs mx-0.5">:</span>
            <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.seconds)}</span>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-xs mt-2">until 9PM prayer</p>
    </div>
  );
};

export default CountdownTimer;
