import { color } from '../types/color.d.ts'

export class ColorDAO {
  colors: color[] = []

  public getColors(): color[] {
    return this.colors
  }

  public createColor(colorDto: color): color {
    this.colors.push(colorDto)
    return colorDto
  }
}
