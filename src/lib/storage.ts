// localStorage-based user storage
export interface UserData {
  phoneNumber: string;
  countryCode: string;
  selectedLanguage: string | null;
  reminderEnabled: boolean;
  shareCount: number;
  lastPrayerDate: string | null;
  onboardingComplete: boolean;
  timezone: string;
  createdAt: string;
  prayerHistory: string[]; // array of ISO date strings (one per day prayed)
}

const STORAGE_KEY = "9pm-prayer-user";

export const getUser = (): UserData | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  const user = JSON.parse(data);
  // Migration: ensure prayerHistory exists
  if (!user.prayerHistory) user.prayerHistory = [];
  return user;
};

export const saveUser = (user: UserData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const updateUser = (updates: Partial<UserData>): UserData | null => {
  const user = getUser();
  if (!user) return null;
  const updated = { ...user, ...updates };
  saveUser(updated);
  return updated;
};

export const createUser = (phoneNumber: string, countryCode: string): UserData => {
  const user: UserData = {
    phoneNumber,
    countryCode,
    selectedLanguage: null,
    reminderEnabled: false,
    shareCount: 0,
    lastPrayerDate: null,
    onboardingComplete: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    createdAt: new Date().toISOString(),
    prayerHistory: [],
  };
  saveUser(user);
  return user;
};

export const clearUser = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Record a prayer for today (deduplicated by date)
export const recordPrayer = (): void => {
  const user = getUser();
  if (!user) return;
  const today = new Date().toISOString().split("T")[0];
  if (!user.prayerHistory.includes(today)) {
    user.prayerHistory.push(today);
  }
  user.lastPrayerDate = new Date().toISOString();
  saveUser(user);
};

// Get prayer streak (consecutive days ending today or yesterday)
export const getPrayerStreak = (): number => {
  const user = getUser();
  if (!user || user.prayerHistory.length === 0) return 0;

  const sorted = [...user.prayerHistory].sort().reverse();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDate = new Date(sorted[0] + "T00:00:00");
  const diffFromToday = Math.floor((today.getTime() - firstDate.getTime()) / 86400000);
  
  // Streak must start from today or yesterday
  if (diffFromToday > 1) return 0;

  let streak = 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = new Date(sorted[i] + "T00:00:00");
    const prev = new Date(sorted[i + 1] + "T00:00:00");
    const diff = Math.floor((current.getTime() - prev.getTime()) / 86400000);
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

// Check if user prayed today
export const prayedToday = (): boolean => {
  const user = getUser();
  if (!user) return false;
  const today = new Date().toISOString().split("T")[0];
  return user.prayerHistory.includes(today);
};

// Check if user prayed yesterday
export const prayedYesterday = (): boolean => {
  const user = getUser();
  if (!user) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().split("T")[0];
  return user.prayerHistory.includes(yStr);
};
