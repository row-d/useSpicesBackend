import ProductService from '../../../Services/ProductService'
import { Product } from '../../../types/Product'

export default function productResolver(service: ProductService) {
  return {
    getProducts: async () => {
      return await service.getAll()
    },
    getProduct: async ({ id }: { id: string }) => {
      return await service.getById(id)
    },
    createProduct: async (data: Product) => {
      return await service.save(data)
    },
    updateProduct: async ({
      id,
      productInput,
    }: {
      id: string
      productInput: Product
    }) => {
      return await service.update(id, productInput)
    },
    deleteProduct: async ({ id }: { id: string }) => {
      return await service.deleteById(id)
    },
    deleteAllProducts: async () => {
      return await service.deleteAll()
    },
  }
}
