import ChatDAOMemory from '../DAOs/Chats/ChatDAOMemory'
import ChatDAOMongodb from '../DAOs/Chats/ChatDAOMongodb'
import { FactoryIntances } from './../types/FactoryInstances.d'

export type ChatDAOs = ChatDAOMemory | ChatDAOMongodb

export class ChatDAOFactory {
  static DAO: ChatDAOs | undefined = undefined
  static instances: FactoryIntances<ChatDAOs> = {
    mongodb: () => new ChatDAOMongodb(),
    memory: () => new ChatDAOMemory(),
  }

  getDAO(type?: string): ChatDAOs {
    if (!ChatDAOFactory.DAO) {
      const instance = ChatDAOFactory.instances[type || 'memory']
      ChatDAOFactory.DAO = instance()
    }
    return ChatDAOFactory.DAO
  }
}
