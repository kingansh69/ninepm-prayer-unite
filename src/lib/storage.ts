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
}

const STORAGE_KEY = "9pm-prayer-user";

export const getUser = (): UserData | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
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
  };
  saveUser(user);
  return user;
};

export const clearUser = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
