import { color } from '../types/color.d.ts'

export function createColorDTO(color: color): color {
  return typeof color.color === 'string' ? color : { color: '' }
}
