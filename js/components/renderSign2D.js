import { getArrowByCode } from "../data/kuwaitArrows.js";
import { spacingRules } from "../lib/spacingRules.js";
import { arrowPreviewSVG } from "./renderArrowPreview.js";

function escapeText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function textElement(element) {
  const isArabic = element.language === "arabic";
  return `
    <text
      x="${element.xX + element.widthX / 2}"
      y="${element.yX + element.heightX / 2}"
      dominant-baseline="middle"
      text-anchor="middle"
      font-size="${element.fontSizeX || 1}"
      font-family="${isArabic ? "Tahoma, Arial, sans-serif" : "Arial, Helvetica, sans-serif"}"
      font-weight="800"
      fill="${element.fill || "white"}"
      direction="${isArabic ? "rtl" : "ltr"}"
    >${escapeText(element.label)}</text>
  `;
}

function routeElement(element) {
  return `
    <g>
      <rect x="${element.xX}" y="${element.yX}" width="${element.widthX}" height="${element.heightX}" rx="0.18" fill="none" stroke="white" stroke-width="0.08" />
      <text x="${element.xX + element.widthX / 2}" y="${element.yX + element.heightX / 2}" dominant-baseline="middle" text-anchor="middle" font-size="1.05" font-family="Arial, Helvetica, sans-serif" font-weight="900" fill="white">${escapeText(element.label)}</text>
    </g>
  `;
}

function arrowElement(element) {
  const arrow = getArrowByCode(element.arrowCode);
  return `
    <g transform="translate(${element.xX} ${element.yX}) scale(${element.widthX / 100} ${element.heightX / 100})">
      ${arrowPreviewSVG(arrow.code, { label: false }).replace("<svg viewBox=\"0 0 100 100\" role=\"img\" aria-label=\"Arrow " + arrow.code + " " + arrow.name + "\">", "<svg viewBox=\"0 0 100 100\">")}
    </g>
  `;
}

export function renderSign2D(root, layout) {
  const elements = layout.elements.map((element) => {
    if (element.type === "text") return textElement(element);
    if (element.type === "route") return routeElement(element);
    if (element.type === "arrow") return arrowElement(element);
    return "";
  }).join("");

  root.innerHTML = `
    <div class="preview-2d">
      <svg viewBox="0 0 ${layout.widthX} ${layout.heightX}" class="sign-svg" role="img" aria-label="Generated directional sign front preview">
        <rect x="0" y="0" width="${layout.widthX}" height="${layout.heightX}" rx="${spacingRules.cornerRadiusX}" fill="#006b3a" />
        <rect x="${spacingRules.borderWidthX / 2}" y="${spacingRules.borderWidthX / 2}" width="${layout.widthX - spacingRules.borderWidthX}" height="${layout.heightX - spacingRules.borderWidthX}" rx="${spacingRules.cornerRadiusX}" fill="none" stroke="white" stroke-width="${spacingRules.borderWidthX}" />
        ${elements}
      </svg>
    </div>
  `;
}
