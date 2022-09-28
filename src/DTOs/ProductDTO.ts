import { Product } from '../types/Product'

export default class ProductDTO {
  id: unknown
  title: string
  price: number
  thumbnail: string
  constructor(product: Product) {
    this.id = product._id ? product._id : product.id
    this.title = product.title
    this.price = product.price
    this.thumbnail = product.thumbnail
  }
}
