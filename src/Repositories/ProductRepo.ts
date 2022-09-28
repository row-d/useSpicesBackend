import ProductDTO from '../DTOs/ProductDTO'
import { ProductDAOFactory, ProductDAOs } from '../Factories/ProductsDAOFactory'

export default class ProductRepo {
  dao: ProductDAOs
  constructor(factory: ProductDAOFactory, instanceChoice?: string) {
    this.dao = new Proxy(factory.getDAO(instanceChoice), {
      get: function (target, prop) {
        if (typeof Reflect.get(target, prop) === 'function') {
          return new Proxy(Reflect.get(target, prop), {
            apply: async function (target, thisArg, argumentsList) {
              const dao = await target.apply(thisArg, argumentsList)
              if (Array.isArray(dao))
                return dao.map((product) => new ProductDTO(product))
              if (dao) return new ProductDTO(dao)
              return dao
            },
          })
        }
      },
    })
  }
}
