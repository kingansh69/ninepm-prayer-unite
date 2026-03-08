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
      <div className="glass-panel rounded-b-none border-b-0 border-l-0 border-r-0 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className="relative flex flex-col items-center py-3 px-4 transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-px left-2 right-2 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-[10px] mt-1 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
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
