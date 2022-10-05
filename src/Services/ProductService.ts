import cli from '../cli'
import { ProductDAOFactory } from '../Factories/ProductsDAOFactory'
import ProductRepo from '../Repositories/ProductRepo'
import { Product } from '../types/Product'

const args = cli(process.argv)

export default class ProductService {
  static repo: ProductRepo

  constructor() {
    ProductService.repo = new ProductRepo(
      new ProductDAOFactory(),
      args.instance
    )
  }

  async save(data: Product) {
    return await ProductService.repo.dao.save(data)
  }

  async update(id: string, data: Product) {
    return await ProductService.repo.dao.update(id, data)
  }

  async getById(id: string) {
    return await ProductService.repo.dao.getById(id)
  }

  async getAll() {
    return await ProductService.repo.dao.getAll()
  }

  async deleteById(id: string) {
    return await ProductService.repo.dao.deleteById(id)
  }

  async deleteAll() {
    return await ProductService.repo.dao.deleteAll()
  }
}
