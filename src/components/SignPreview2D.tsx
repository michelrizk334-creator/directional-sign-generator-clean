import { getArrowByCode } from "@/data/kuwaitArrows";
import { ArrowPreview } from "@/components/ArrowPreview";
import { spacingRules } from "@/lib/kuwaitCode/spacingRules";
import type { LayoutElement, SignLayout } from "@/types/sign";

function TextElement({ element }: { element: LayoutElement }) {
  const isArabic = element.language === "arabic";

  return (
    <text
      x={element.xX + element.widthX / 2}
      y={element.yX + element.heightX / 2}
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize={element.fontSizeX ?? 0.8}
      fontWeight="700"
      fontFamily={isArabic ? "Tahoma, Arial, sans-serif" : "Arial, Helvetica, sans-serif"}
      direction={isArabic ? "rtl" : "ltr"}
      unicodeBidi={isArabic ? "bidi-override" : "normal"}
      fill="white"
    >
      {element.label}
    </text>
  );
}

function RouteElement({ element }: { element: LayoutElement }) {
  return (
    <g>
      <rect x={element.xX} y={element.yX} width={element.widthX} height={element.heightX} rx={0.15} fill="none" stroke="white" strokeWidth={0.08} />
      <text
        x={element.xX + element.widthX / 2}
        y={element.yX + element.heightX / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="0.8"
        fontWeight="800"
        fill="white"
      >
        {element.label}
      </text>
    </g>
  );
}

function ArrowElement({ element }: { element: LayoutElement }) {
  const arrow = getArrowByCode(element.arrowCode ?? "503");

  return (
    <g transform={`translate(${element.xX} ${element.yX})`}>
      <foreignObject width={element.widthX} height={element.heightX}>
        <div className="svg-arrow-wrapper" title={`Arrow ${arrow.code}: ${arrow.name}`}>
          <ArrowPreview code={arrow.code} className="svg-arrow" />
        </div>
      </foreignObject>
    </g>
  );
}

export function SignPreview2D({ layout, compact = false }: { layout: SignLayout; compact?: boolean }) {
  return (
    <div className={compact ? "preview-2d compact" : "preview-2d"}>
      <svg viewBox={`0 0 ${layout.widthX} ${layout.heightX}`} className="sign-svg" role="img" aria-label="Directional sign preview">
        <rect x="0" y="0" width={layout.widthX} height={layout.heightX} rx={spacingRules.cornerRadiusX} fill="#006b3a" />
        <rect
          x={spacingRules.borderWidthX / 2}
          y={spacingRules.borderWidthX / 2}
          width={layout.widthX - spacingRules.borderWidthX}
          height={layout.heightX - spacingRules.borderWidthX}
          rx={spacingRules.cornerRadiusX}
          fill="none"
          stroke="white"
          strokeWidth={spacingRules.borderWidthX}
        />
        {layout.elements.map((element) => {
          if (element.type === "arrow") return <ArrowElement key={element.id} element={element} />;
          if (element.type === "text") return <TextElement key={element.id} element={element} />;
          if (element.type === "route") return <RouteElement key={element.id} element={element} />;
          return null;
        })}
      </svg>
    </div>
  );
}
