import { Product } from '../types/Product'

export default class ProductDTO {
  id: string | number | undefined
  title: string
  price: number
  thumbnail: string
  constructor(product: Product) {
    if (product.id) {
      this.id = product.id
    }
    if (product._id) {
      this.id = product._id
    }
    this.title = product.title
    this.price = product.price
    this.thumbnail = product.thumbnail
  }
}
