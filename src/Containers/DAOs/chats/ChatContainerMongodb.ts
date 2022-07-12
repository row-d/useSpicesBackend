import { Schema } from 'mongoose'

import ContainerMongodb from '../../ContainerMongodb'

export default class ChatContainerMongodb extends ContainerMongodb {
  constructor() {
    super('Products', process.env.MONGODB_URI as string, 'Product', {
      author: new Schema({
        id: String,
        nombre: String,
        apellido: String,
        alias: String,
        avatar: String,
      }),
      text: String,
    })
  }
}
