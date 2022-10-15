import { ColorDAO } from '../daos/color.dao.ts'
import { createColorDTO } from '../dtos/create-color.dto.ts'
import { color } from '../types/color.d.ts'

export class ColorsService {
  colorDao: ColorDAO
  constructor(colorDao: ColorDAO) {
    this.colorDao = colorDao
  }

  createColor(color: color) {
    return this.colorDao.createColor(createColorDTO(color))
  }
  getColors() {
    return this.colorDao.getColors()
  }
}
