const englishRatios = {
  default: 0.62,
  narrow: 0.35,
  wide: 0.82,
  space: 0.42
};

const arabicRatios = {
  default: 0.72,
  narrow: 0.36,
  wide: 0.95,
  space: 0.42
};

const narrowEnglish = new Set("ijlI1.,:;!|'` ");
const wideEnglish = new Set("MWQ@#%&");
const narrowArabic = new Set("ا إ أ آ ل ر ز د ذ و ء ى ي .،".split(" ").join(""));
const wideArabic = new Set("صضطمظغفقسش".split(""));

export function measureEnglishTextX(text) {
  const clean = String(text || "").trim();
  if (!clean) return 0;

  let width = 0;
  for (const char of clean) {
    if (char === " ") width += englishRatios.space;
    else if (narrowEnglish.has(char)) width += englishRatios.narrow;
    else if (wideEnglish.has(char)) width += englishRatios.wide;
    else width += englishRatios.default;
  }
  return Math.max(2, width);
}

export function measureArabicTextX(text) {
  const clean = String(text || "").trim();
  if (!clean) return 0;

  let width = 0;
  for (const char of clean) {
    if (char === " ") width += arabicRatios.space;
    else if (narrowArabic.has(char)) width += arabicRatios.narrow;
    else if (wideArabic.has(char)) width += arabicRatios.wide;
    else width += arabicRatios.default;
  }
  return Math.max(2, width);
}
