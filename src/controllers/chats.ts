import { Request, Response } from 'express'
import fs from 'fs/promises'
import multer from 'multer'
import { normalize, schema } from 'normalizr'
import path from 'path'

import ChatContainerMongodb from '../Containers/DAOs/chats/ChatContainerMongodb'

class ChatsController {
  staticFolder: string
  static contenedor: ChatContainerMongodb
  storage: multer.StorageEngine
  upload: multer.Multer

  constructor(staticFolder = '../public/thumbnails') {
    this.staticFolder = path.resolve(__dirname, staticFolder)

    fs.mkdir(this.staticFolder, { recursive: true })

    ChatsController.contenedor = new ChatContainerMongodb()

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
    const authorEntity = new schema.Entity(
      'authors',
      {},
      { idAttribute: 'email' }
    )

    const messageEntity = new schema.Entity(
      'messages',
      { authorEntity },
      { idAttribute: '_id' }
    )

    const chatEntity = new schema.Entity('chat', {
      messages: [messageEntity],
    })

    const chats = await ChatsController.contenedor.getAll()

    const normalizedData = normalize(
      { id: 'messages', messages: chats },
      chatEntity
    )

    res.setHeader(
      'x-percentage',
      (JSON.stringify(normalizedData).length / JSON.stringify(chats).length) *
        100
    )
    res.json(normalizedData)
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id
    const message = await ChatsController.contenedor.getById(id)
    if (message) {
      res.json(message)
    } else {
      res.status(404).json({ error: 'Mensaje no encontrado' })
    }
  }

  postData(redirect = false) {
    return async (req: Request, res: Response) => {
      const data = req.body
      const file = req.file
      const parsedData = { ...data }
      if (file && !data.avatar) {
        parsedData.avatar = file.path.replace(/(.*?)public/, '')
      }
      const id = await ChatsController.contenedor.save(parsedData)
      if (redirect === true) {
        return res.redirect(302, '/')
      }
      return res.json(id)
    }
  }

  async putId(req: Request, res: Response) {
    const id = req.params.id
    const reqData = { ...req.body }
    const actual = await ChatsController.contenedor.getById(id)
    const file = req.file

    if (!actual) {
      return res.status(404).json({ error: 'Mensaje no encontrado' })
    }

    const parsedChat = { ...reqData }
    if (file) {
      parsedChat.avatar = file.path.replace('public', '')
    }
    await ChatsController.contenedor.update(id, parsedChat)

    res.json({ ...parsedChat, id })
  }

  async deleteId(req: Request, res: Response) {
    const id = req.params.id
    res.send(
      id
        ? await ChatsController.contenedor.deleteById(id)
        : await ChatsController.contenedor.deleteAll()
    )
  }
}

export default ChatsController
