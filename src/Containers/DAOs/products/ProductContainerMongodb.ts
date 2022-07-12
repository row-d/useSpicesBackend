import ContainerMongodb from '../../ContainerMongodb'

export default class ProductContainerMongodb extends ContainerMongodb {
  constructor() {
    super('Products', process.env.MONGODB_URI as string, 'Product', {
      title: String,
      price: Number,
      thumbnail: String,
    })
  }
}
