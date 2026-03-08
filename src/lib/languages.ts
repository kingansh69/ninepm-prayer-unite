export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  videoId: string;
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", videoId: "6PaowoGxmPk" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", videoId: "8kty-ujnDKk" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", videoId: "sj0WYtRug0g" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷", videoId: "n36rVROcpr4" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", videoId: "KMNFMpTYu3Q" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", videoId: "9kscjLR3cso" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", videoId: "6Dq61Hiiz2E" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", videoId: "0UekhpHqn14" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", videoId: "PhEsrE9J1Fg" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", videoId: "0LaefdPG0KY" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪", videoId: "rfsVeNzVrmQ" },
  { code: "tl", name: "Filipino", nativeName: "Tagalog", flag: "🇵🇭", videoId: "k5kBxVt31VI" },
];

export const getLanguageByCode = (code: string): Language | undefined =>
  languages.find((l) => l.code === code);
