import { kuwaitArrows } from "../data/kuwaitArrows.js";
import { arrowPreviewSVG } from "./renderArrowPreview.js";

function destinationCard(destination, index) {
  const options = kuwaitArrows
    .map((arrow) => `<option value="${arrow.code}" ${arrow.code === destination.arrowCode ? "selected" : ""}>${arrow.code} - ${arrow.name}</option>`)
    .join("");

  return `
    <article class="destination-card" data-index="${index}">
      <div class="destination-card-header">
        <h3>Destination ${index + 1}</h3>
        <button class="danger-button" type="button" data-action="remove-destination" data-index="${index}">Remove</button>
      </div>
      <div class="destination-grid">
        <label>
          Arabic destination
          <input data-field="arabic" data-index="${index}" value="${escapeAttribute(destination.arabic)}" placeholder="مثال: مدينة الكويت" />
        </label>
        <label>
          English destination
          <input data-field="english" data-index="${index}" value="${escapeAttribute(destination.english)}" placeholder="Example: Kuwait City" />
        </label>
        <label>
          Route number / shield text
          <input data-field="routeNumber" data-index="${index}" value="${escapeAttribute(destination.routeNumber)}" placeholder="Optional, e.g. 40" />
        </label>
        <div class="arrow-select-row">
          <label>
            Arrow code
            <select data-field="arrowCode" data-index="${index}">
              ${options}
            </select>
          </label>
          <div class="arrow-preview-box">${arrowPreviewSVG(destination.arrowCode)}</div>
        </div>
      </div>
    </article>
  `;
}

function escapeAttribute(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderInputs(root, state, handlers) {
  root.innerHTML = `
    <div class="panel-heading">
      <p class="eyebrow">Input</p>
      <h2>Sign content</h2>
      <p>Enter the content inside the sign. Final sign width and height are generated automatically.</p>
    </div>

    <div class="settings-grid">
      <label>
        x height (mm)
        <input id="x-height" type="number" min="1" value="${state.settings.xHeightMM}" />
      </label>
      <label>
        Layout type
        <select id="layout-type">
          <option value="4-10" ${state.settings.layoutType === "4-10" ? "selected" : ""}>4-10 Stack-Up</option>
          <option value="4-11" ${state.settings.layoutType === "4-11" ? "selected" : ""}>4-11 Overhead</option>
          <option value="4-12" ${state.settings.layoutType === "4-12" ? "selected" : ""}>4-12 Chevron</option>
        </select>
      </label>
      <label>
        Board thickness (x)
        <input id="board-thickness" type="number" min="0" step="0.05" value="${state.settings.boardThicknessX}" />
      </label>
      <label>
        Raised element depth (x)
        <input id="raised-depth" type="number" min="0" step="0.01" value="${state.settings.raisedDepthX}" />
      </label>
    </div>

    <div class="destination-list">
      ${state.destinations.map(destinationCard).join("")}
    </div>

    <button class="primary-button" id="add-destination" type="button">Add destination</button>
  `;

  root.querySelector("#x-height").addEventListener("input", (event) => {
    handlers.updateSettings({ xHeightMM: Number(event.target.value) });
  });
  root.querySelector("#layout-type").addEventListener("change", (event) => {
    handlers.updateSettings({ layoutType: event.target.value });
  });
  root.querySelector("#board-thickness").addEventListener("input", (event) => {
    handlers.updateSettings({ boardThicknessX: Number(event.target.value) });
  });
  root.querySelector("#raised-depth").addEventListener("input", (event) => {
    handlers.updateSettings({ raisedDepthX: Number(event.target.value) });
  });
  root.querySelector("#add-destination").addEventListener("click", handlers.addDestination);

  root.querySelectorAll("[data-field]").forEach((input) => {
    input.addEventListener("input", (event) => {
      handlers.updateDestination(Number(event.target.dataset.index), event.target.dataset.field, event.target.value);
    });
    input.addEventListener("change", (event) => {
      handlers.updateDestination(Number(event.target.dataset.index), event.target.dataset.field, event.target.value);
    });
  });

  root.querySelectorAll('[data-action="remove-destination"]').forEach((button) => {
    button.addEventListener("click", () => handlers.removeDestination(Number(button.dataset.index)));
  });
}
