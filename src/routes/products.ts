import express from 'express'
import path from 'path'

import ProductsController from '../controllers/products'
import logger from '../logger'

export default class ProductRoute {
  route: express.Router
  controller: ProductsController
  constructor() {
    this.controller = new ProductsController()
    this.route = express.Router()
    this.route.use((req, res, next) => {
      res.on('finish', () => {
        if (res.statusCode >= 400) {
          logger.error(
            `Product route : ${req.method} ${req.url} - ${res.statusCode} ${res.statusMessage}`
          )
        }
      })
      next()
    })

    this.route.use(
      express.static(
        path.join(__dirname, this.controller.staticFolder.split('/')[0])
      )
    )
    this.route.use(express.json())
    this.route.use(express.urlencoded({ extended: true }))

    this.route.get('/', this.controller.getData.bind(this.controller))
    this.route.get('/:id', this.controller.getId.bind(this.controller))
    this.route.post(
      '/',
      this.controller.upload.single('thumbnail'),
      this.controller.postData()
    )
    this.route.put(
      '/:id',
      this.controller.upload.single('thumbnail'),
      this.controller.putId.bind(this.controller)
    )
    this.route.delete('/:id', this.controller.deleteId.bind(this.controller))
  }
}
