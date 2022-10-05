import ChatService from '../../../Services/ChatService'
import ProductService from '../../../Services/ProductService'
import chatResolver from './Chat'
import productResolver from './Product'

const rootValue = {
  ...chatResolver(new ChatService()),
  ...productResolver(new ProductService()),
}

export default rootValue
