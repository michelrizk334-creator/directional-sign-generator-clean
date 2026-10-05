import { downloadTextFile, exportDXF } from "@/lib/export/exportDXF";
import type { SignLayout, SignModel3D } from "@/types/sign";

export function ExportButtons({ layout, model }: { layout: SignLayout; model: SignModel3D }) {
  function exportJson() {
    downloadTextFile("directional-sign-layout.json", JSON.stringify({ layout, model }, null, 2), "application/json");
  }

  function exportDxf() {
    downloadTextFile("directional-sign-phase-1.dxf", exportDXF(layout), "application/dxf");
  }

  return (
    <div className="export-actions">
      <button type="button" onClick={exportJson}>Export JSON</button>
      <button type="button" onClick={exportDxf}>Export DXF</button>
    </div>
  );
}
