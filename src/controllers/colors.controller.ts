import { Context } from '../../depts.ts'
import { ColorsService } from '../services/colors.service.ts'
import { color as _color } from '../types/color.d.ts'

export class ColorsController {
  colorsService: ColorsService

  constructor(ColorsService: ColorsService) {
    this.colorsService = ColorsService
  }

  getColors() {
    return async (ctx: Context) => {
      ctx.response.body = await this.colorsService.getColors()
    }
  }

  createColor() {
    return async (ctx: Context) => {
      const reqbody = ctx.request.body({ type: 'json' })
      const color = (await reqbody.value) as _color
      ctx.response.body = await this.colorsService.createColor(color)
    }
  }
}
