import ContainerMemory from '../../Containers/ContainerMemory'
import { Message } from '../../types/Message'

export default class ChatDAOMemory extends ContainerMemory<Message> {
  constructor() {
    super()
  }
}
