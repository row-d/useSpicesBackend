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
    if (message.id) {
      this.id = message.id
    }
    if (message._id) {
      this.id = message._id
    }
    this.author = message.author
    this.text = message.text
  }
}
