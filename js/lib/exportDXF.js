function dxfHeader() {
  return ["0", "SECTION", "2", "HEADER", "0", "ENDSEC", "0", "SECTION", "2", "ENTITIES"];
}

function dxfFooter() {
  return ["0", "ENDSEC", "0", "EOF"];
}

function line(x1, y1, x2, y2, layer = "SIGN") {
  return [
    "0", "LINE", "8", layer,
    "10", String(x1), "20", String(y1), "30", "0",
    "11", String(x2), "21", String(y2), "31", "0"
  ];
}

function text(label, x, y, height, layer = "TEXT") {
  return [
    "0", "TEXT", "8", layer,
    "10", String(x), "20", String(y), "30", "0",
    "40", String(height),
    "1", String(label || ""),
    "50", "0"
  ];
}

function rectangle(x, y, width, height, layer = "SIGN") {
  return [
    ...line(x, y, x + width, y, layer),
    ...line(x + width, y, x + width, y + height, layer),
    ...line(x + width, y + height, x, y + height, layer),
    ...line(x, y + height, x, y, layer)
  ];
}

export function exportDXF(layout) {
  const parts = [...dxfHeader()];

  parts.push(...rectangle(0, 0, layout.widthMM, layout.heightMM, "PANEL"));

  for (const element of layout.elements) {
    const x = Math.round(element.xX * layout.xHeightMM);
    const y = Math.round((layout.heightX - element.yX - element.heightX) * layout.xHeightMM);
    const w = Math.round(element.widthX * layout.xHeightMM);
    const h = Math.round(element.heightX * layout.xHeightMM);

    if (element.type === "text" || element.type === "route") {
      parts.push(...text(element.label || "", x, y + h / 2, Math.round((element.fontSizeX || 0.8) * layout.xHeightMM), element.type.toUpperCase()));
    } else {
      parts.push(...rectangle(x, y, w, h, "ARROW_PLACEHOLDER"));
      parts.push(...text(`ARROW ${element.arrowCode || ""}`, x, y + h / 2, Math.round(0.35 * layout.xHeightMM), "ARROW_LABEL"));
    }
  }

  parts.push(...dxfFooter());
  return parts.join("\n");
}

export function downloadTextFile(filename, content, mimeType = "text/plain") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
