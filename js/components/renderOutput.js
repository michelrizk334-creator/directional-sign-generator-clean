export function renderOutput(root, layout, model) {
  root.innerHTML = `
    <div class="panel-heading">
      <p class="eyebrow">Calculated output</p>
      <h2>Generated dimensions</h2>
    </div>
    <div class="output-grid">
      <div class="metric">
        <span>Width</span>
        <strong>${layout.widthMM} mm</strong>
      </div>
      <div class="metric">
        <span>Height</span>
        <strong>${layout.heightMM} mm</strong>
      </div>
      <div class="metric">
        <span>Thickness</span>
        <strong>${model.depthMM} mm</strong>
      </div>
      <div class="metric">
        <span>Elements</span>
        <strong>${model.elementCount}</strong>
      </div>
    </div>
  `;
}
