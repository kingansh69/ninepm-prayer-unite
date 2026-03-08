export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  videoId: string;
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", videoId: "ehPMHq6M-1k" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", videoId: "G1XJ5lRXBBE" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", videoId: "jPJnGymS-8Q" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷", videoId: "6bT1jFLCNvs" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", videoId: "E6pXczMoeIA" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", videoId: "0P9RF6EFzRk" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", videoId: "0P9RF6EFzRk" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", videoId: "0P9RF6EFzRk" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", videoId: "0P9RF6EFzRk" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", videoId: "0P9RF6EFzRk" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪", videoId: "0P9RF6EFzRk" },
  { code: "tl", name: "Filipino", nativeName: "Tagalog", flag: "🇵🇭", videoId: "0P9RF6EFzRk" },
];

export const getLanguageByCode = (code: string): Language | undefined =>
  languages.find((l) => l.code === code);
