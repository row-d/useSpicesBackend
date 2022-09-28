import ContainerMongodb from '../../Containers/ContainerMongodb'
import ProductModel from '../../Models/Product/mongooseModel'
import { Product } from '../../types/Product'

export default class ProductDAOMongodb extends ContainerMongodb<Product> {
  constructor() {
    super(
      'Products',
      process.env.MONGODB_URI as string,
      'Product',
      ProductModel
    )
  }
}
