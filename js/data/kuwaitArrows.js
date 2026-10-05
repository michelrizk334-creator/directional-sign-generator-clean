export const kuwaitArrows = [
  {
    code: "501",
    name: "Straight Up",
    direction: "UP",
    widthX: 2.6,
    heightX: 3.0,
    description: "Standard upward guide arrow. Placeholder geometry for Phase 1."
  },
  {
    code: "502",
    name: "Straight Left",
    direction: "LEFT",
    widthX: 3.0,
    heightX: 2.3,
    description: "Standard left guide arrow. Placeholder geometry for Phase 1."
  },
  {
    code: "503",
    name: "Straight Right",
    direction: "RIGHT",
    widthX: 3.0,
    heightX: 2.3,
    description: "Standard right guide arrow. Placeholder geometry for Phase 1."
  },
  {
    code: "504",
    name: "Diagonal Up Left",
    direction: "UP_LEFT",
    widthX: 3.2,
    heightX: 2.5,
    description: "Diagonal up-left guide arrow. Placeholder geometry for Phase 1."
  },
  {
    code: "505",
    name: "Diagonal Up Right",
    direction: "UP_RIGHT",
    widthX: 3.2,
    heightX: 2.5,
    description: "Diagonal up-right guide arrow. Placeholder geometry for Phase 1."
  },
  {
    code: "510",
    name: "Diagonal Up Right Large",
    direction: "UP_RIGHT",
    widthX: 4.0,
    heightX: 2.5,
    description: "Large diagonal up-right guide arrow. Placeholder geometry for Phase 1."
  }
];

export function getArrowByCode(code) {
  return kuwaitArrows.find((arrow) => arrow.code === code) || kuwaitArrows[0];
}
