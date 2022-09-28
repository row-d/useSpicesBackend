import { Message } from './../types/Message'

export default class ChatDTO {
  id?: string | number
  author: {
    email: string
    nombre: string
    apelido: string
    alias: string
    avatar: string
  }
  text: string
  constructor(message: Message) {
    this.id = message._id ? message._id : message.id
    this.author = message.author
    this.text = message.text
  }
}
