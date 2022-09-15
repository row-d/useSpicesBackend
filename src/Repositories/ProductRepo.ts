import ProductDTO from '../DTOs/ProductDTO'
import { ProductDAOFactory, ProductDAOs } from '../Factories/ProductsDAOFactory'
import { Product } from '../types/Product'

export default class ProductRepo {
  factory: ProductDAOFactory
  dao: ProductDAOs
  constructor(factory: ProductDAOFactory, instanceChoice = 'memory') {
    this.factory = factory
    this.dao = this.factory.getDAO(instanceChoice)
  }

  async getAll() {
    const chats = await this.dao.getAll()
    return chats?.map((product) => new ProductDTO(product))
  }

  async getById(id: string) {
    const chat = await this.dao.getById(id)
    return new ProductDTO(chat as Product)
  }
}
