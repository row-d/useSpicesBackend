import { Request, Response } from 'express'
import fs from 'fs/promises'
import multer from 'multer'
import path from 'path'

import ProductContainerMongodb from '../Containers/DAOs/products/ProductContainerMongodb'

class ProductsController {
  staticFolder: string
  static contenedor: ProductContainerMongodb
  storage: multer.StorageEngine
  upload: multer.Multer

  constructor(staticFolder = '../public/thumbnails') {
    this.staticFolder = path.resolve(__dirname, staticFolder)

    fs.mkdir(this.staticFolder, { recursive: true })

    ProductsController.contenedor = new ProductContainerMongodb()

    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.staticFolder)
      },
      filename: (req, file, cb) => {
        cb(
          null,
          `${new Date().toISOString().split('T')[0]}-${file.originalname}`
        )
      },
    })

    this.upload = multer({ storage: this.storage })
  }

  async getData(req: Request, res: Response) {
    res.json(await ProductsController.contenedor.getAll())
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id
    const producto = await ProductsController.contenedor.getById(id)
    if (producto) {
      res.json(producto)
    } else {
      res.status(404).json({ error: 'Producto no encontrado' })
    }
  }

  postData(redirect = false) {
    return async (req: Request, res: Response) => {
      const producto = req.body
      const file = req.file
      const parsedProduct = { ...producto }
      if (file) {
        parsedProduct.thumbnail = file.path.replace(/(.*?)public/, '')
      }
      const id = await ProductsController.contenedor.save(parsedProduct)
      if (redirect === true) {
        return res.redirect(302, '/')
      }
      return res.json(id)
    }
  }

  async putId(req: Request, res: Response) {
    const id = req.params.id
    const reqData = { ...req.body }
    const actual = await ProductsController.contenedor.getById(id)
    const file = req.file

    if (!actual) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    const parsedProduct = { ...reqData }
    if (file) {
      parsedProduct.thumbnail = file.path.replace('public', '')
    }
    await ProductsController.contenedor.update(id, parsedProduct)

    res.json(id)
  }

  async deleteId(req: Request, res: Response) {
    const id = req.params.id
    const deletedId = await ProductsController.contenedor.deleteById(id)
    res.json({ status: 200, message: deletedId })
  }
}

export default ProductsController
