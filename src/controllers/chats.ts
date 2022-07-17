import { Request, Response } from 'express'
import fs from 'fs/promises'
import multer from 'multer'
import { normalize, schema } from 'normalizr'
import path from 'path'

import AbstractContainer from '../Containers/AbstractContainer'
import ChatContainerMongodb from '../Containers/DAOs/chats/ChatContainerMongodb'

class ChatsController {
  staticFolder: string
  contenedor: AbstractContainer
  storage: multer.StorageEngine
  upload: multer.Multer

  constructor(staticFolder = '../public/thumbnails') {
    this.staticFolder = path.resolve(__dirname, staticFolder)

    fs.mkdir(this.staticFolder, { recursive: true })

    this.contenedor = new ChatContainerMongodb()

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
    const author = new schema.Entity('authors')

    const message = new schema.Entity(
      'messages',
      { author },
      { idAttribute: (entity) => entity.author.id }
    )

    const chatSchema = new schema.Entity('chat', {
      messages: [message],
    })

    const normalizedData = normalize(
      { id: 'messages', messages: await this.contenedor.getAll() },
      chatSchema
    )

    res.json(normalizedData)
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id
    const producto = await this.contenedor.getById(id)
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
      const id = await this.contenedor.save(parsedProduct)
      if (redirect === true) {
        return res.redirect(302, '/')
      }
      return res.json({ ...parsedProduct, id })
    }
  }

  async putId(req: Request, res: Response) {
    const id = req.params.id
    const reqData = { ...req.body }
    const actual = await this.contenedor.getById(id)
    const file = req.file

    if (!actual) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    const parsedProduct = { ...reqData }
    if (file) {
      parsedProduct.thumbnail = file.path.replace('public', '')
    }
    await this.contenedor.update(id, parsedProduct)

    res.json({ ...parsedProduct, id })
  }

  async deleteId(req: Request, res: Response) {
    const id = req.params.id
    const deletedId = await this.contenedor.deleteById(id)
    console.log(deletedId)
    res.json({ status: 200, message: deletedId })
  }
}

export default ChatsController
