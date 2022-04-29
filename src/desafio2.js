import { unlink } from 'fs/promises'
import { faker } from '@faker-js/faker'
import Contenedor from './Contenedor.js'

class Product {
  constructor(title, price, thumbnail) {
    this.title = title
    this.price = price
    this.thumbnail = thumbnail
  }
}

const fileName = 'productos.txt'
const products = new Contenedor(fileName)

// Testing methods
;(async () => {
  const firstProductId = await products.save(
    new Product(
      faker.commerce.productName(),
      +faker.commerce.price(),
      faker.image.imageUrl()
    )
  )

  const unknownProduct = await products.getById(9999)

  // generate more products
  for (let i = 0; i < 10; i++) {
    await products.save(
      new Product(
        faker.commerce.productName(),
        +faker.commerce.price(),
        faker.image.imageUrl()
      )
    )
  }

  console.log('firstProductId:', firstProductId)
  console.log('unknownProduct:', unknownProduct)
  console.log('knownProduct:', await products.getById(5))
  console.table(await products.getAll())

  console.log('deleting 5th product...')
  await products.deleteById(5)
  console.table(await products.getAll())

  console.log('deleting last product...')
  await products.deleteById(11)
  console.table(await products.getAll())

  console.log('adding a new product...')
  await products.save(
    new Product(
      faker.commerce.productName(),
      +faker.commerce.price(),
      faker.image.imageUrl()
    )
  )
  console.table(await products.getAll())

  console.log('delete all products...')
  await products.deleteAll()
  console.table(await products.getAll())

  await unlink(fileName)
})()
