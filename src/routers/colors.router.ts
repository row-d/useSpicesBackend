import { ColorsController } from '../controllers/colors.controller.ts'
import { Router } from '../../depts.ts'

export class ColorsRouter {
  _router: Router
  colorsController: ColorsController

  constructor(ColorsController: ColorsController) {
    this._router = new Router()
    this.colorsController = ColorsController
    this._router.get('/colors', this.colorsController.getColors())
    this._router.post('/colors', this.colorsController.createColor())
  }

  get router() {
    return this._router
  }
}
