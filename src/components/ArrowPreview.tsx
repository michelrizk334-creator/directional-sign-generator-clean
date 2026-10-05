import { getArrowByCode } from "@/data/kuwaitArrows";
import type { ArrowDirection } from "@/types/sign";

type Props = {
  code: string;
  className?: string;
};

function rotationForDirection(direction: ArrowDirection): number {
  switch (direction) {
    case "UP": return -90;
    case "DOWN": return 90;
    case "LEFT": return 180;
    case "RIGHT": return 0;
    case "UP_LEFT": return -135;
    case "UP_RIGHT": return -45;
    case "DOWN_LEFT": return 135;
    case "DOWN_RIGHT": return 45;
    default: return 0;
  }
}

export function ArrowPreview({ code, className }: Props) {
  const arrow = getArrowByCode(code);

  if (arrow.direction === "CURVE_RIGHT" || arrow.direction === "CURVE_LEFT" || arrow.direction === "U_TURN") {
    const flip = arrow.direction === "CURVE_LEFT" ? "scale(-1 1) translate(-100 0)" : "";
    const uTurn = arrow.direction === "U_TURN";

    return (
      <svg className={className} viewBox="0 0 100 100" aria-label={`Arrow ${arrow.code}`}>
        <g transform={flip} fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
          {uTurn ? <path d="M75 80 L35 80 Q15 80 15 60 L15 35 Q15 15 35 15 L68 15" /> : <path d="M20 75 Q70 75 70 25" />}
          <path d={uTurn ? "M58 5 L78 15 L58 25" : "M58 25 L70 10 L82 25"} fill="currentColor" stroke="none" />
        </g>
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 100 100" aria-label={`Arrow ${arrow.code}`}>
      <g transform={`rotate(${rotationForDirection(arrow.direction)} 50 50)`} fill="currentColor">
        <rect x="10" y="43" width="55" height="14" rx="2" />
        <polygon points="65,25 92,50 65,75" />
      </g>
    </svg>
  );
}
