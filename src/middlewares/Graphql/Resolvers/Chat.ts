import ChatService from '../../../Services/ChatService'
import { Message } from './../../../types/Message.d'

export default function chatResolver(service: ChatService) {
  return {
    getMessages: async () => {
      return await service.getAll()
    },
    getMessage: async ({ id }: { id: string }) => {
      return await service.getById(id)
    },
    createMessage: async (data: Message) => {
      return await service.save(data)
    },
    updateMessage: async ({
      id,
      messageInput,
    }: {
      id: string
      messageInput: Message
    }) => {
      return await service.update(id, messageInput)
    },
    deleteMessage: async ({ id }: { id: string }) => {
      return await service.deleteById(id)
    },
    deleteAllMessages: async () => {
      return await service.deleteAll()
    },
  }
}
