import { kuwaitArrows } from "@/data/kuwaitArrows";
import { ArrowPreview } from "@/components/ArrowPreview";

export function ArrowSelector({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  return (
    <div className="arrow-grid">
      {kuwaitArrows.map((arrow) => (
        <button
          type="button"
          key={arrow.code}
          className={value === arrow.code ? "arrow-card selected" : "arrow-card"}
          onClick={() => onChange(arrow.code)}
        >
          <span className="arrow-code">{arrow.code}</span>
          <ArrowPreview code={arrow.code} className="arrow-icon" />
          <span className="arrow-name">{arrow.name}</span>
        </button>
      ))}
    </div>
  );
}
