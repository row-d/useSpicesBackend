import { Request, Response } from 'express'
import fs from 'fs/promises'
import multer from 'multer'
import { normalize, schema } from 'normalizr'
import path from 'path'

import ChatService from '../Services/ChatService'

class ChatsController {
  staticFolder: string
  service: ChatService
  storage: multer.StorageEngine
  upload: multer.Multer

  constructor(staticFolder = '../public/thumbnails') {
    this.staticFolder = path.resolve(__dirname, staticFolder)

    fs.mkdir(this.staticFolder, { recursive: true })

    this.service = new ChatService()

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
      { idAttribute: 'id' }
    )

    const chatEntity = new schema.Entity('chat', {
      messages: [messageEntity],
    })

    const chats = await this.service.getAll()

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
    try {
      const message = await this.service.getById(id)
      res.json(message)
    } catch (error) {
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
      const id = await this.service.save(parsedData)
      if (redirect === true) {
        return res.redirect(302, '/')
      }
      return res.json(id)
    }
  }

  async putId(req: Request, res: Response) {
    const id = req.params.id
    const reqData = { ...req.body }
    const actual = await this.service.getById(id)
    const file = req.file

    if (!actual) {
      return res.status(404).json({ error: 'Mensaje no encontrado' })
    }

    const parsedChat = { ...reqData }
    if (file) {
      parsedChat.avatar = file.path.replace('public', '')
    }
    await this.service.update(id, parsedChat)

    res.json({ ...parsedChat, id })
  }

  async deleteId(req: Request, res: Response) {
    const id = req.params.id
    res.send(
      id ? await this.service.deleteById(id) : await this.service.deleteAll()
    )
  }
}

export default ChatsController
