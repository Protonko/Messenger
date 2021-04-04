import {FONT_SIZE_BASE} from 'static/constants'

export const rem = (pixels: number, context = FONT_SIZE_BASE): string => {
  return `${pixels / context}rem`;
}
