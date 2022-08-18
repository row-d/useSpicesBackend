import express from 'express'
import path from 'path'

import ProductsController from '../controllers/products'

export default class ProductRoute {
  route: express.Router
  controller: ProductsController
  constructor() {
    this.controller = new ProductsController()
    this.route = express.Router()
    this.route.use(
      express.static(
        path.join(__dirname, this.controller.staticFolder.split('/')[0])
      )
    )
    this.route.use(express.json())
    this.route.use(express.urlencoded({ extended: true }))

    this.route.get('/', this.controller.getData)
    this.route.get('/:id', this.controller.getId)
    this.route.post(
      '/',
      this.controller.upload.single('thumbnail'),
      this.controller.postData()
    )
    this.route.put(
      '/:id',
      this.controller.upload.single('thumbnail'),
      this.controller.putId
    )
    this.route.delete('/:id', this.controller.deleteId)
  }
}
