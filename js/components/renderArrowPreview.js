import { getArrowByCode } from "../data/kuwaitArrows.js";

function arrowPath(direction) {
  const paths = {
    UP: "M50 88 L50 22 M25 48 L50 22 L75 48 M38 88 L62 88",
    LEFT: "M84 50 L18 50 M42 24 L18 50 L42 76 M84 38 L84 62",
    RIGHT: "M16 50 L82 50 M58 24 L82 50 L58 76 M16 38 L16 62",
    UP_LEFT: "M78 82 L25 29 M27 65 L25 29 L61 31 M67 92 L88 71",
    UP_RIGHT: "M22 82 L75 29 M39 31 L75 29 L73 65 M12 71 L33 92",
    CURVE_RIGHT: "M24 78 C24 38 56 30 75 30 M55 12 L75 30 L55 48 M24 78 L24 92",
    CURVE_LEFT: "M76 78 C76 38 44 30 25 30 M45 12 L25 30 L45 48 M76 78 L76 92",
    U_TURN: "M72 82 L72 40 C72 18 28 18 28 40 L28 82 M12 62 L28 82 L44 62"
  };
  return paths[direction] || paths.RIGHT;
}

export function arrowPreviewSVG(code, options = {}) {
  const arrow = getArrowByCode(code);
  const label = options.label === false ? "" : `<text x="50" y="99" text-anchor="middle" font-size="10" font-weight="800">${arrow.code}</text>`;

  return `
    <svg viewBox="0 0 100 100" role="img" aria-label="Arrow ${arrow.code} ${arrow.name}">
      <rect x="1" y="1" width="98" height="98" rx="14" fill="white" stroke="#d8e1dd" />
      <path d="${arrowPath(arrow.direction)}" fill="none" stroke="#0a2d1c" stroke-width="11" stroke-linecap="square" stroke-linejoin="miter" />
      ${label}
    </svg>
  `;
}
