import type { CSSProperties } from "react";
import type { SignLayout, SignModel3D } from "@/types/sign";
import { SignPreview2D } from "@/components/SignPreview2D";

export function SignPreview3D({ layout, model }: { layout: SignLayout; model: SignModel3D }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">3D preview</p>
          <h2>Board thickness</h2>
          <p>The first 3D view shows the sign board depth. Raised text and arrow extrusion are stored in data.</p>
        </div>
        <strong>{model.depthMM} mm thick</strong>
      </div>
      <div className="preview-stage">
        <div className="sign-3d" style={{ "--depth": `${Math.min(28, Math.max(8, model.depthMM / 8))}px` } as CSSProperties}>
          <div className="sign-3d-front">
            <SignPreview2D layout={layout} compact />
          </div>
          <div className="sign-3d-side" />
          <div className="sign-3d-bottom" />
        </div>
      </div>
    </section>
  );
}
