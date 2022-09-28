import Joi from 'joi'

const ChatModel = Joi.object({
  author: Joi.object({
    email: Joi.string().required(),
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    alias: Joi.string().required(),
    avatar: Joi.string().required(),
  }).required(),
  text: Joi.string().required(),
})
export default ChatModel
