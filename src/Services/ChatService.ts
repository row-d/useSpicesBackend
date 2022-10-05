import cli from '../cli'
import ChatRepo from '../Repositories/ChatRepo'
import { Message } from '../types/Message'
import { ChatDAOFactory } from './../Factories/ChatDAOFactory'

const args = cli(process.argv)

export default class ChatService {
  static repo: ChatRepo

  constructor() {
    ChatService.repo = new ChatRepo(new ChatDAOFactory(), args.instance)
  }

  async save(data: Message) {
    return await ChatService.repo.dao.save(data)
  }

  async update(id: string, data: Message) {
    return await ChatService.repo.dao.update(id, data)
  }

  async getById(id: string) {
    return await ChatService.repo.dao.getById(id)
  }

  async getAll() {
    return await ChatService.repo.dao.getAll()
  }

  async deleteById(id: string) {
    return await ChatService.repo.dao.deleteById(id)
  }

  async deleteAll() {
    return await ChatService.repo.dao.deleteAll()
  }
}
