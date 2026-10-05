import { renderSign2D } from "./renderSign2D.js";

export function renderSign3D(root, layout, model) {
  const temporary = document.createElement("div");
  renderSign2D(temporary, layout);
  const depthPixels = Math.min(Math.max(model.depthMM / 10, 8), 28);

  root.innerHTML = `
    <div class="preview-stage">
      <div class="sign-3d" style="--depth: ${depthPixels}px;">
        <div class="sign-3d-front">
          ${temporary.innerHTML}
        </div>
        <div class="sign-3d-side"></div>
        <div class="sign-3d-bottom"></div>
      </div>
    </div>
  `;
}
