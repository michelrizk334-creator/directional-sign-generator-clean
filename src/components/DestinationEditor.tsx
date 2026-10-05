import type { DestinationInput } from "@/types/sign";
import { ArrowSelector } from "@/components/ArrowSelector";

export function DestinationEditor({
  destination,
  index,
  onChange,
  onRemove
}: {
  destination: DestinationInput;
  index: number;
  onChange: (destination: DestinationInput) => void;
  onRemove: () => void;
}) {
  return (
    <section className="destination-card">
      <div className="destination-title">
        <h3>Destination {index + 1}</h3>
        <button type="button" onClick={onRemove} className="small-danger">Remove</button>
      </div>

      <label>
        Arabic destination
        <input value={destination.arabic} dir="rtl" onChange={(event) => onChange({ ...destination, arabic: event.target.value })} />
      </label>

      <label>
        English destination
        <input value={destination.english} onChange={(event) => onChange({ ...destination, english: event.target.value })} />
      </label>

      <label>
        Route number
        <input value={destination.routeNumber ?? ""} onChange={(event) => onChange({ ...destination, routeNumber: event.target.value })} />
      </label>

      <div>
        <p className="field-label">Arrow library</p>
        <ArrowSelector value={destination.arrowCode} onChange={(arrowCode) => onChange({ ...destination, arrowCode })} />
      </div>
    </section>
  );
}
