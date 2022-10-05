import { Request, Response } from 'express'
import fs from 'fs/promises'
import multer from 'multer'
import path from 'path'

import ProductService from '../Services/ProductService'

class ProductsController {
  staticFolder: string
  service: ProductService
  storage: multer.StorageEngine
  upload: multer.Multer

  constructor(staticFolder = '../public/thumbnails') {
    this.staticFolder = path.resolve(__dirname, staticFolder)

    fs.mkdir(this.staticFolder, { recursive: true })

    this.service = new ProductService()

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
    res.json(await this.service.getAll())
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id

    const producto = await this.service.getById(id)
    producto
      ? res.json(producto)
      : res.status(404).json({ error: 'Producto no encontrado' })
  }

  postData(redirect = false) {
    return async (req: Request, res: Response) => {
      const producto = req.body

      const file = req.file
      const parsedProduct = { ...producto }
      if (file) {
        parsedProduct.thumbnail = file.path.replace(/(.*?)public/, '')
      }
      const data = await this.service.save(parsedProduct)
      if (redirect === true) {
        return res.redirect(302, '/')
      }
      return res.json(data)
    }
  }

  async putId(req: Request, res: Response) {
    const id = req.params.id
    const reqData = { ...req.body }
    const actual = await this.service.getById(id)
    const file = req.file

    if (!actual) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    const parsedProduct = { ...reqData }
    if (file) {
      parsedProduct.thumbnail = file.path.replace('public', '')
    }

    res.json(await this.service.update(id, parsedProduct))
  }

  async deleteId(req: Request, res: Response) {
    const id = req.params.id
    const deletedId = await this.service.deleteById(id)
    res.json({ status: 200, message: deletedId })
  }
}

export default ProductsController
