import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import SplashScreen from "@/components/SplashScreen";
import PhoneLoginScreen from "@/components/PhoneLoginScreen";
import OnboardingFlow from "@/components/OnboardingFlow";
import HomeDashboard from "@/components/HomeDashboard";
import LanguageSelection from "@/components/LanguageSelection";
import VideoPlayer from "@/components/VideoPlayer";
import ShareScreen from "@/components/ShareScreen";
import ProfileScreen from "@/components/ProfileScreen";
import BottomNav from "@/components/BottomNav";
import type { Tab } from "@/components/BottomNav";
import type { Language } from "@/lib/languages";
import { getUser, updateUser, clearUser } from "@/lib/storage";
import { getLanguageByCode } from "@/lib/languages";

type AppScreen = "splash" | "phone" | "onboarding" | "main" | "player";

const Index = () => {
  const [screen, setScreen] = useState<AppScreen>("splash");
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  // Check if user already exists
  useEffect(() => {
    const user = getUser();
    if (user && user.phoneNumber) {
      if (user.onboardingComplete) {
        setScreen("main");
        if (user.selectedLanguage) {
          const lang = getLang(user.selectedLanguage);
          if (lang) setSelectedLanguage(lang);
        }
      } else {
        setScreen("onboarding");
      }
    }
  }, []);

  const handleSplashComplete = () => {
    const user = getUser();
    if (user && user.phoneNumber) {
      if (user.onboardingComplete) {
        setScreen("main");
      } else {
        setScreen("onboarding");
      }
    } else {
      setScreen("phone");
    }
  };

  const handlePhoneComplete = () => {
    setScreen("onboarding");
  };

  const handleOnboardingComplete = () => {
    updateUser({ onboardingComplete: true });
    setScreen("main");
  };

  const handleSelectLanguage = (lang: Language) => {
    setSelectedLanguage(lang);
    updateUser({ selectedLanguage: lang.code });
    // If selecting from language tab, go back to home
    if (activeTab === "languages") {
      setActiveTab("home");
    }
  };

  const handlePlayPrayer = () => {
    const user = getUser();
    if (selectedLanguage) {
      setScreen("player");
    } else {
      // Go to language selection first
      setActiveTab("languages");
    }
  };

  const handleLogout = () => {
    clearUser();
    setScreen("splash");
    setSelectedLanguage(null);
    setActiveTab("home");
  };

  const handlePlayerBack = () => {
    setScreen("main");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleField />

      <AnimatePresence mode="wait">
        {screen === "splash" && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
        {screen === "phone" && (
          <PhoneLoginScreen
            key="phone"
            onComplete={handlePhoneComplete}
            onBack={() => setScreen("splash")}
          />
        )}
        {screen === "onboarding" && (
          <OnboardingFlow key="onboarding" onComplete={handleOnboardingComplete} />
        )}
        {screen === "player" && selectedLanguage && (
          <VideoPlayer
            key="player"
            language={selectedLanguage}
            onBack={handlePlayerBack}
          />
        )}
      </AnimatePresence>

      {/* Main app with tabs */}
      {screen === "main" && (
        <>
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <HomeDashboard
                key="home"
                onPlayPrayer={handlePlayPrayer}
                onSelectLanguage={() => setActiveTab("languages")}
                onShare={() => setActiveTab("share")}
              />
            )}
            {activeTab === "languages" && (
              <LanguageSelection
                key="languages"
                onSelectLanguage={handleSelectLanguage}
                onBack={() => setActiveTab("home")}
                showBackButton={false}
              />
            )}
            {activeTab === "share" && <ShareScreen key="share" />}
            {activeTab === "profile" && (
              <ProfileScreen
                key="profile"
                onSelectLanguage={() => setActiveTab("languages")}
                onShare={() => setActiveTab("share")}
                onLogout={handleLogout}
              />
            )}
          </AnimatePresence>

          <BottomNav active={activeTab} onChange={setActiveTab} />
        </>
      )}
    </div>
  );
};

export default Index;
