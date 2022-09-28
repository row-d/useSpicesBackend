import ProductDAOMemory from '../DAOs/Product/ProductDAOMemory'
import ProductDAOMongodb from '../DAOs/Product/ProductDAOMongodb'
import { FactoryIntances } from './../types/FactoryInstances.d'

export type ProductDAOs = ProductDAOMemory | ProductDAOMongodb

export class ProductDAOFactory {
  static DAO: ProductDAOs | undefined = undefined
  private static instances: FactoryIntances<ProductDAOs> = {
    mongodb: () => new ProductDAOMongodb(),
    memory: () => new ProductDAOMemory(),
  }

  getDAO(type?: string): ProductDAOs {
    if (!ProductDAOFactory.DAO) {
      ProductDAOFactory.DAO = ProductDAOFactory.instances[type || 'memory']()
    }
    return ProductDAOFactory.DAO
  }
}
