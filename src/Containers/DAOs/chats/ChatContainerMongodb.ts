import { Schema } from 'mongoose'

import ContainerMongodb from '../../ContainerMongodb'

export default class ChatContainerMongodb extends ContainerMongodb {
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
