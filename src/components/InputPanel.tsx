import type { DestinationInput, GeneralSettings, SignLayoutType } from "@/types/sign";
import { DestinationEditor } from "@/components/DestinationEditor";

function createDestination(): DestinationInput {
  return {
    id: crypto.randomUUID(),
    arabic: "",
    english: "",
    arrowCode: "503",
    routeNumber: ""
  };
}

export function InputPanel({
  settings,
  destinations,
  onSettingsChange,
  onDestinationsChange
}: {
  settings: GeneralSettings;
  destinations: DestinationInput[];
  onSettingsChange: (settings: GeneralSettings) => void;
  onDestinationsChange: (destinations: DestinationInput[]) => void;
}) {
  function updateDestination(index: number, destination: DestinationInput) {
    const next = [...destinations];
    next[index] = destination;
    onDestinationsChange(next);
  }

  return (
    <aside className="panel input-panel">
      <div>
        <p className="eyebrow">Input</p>
        <h2>Sign content</h2>
        <p>Enter what is inside the sign. Width and height are calculated from x.</p>
      </div>

      <div className="settings-grid">
        <label>
          x height in mm
          <input type="number" min="1" value={settings.xHeightMM} onChange={(event) => onSettingsChange({ ...settings, xHeightMM: Number(event.target.value) })} />
        </label>

        <label>
          Layout type
          <select value={settings.layoutType} onChange={(event) => onSettingsChange({ ...settings, layoutType: event.target.value as SignLayoutType })}>
            <option value="4-10">4-10 Stack-Up</option>
            <option value="4-11">4-11 Overhead</option>
            <option value="4-12">4-12 Chevron</option>
          </select>
        </label>

        <label>
          Board thickness in x
          <input type="number" min="0" step="0.05" value={settings.boardThicknessX} onChange={(event) => onSettingsChange({ ...settings, boardThicknessX: Number(event.target.value) })} />
        </label>

        <label>
          Raised depth in x
          <input type="number" min="0" step="0.01" value={settings.raisedDepthX} onChange={(event) => onSettingsChange({ ...settings, raisedDepthX: Number(event.target.value) })} />
        </label>
      </div>

      {destinations.map((destination, index) => (
        <DestinationEditor
          key={destination.id}
          destination={destination}
          index={index}
          onChange={(updated) => updateDestination(index, updated)}
          onRemove={() => onDestinationsChange(destinations.filter((_, itemIndex) => itemIndex !== index))}
        />
      ))}

      <button type="button" className="primary-button" onClick={() => onDestinationsChange([...destinations, createDestination()])}>
        Add destination
      </button>
    </aside>
  );
}
