import ContainerMemory from '../../Containers/ContainerMemory'
import { Product } from '../../types/Product'

export default class ProductDAOMemory extends ContainerMemory<Product> {
  constructor() {
    super()
  }
}
