import { Schema } from 'mongoose'

const ChatModel = {
  author: new Schema({
    email: String,
    nombre: String,
    apellido: String,
    alias: String,
    avatar: String,
  }),
  text: String,
}
export default ChatModel
