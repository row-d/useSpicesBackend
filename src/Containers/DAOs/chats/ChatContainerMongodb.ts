import { Schema } from 'mongoose'

import { ContainerMongodb } from '../../ContainerMongodb'

type Message = {
  author: {
    email: string
    nombre: string
    apelido: string
    alias: string
    avatar: string
  }
  text: string
}

export default class ChatContainerMongodb extends ContainerMongodb<Message> {
  constructor() {
    const authorSchema = new Schema(
      {
        email: String,
        nombre: String,
        apellido: String,
        alias: String,
        avatar: String,
      },
      { _id: false, versionKey: false }
    )

    super('Chats', process.env.MONGODB_URI as string, 'Chat', {
      author: authorSchema,
      text: String,
    })
  }
}
