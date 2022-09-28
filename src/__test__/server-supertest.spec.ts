import { faker } from '@faker-js/faker'
import { expect } from 'chai'
import { before, describe, it } from 'mocha'
import request from 'supertest'

const agent = request.agent('http://localhost:3000')

before(async () => {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
  await agent.post('/auth/signup').send(user)
  await agent.post('/auth/login').send(user)
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
    it('should save a product', (done) => {
      agent
        .post(path)
        .send(product)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).to.have.property('title')
          expect(res.body).to.have.property('price')
          expect(res.body).to.have.property('thumbnail')
          expect(res.body).to.have.property('id')
          id = res.body.id
          done()
        })
    })
  })
  describe('GET/', () => {
    it('should return all products if the client is authenticated', (done) => {
      agent
        .get(path)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          done()
        })
    })

    it('should return the same product', (done) => {
      agent
        .get(path + id)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('title')
          expect(res.body).to.have.property('price')
          expect(res.body).to.have.property('thumbnail')
          expect(res.body).to.have.property('id')
          expect(res.body.id).to.be.equal(id)
          done()
        })
    })
  })
  describe('PUT/', () => {
    it('should update the product', (done) => {
      agent
        .put(path + id)
        .send({ title: 'new title' })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('title')
          expect(res.body).to.have.property('price')
          expect(res.body).to.have.property('thumbnail')
          expect(res.body).to.have.property('id')
          expect(res.body.id).to.be.equal(id)
          expect(res.body.title).to.be.equal('new title')
          done()
        })
    })
  })

  describe('DELETE/', () => {
    it('should delete the product', (done) => {
      agent
        .delete(path + id)
        .expect(200)
        .then(() => {
          agent
            .get(path + id)
            .expect(404)
            .end((err, res) => {
              expect(res.body).to.have.property('error')
              done()
            })
        })
    })
  })
})
