import { defaultSettings, sampleDestinations } from "./data/sampleSign.js";
import { generateSignLayout } from "./lib/generateSignLayout.js";
import { generate3DSign } from "./lib/generate3DSign.js";
import { exportDXF, downloadTextFile } from "./lib/exportDXF.js";
import { renderInputs } from "./components/renderInputs.js";
import { renderOutput } from "./components/renderOutput.js";
import { renderSign2D } from "./components/renderSign2D.js";
import { renderSign3D } from "./components/renderSign3D.js";

const state = {
  settings: { ...defaultSettings },
  destinations: sampleDestinations.map((destination) => ({ ...destination }))
};

const roots = {
  inputPanel: document.getElementById("input-panel"),
  outputDimensions: document.getElementById("output-dimensions"),
  signPreview2D: document.getElementById("sign-preview-2d"),
  signPreview3D: document.getElementById("sign-preview-3d"),
  layoutPill: document.getElementById("layout-pill"),
  depthPill: document.getElementById("depth-pill"),
  exportJson: document.getElementById("export-json"),
  exportDxf: document.getElementById("export-dxf")
};

function newDestination() {
  return {
    id: `dest-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    arabic: "",
    english: "",
    arrowCode: "501",
    routeNumber: ""
  };
}

function getGeneratedData() {
  const layout = generateSignLayout(state.destinations, state.settings);
  const model = generate3DSign(layout);
  return { layout, model };
}

function render() {
  const { layout, model } = getGeneratedData();

  renderInputs(roots.inputPanel, state, {
    updateSettings: (patch) => {
      state.settings = { ...state.settings, ...patch };
      render();
    },
    updateDestination: (index, field, value) => {
      state.destinations[index] = { ...state.destinations[index], [field]: value };
      render();
    },
    addDestination: () => {
      state.destinations = [...state.destinations, newDestination()];
      render();
    },
    removeDestination: (index) => {
      state.destinations = state.destinations.filter((_, itemIndex) => itemIndex !== index);
      if (state.destinations.length === 0) state.destinations = [newDestination()];
      render();
    }
  });

  renderOutput(roots.outputDimensions, layout, model);
  renderSign2D(roots.signPreview2D, layout);
  renderSign3D(roots.signPreview3D, layout, model);

  roots.layoutPill.textContent = `Layout ${layout.layoutType}`;
  roots.depthPill.textContent = `Depth: ${model.depthMM} mm`;
}

roots.exportJson.addEventListener("click", () => {
  const generated = getGeneratedData();
  downloadTextFile("directional-sign-layout.json", JSON.stringify(generated, null, 2), "application/json");
});

roots.exportDxf.addEventListener("click", () => {
  const { layout } = getGeneratedData();
  downloadTextFile("directional-sign-phase-1.dxf", exportDXF(layout), "application/dxf");
});

render();
