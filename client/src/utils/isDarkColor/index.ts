import {hexToRgb} from 'utils/hexToRGB'

interface RGB {
  red: number
  green: number
  blue: number
}

export function isDarkColor(color: RGB | string) {
  const MAX_CHANNEL = 255 * 3
  const MIN_CHANNEL = 255
  const DELTA = MAX_CHANNEL - MIN_CHANNEL
  let colorRGB: RGB | null

  if (typeof color === 'string') {
    colorRGB = hexToRgb(color)
  } else {
    colorRGB = color
  }

  const brightness = colorRGB ? (colorRGB.red * 0.8 + colorRGB.green + colorRGB.blue * 0.2) / DELTA * 100 : 0;

  return brightness < 50
}
