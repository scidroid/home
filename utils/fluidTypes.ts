const DEFAULT_MIN_SCREEN = 360;
const DEFAULT_MAX_SCREEN = 1040;

const HTML_FONT_SIZE = 16;

export function createFluidValue(
  minSize: number,
  maxSize: number,
  minScreenSize: number = DEFAULT_MIN_SCREEN,
  maxScreenSize: number = DEFAULT_MAX_SCREEN
) {
  return `clamp(${pxToRem(minSize)}, ${getPreferredValue(
    minSize,
    maxSize,
    minScreenSize,
    maxScreenSize
  )}, ${pxToRem(maxSize)})`;
}

function getPreferredValue(
  minSize: number,
  maxSize: number,
  minScreenSize: number,
  maxScreenSize: number
) {
  const vwCalc = cleanNumber(
    (100 * (maxSize - minSize)) / (maxScreenSize - minScreenSize)
  );

  const remCalc = cleanNumber(
    (minScreenSize * maxSize - maxScreenSize * minSize) /
      (minScreenSize - maxScreenSize)
  );

  return `${vwCalc}vw + ${pxToRem(remCalc)}`;
}

function pxToRem(px: number | string) {
  return `${cleanNumber(Number(px) / HTML_FONT_SIZE)}rem`;
}

function cleanNumber(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
