import ChatDTO from '../DTOs/ChatDTO'
import { ChatDAOFactory } from '../Factories/ChatDAOFactory'
import { ChatDAOs } from './../Factories/ChatDAOFactory'

export default class ChatRepo {
  dao: ChatDAOs
  constructor(factory: ChatDAOFactory, instanceChoice = 'memory') {
    this.dao = new Proxy(factory.getDAO(instanceChoice), {
      get: function (target, prop) {
        if (typeof Reflect.get(target, prop) === 'function') {
          return new Proxy(Reflect.get(target, prop), {
            apply: async function (target, thisArg, argumentsList) {
              const dao = await target.apply(thisArg, argumentsList)
              if (Array.isArray(dao))
                return dao.map((chat) => new ChatDTO(chat))
              if (dao) return new ChatDTO(dao)
              return dao
            },
          })
        }
      },
    })
  }
}
