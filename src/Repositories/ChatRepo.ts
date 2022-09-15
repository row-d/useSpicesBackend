import ChatDTO from '../DTOs/ChatDTO'
import { ChatDAOFactory } from '../Factories/ChatDAOFactory'
import { ChatDAOs } from './../Factories/ChatDAOFactory'
import { Message } from './../types/Message'

export default class ChatRepo {
  factory: ChatDAOFactory
  dao: ChatDAOs
  constructor(factory: ChatDAOFactory, instanceChoice = 'memory') {
    this.factory = factory
    this.dao = this.factory.getDAO(instanceChoice)
  }

  async getAll() {
    const chats = await this.dao.getAll()
    return chats?.map((chat) => new ChatDTO(chat))
  }

  async getById(id: string) {
    const chat = await this.dao.getById(id)
    return new ChatDTO(chat as Message)
  }
}
