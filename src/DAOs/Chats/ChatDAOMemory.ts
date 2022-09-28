import ContainerMemory from '../../Containers/ContainerMemory'
import ChatModel from '../../Models/Chat/joiModel'
import { Message } from '../../types/Message'

export default class ChatDAOMemory extends ContainerMemory<Message> {
  constructor() {
    super(ChatModel)
  }
}
