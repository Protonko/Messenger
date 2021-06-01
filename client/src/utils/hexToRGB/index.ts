import {HEX_REGEX} from 'static/regex'

export const hexToRgb = (hex: string) => {
  const result = HEX_REGEX.exec(hex)

  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : null
}
