export const spacingRules = {
  borderWidthX: 0.12,
  cornerRadiusX: 0.45,
  horizontalBorderSpacingX: 0.65,
  verticalBorderSpacingX: 0.65,
  wordSpacingX: 1.0,
  arabicEnglishSpacingX: 0.28,
  textToArrowSpacingX: 0.85,
  rowGapX: 0.35,
  defaultRowHeightX: 3.2,
  routeWidthX: 2.2,
  minimumTextBlockWidthX: 4.0,
  minimumContentWidthX: 10.0
};

export function toMM(valueInX, xHeightMM) {
  return Math.round(valueInX * xHeightMM);
}

export function roundX(value) {
  return Math.round(value * 1000) / 1000;
}
