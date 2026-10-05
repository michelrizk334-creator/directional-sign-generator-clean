import { getArrowByCode } from "../data/kuwaitArrows.js";
import { spacingRules, toMM, roundX } from "./spacingRules.js";
import { measureArabicTextX, measureEnglishTextX } from "./textMeasure.js";

export function generateSignLayout(destinations, settings) {
  const rows = destinations.filter((destination) => {
    return destination.arabic.trim() || destination.english.trim() || destination.routeNumber.trim();
  });

  const activeRows = rows.length ? rows : destinations;
  const xHeightMM = Number(settings.xHeightMM) || 1;
  const rowHeightX = spacingRules.defaultRowHeightX;
  const borderX = spacingRules.horizontalBorderSpacingX;
  const arrowZoneX = 4.2;
  const textToArrowX = spacingRules.textToArrowSpacingX;

  const measuredRows = activeRows.map((destination) => {
    const arrow = getArrowByCode(destination.arrowCode);
    const arabicWidthX = measureArabicTextX(destination.arabic);
    const englishWidthX = measureEnglishTextX(destination.english);
    const textWidthX = Math.max(
      spacingRules.minimumTextBlockWidthX,
      arabicWidthX,
      englishWidthX
    );
    const routeWidthX = destination.routeNumber.trim() ? spacingRules.routeWidthX : 0;
    const widthX = arrowZoneX + textToArrowX + textWidthX + (routeWidthX ? spacingRules.wordSpacingX + routeWidthX : 0);

    return { destination, arrow, textWidthX, routeWidthX, widthX };
  });

  const contentWidthX = Math.max(
    spacingRules.minimumContentWidthX,
    ...measuredRows.map((row) => row.widthX)
  );

  const widthX = roundX(contentWidthX + borderX * 2);
  const heightX = roundX(
    spacingRules.verticalBorderSpacingX * 2 +
      measuredRows.length * rowHeightX +
      Math.max(0, measuredRows.length - 1) * spacingRules.rowGapX
  );

  const elements = [];

  measuredRows.forEach((row, index) => {
    const yX = spacingRules.verticalBorderSpacingX + index * (rowHeightX + spacingRules.rowGapX);
    const arrow = row.arrow;

    elements.push({
      id: `${row.destination.id}-arrow`,
      type: "arrow",
      arrowCode: arrow.code,
      xX: borderX,
      yX: yX + (rowHeightX - arrow.heightX) / 2,
      widthX: arrow.widthX,
      heightX: arrow.heightX,
      raisedDepthX: settings.raisedDepthX
    });

    const textX = borderX + arrowZoneX + textToArrowX;

    elements.push({
      id: `${row.destination.id}-arabic`,
      type: "text",
      label: row.destination.arabic || "الوجهة",
      language: "arabic",
      xX: textX,
      yX: yX + 0.25,
      widthX: row.textWidthX,
      heightX: 1.25,
      fontSizeX: 0.9,
      fill: "white",
      raisedDepthX: settings.raisedDepthX
    });

    elements.push({
      id: `${row.destination.id}-english`,
      type: "text",
      label: row.destination.english || "Destination",
      language: "english",
      xX: textX,
      yX: yX + 1.65,
      widthX: row.textWidthX,
      heightX: 1.15,
      fontSizeX: 0.85,
      fill: "white",
      raisedDepthX: settings.raisedDepthX
    });

    if (row.destination.routeNumber.trim()) {
      elements.push({
        id: `${row.destination.id}-route`,
        type: "route",
        label: row.destination.routeNumber,
        xX: textX + row.textWidthX + spacingRules.wordSpacingX,
        yX: yX + 0.85,
        widthX: row.routeWidthX,
        heightX: 1.5,
        raisedDepthX: settings.raisedDepthX
      });
    }
  });

  return {
    layoutType: settings.layoutType,
    xHeightMM,
    widthX,
    heightX,
    widthMM: toMM(widthX, xHeightMM),
    heightMM: toMM(heightX, xHeightMM),
    boardThicknessX: Number(settings.boardThicknessX) || 0,
    boardThicknessMM: toMM(Number(settings.boardThicknessX) || 0, xHeightMM),
    raisedDepthX: Number(settings.raisedDepthX) || 0,
    raisedDepthMM: toMM(Number(settings.raisedDepthX) || 0, xHeightMM),
    rowHeightX,
    elements
  };
}
