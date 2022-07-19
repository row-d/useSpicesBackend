import { ContainerMongodb } from '../../ContainerMongodb'

type Product = {
  title: string
  price: number
  thumbnail: string
}

export default class ProductContainerMongodb extends ContainerMongodb<Product> {
  constructor() {
    super('Products', process.env.MONGODB_URI as string, 'Product', {
      title: String,
      price: Number,
      thumbnail: String,
    })
  }
}
