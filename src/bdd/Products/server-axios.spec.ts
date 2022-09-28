import { faker } from '@faker-js/faker'
import axios from 'axios'
import { expect } from 'chai'
import { after, before, describe, it } from 'mocha'

const agent = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

before(async () => {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
  await agent.post('/auth/signup', user)
  await agent.post('/auth/login', user)
})

describe('Products API /api/products', () => {
  const path = '/api/products/'
  const product = {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl(),
  }
  let id: string

  describe('POST /', () => {
    it('should save a product', async () => {
      const res = await agent.post(path, product)
      expect(res.data).to.have.property('title')
      expect(res.data).to.have.property('price')
      expect(res.data).to.have.property('thumbnail')
      expect(res.data).to.have.property('id')
      id = res.data.id
    })
  })
  describe('GET/', () => {
    it('should return all products if the client is authenticated', async () => {
      const res = await agent.get(path)
      expect(res.data).to.be.an('array')
    })

    it('should return the same product', async () => {
      const res = await agent.get(path + id)
      expect(res.data).to.have.property('title')
      expect(res.data).to.have.property('price')
      expect(res.data).to.have.property('thumbnail')
      expect(res.data).to.have.property('id')
      expect(res.data.id).to.be.equal(id)
    })
  })
  describe('PUT/', () => {
    it('should update the product', async () => {
      const res = await agent.put(path + id, { title: 'new title' })
      expect(res.data).to.have.property('title')
      expect(res.data).to.have.property('price')
      expect(res.data).to.have.property('thumbnail')
      expect(res.data).to.have.property('id')
      expect(res.data.id).to.be.equal(id)
      expect(res.data.title).to.be.equal('new title')
    })
  })

  describe('DELETE/', () => {
    it('should delete the product', async () => {
      const delres = await agent.delete(path + id)
      expect(delres.status).to.be.equal(200)

      await agent.get(path + id).catch((err) => {
        expect(err.response.status).to.be.equal(404)
      })
    })
  })
})
