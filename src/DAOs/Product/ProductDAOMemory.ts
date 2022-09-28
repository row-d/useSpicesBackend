import ContainerMemory from '../../Containers/ContainerMemory'
import ProductModel from '../../Models/Product/joiModel'
import { Product } from '../../types/Product'

export default class ProductDAOMemory extends ContainerMemory<Product> {
  constructor() {
    super(ProductModel)
  }
}
