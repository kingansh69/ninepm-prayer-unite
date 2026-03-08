import { motion } from "framer-motion";
import { Home, Globe, Share2, User } from "lucide-react";

type Tab = "home" | "languages" | "share" | "profile";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; icon: typeof Home; label: string }[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "languages", icon: Globe, label: "Languages" },
  { id: "share", icon: Share2, label: "Share" },
  { id: "profile", icon: User, label: "Profile" },
];

const BottomNav = ({ active, onChange }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Top gradient fade */}
      <div className="h-6 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
      <div className="glass-panel-elevated rounded-b-none border-b-0 border-l-0 border-r-0 rounded-t-2xl px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className="relative flex flex-col items-center py-3 px-5 transition-all duration-300"
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-px left-3 right-3 h-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)",
                      boxShadow: "0 0 8px hsl(var(--gold) / 0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={isActive ? { scale: 1.1, y: -1 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-muted-foreground/60"
                    }`}
                    style={isActive ? { filter: "drop-shadow(0 0 4px hsl(var(--gold) / 0.4))" } : {}}
                  />
                </motion.div>
                <span
                  className={`text-[10px] mt-1.5 font-medium transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground/50"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
export type { Tab };
