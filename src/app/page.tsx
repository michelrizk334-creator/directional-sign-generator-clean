"use client";

import { useMemo, useState } from "react";
import { ExportButtons } from "@/components/ExportButtons";
import { InputPanel } from "@/components/InputPanel";
import { OutputDimensions } from "@/components/OutputDimensions";
import { SignPreview2D } from "@/components/SignPreview2D";
import { SignPreview3D } from "@/components/SignPreview3D";
import { defaultSettings, sampleDestinations } from "@/data/sampleSign";
import { generate3DSign } from "@/lib/geometry3d/generate3DSign";
import { generateSignLayout } from "@/lib/layout/generateSignLayout";
import type { DestinationInput, GeneralSettings } from "@/types/sign";

export default function Home() {
  const [settings, setSettings] = useState<GeneralSettings>(defaultSettings);
  const [destinations, setDestinations] = useState<DestinationInput[]>(sampleDestinations);

  const layout = useMemo(() => generateSignLayout(destinations, settings), [destinations, settings]);
  const model = useMemo(() => generate3DSign(layout), [layout]);

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Code-only MVP · No media files</p>
          <h1>Directional Sign 3D Generator</h1>
          <p>
            Enter destinations and select standard arrow codes. The app calculates the sign dimensions from x,
            generates a 2D front view, shows 3D board thickness, and exports basic CAD data.
          </p>
        </div>
      </header>

      <div className="workspace">
        <InputPanel
          settings={settings}
          destinations={destinations}
          onSettingsChange={setSettings}
          onDestinationsChange={setDestinations}
        />

        <div className="preview-stack">
          <OutputDimensions layout={layout} />

          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">2D front view</p>
                <h2>Generated layout</h2>
                <p>The width and height are outputs, not user inputs.</p>
              </div>
              <strong>Layout {layout.layoutType}</strong>
            </div>
            <SignPreview2D layout={layout} />
          </section>

          <SignPreview3D layout={layout} model={model} />

          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Export</p>
                <h2>CAD output foundation</h2>
                <p>Phase 1 exports basic DXF and JSON. Exact Kuwait Code geometry will be refined later.</p>
              </div>
              <ExportButtons layout={layout} model={model} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
