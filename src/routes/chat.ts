import express from 'express'
import path from 'path'

import ChatsController from '../controllers/chats'
import logger from '../logger'

export default class ChatAPI {
  route: express.Router
  controller: ChatsController
  constructor() {
    this.controller = new ChatsController()
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

    this.route.get('/', this.controller.getData)
    this.route.get('/:id', this.controller.getId)
    this.route.post(
      '/',
      this.controller.upload.single('avatar'),
      this.controller.postData()
    )
    this.route.put(
      '/:id',
      this.controller.upload.single('avatar'),
      this.controller.putId
    )
    this.route.delete('/:id?', this.controller.deleteId)
  }
}
