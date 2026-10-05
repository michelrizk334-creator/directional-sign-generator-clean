export function generate3DSign(layout) {
  return {
    widthMM: layout.widthMM,
    heightMM: layout.heightMM,
    depthMM: layout.boardThicknessMM,
    raisedDepthMM: layout.raisedDepthMM,
    elementCount: layout.elements.length,
    elements: layout.elements.map((element) => ({
      ...element,
      xMM: Math.round(element.xX * layout.xHeightMM),
      yMM: Math.round(element.yX * layout.xHeightMM),
      widthMM: Math.round(element.widthX * layout.xHeightMM),
      heightMM: Math.round(element.heightX * layout.xHeightMM),
      raisedDepthMM: Math.round((element.raisedDepthX || 0) * layout.xHeightMM)
    }))
  };
}
