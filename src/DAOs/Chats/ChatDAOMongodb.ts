import ContainerMongodb from '../../Containers/ContainerMongodb'
import ChatModel from '../../Models/Chat/mongooseModel'
import { Message } from '../../types/Message'

export default class ChatDAOMongodb extends ContainerMongodb<Message> {
  constructor() {
    super('Chats', process.env.MONGODB_URI as string, 'Chat', ChatModel)
  }
}
