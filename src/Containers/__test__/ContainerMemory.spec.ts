import { expect } from 'chai'
import Joi from 'joi'
import { describe, it } from 'mocha'

import ContainerMemory from '../ContainerMemory'

type TestType = { name: string; age: number }
const TestSchema = Joi.object<TestType>({
  name: Joi.string().required(),
  age: Joi.number().required(),
})

describe('ContainerMemory', () => {
  describe('constructor', () => {
    it('should be return a instance of ContainerMemory', () => {
      const container = new ContainerMemory<TestType>(TestSchema)
      expect(container).to.be.instanceOf(ContainerMemory)
    })
  })

  describe('save', () => {
    const container = new ContainerMemory<TestType>(TestSchema)
    it('should be return the same object with an id', async () => {
      const data = { name: 'test', age: 10 }
      const result = await container.save(data)
      result && expect(result).to.have.property('id')
    })

    it('should be return the same array, but for each object with an id', async () => {
      const data = Array.from({ length: 10 }, (_, i) => ({
        name: `test${i}`,
        age: i,
      }))
      const results = await container.save(data)

      // assert.equal(Array.isArray(results), true)
      expect(results).to.be.an('array')

      Array.isArray(results) &&
        results.forEach((result) => {
          // assert.equal(result.hasOwnProperty('id'), true)
          expect(result).to.have.property('id')
        })
    })

    it('should not save primitive types, functions and nulleables', async () => {
      const container = new ContainerMemory<
        number | string | boolean | null | undefined | VoidFunction
      >(TestSchema)
      const values = [
        10,
        'test',
        true,
        null,
        undefined,
        () => {
          console.log('hello')
        },
      ]
      const results = await container.save(values)
      // assert.equal(results, null)
      expect(results).to.be.null
      for (const v of values) {
        const result = await container.save(v)
        // assert.equal(result, null)
        expect(result).to.be.null
      }
    })
  })

  describe('getAll', () => {
    const container = new ContainerMemory<TestType>(TestSchema)
    it('should return an empty array', async () => {
      const result = await container.getAll()
      // assert.deepEqual(result, [])
      expect(result).to.be.an('array').that.is.empty
    })
    it('should return the same array that was saved', async () => {
      const data = Array.from({ length: 10 }, (_, i) => ({
        name: `test${i}`,
        age: i,
      }))
      const containerObject = await container.save(data)

      // assert.equal(Array.isArray(containerObject), true)
      expect(containerObject).to.be.an('array')

      if (Array.isArray(containerObject)) {
        // assert.equal(containerObject.length, data.length)
        expect(containerObject).to.have.lengthOf(data.length)
        const result = await container.getAll()
        // assert.deepEqual(result, containerObject)
        expect(result).to.deep.equal(containerObject)
      }
    })
  })

  describe('deleteAll', () => {
    const container = new ContainerMemory<TestType>(TestSchema)
    it('should clear the container', async () => {
      const data = Array.from({ length: 10 }, (_, i) => ({
        name: `test${i}`,
        age: i,
      }))
      await container.save(data)
      await container.deleteAll()
      const result = await container.getAll()
      // assert.deepEqual(result, [])
      expect(result).to.be.an('array').that.is.empty
    })
  })

  describe('getById', () => {
    const container = new ContainerMemory<TestType>(TestSchema)
    it('should return the same object that was saved', async () => {
      const data = { name: 'test', age: 10 }
      const containerObject = await container.save(data)

      // assert.equal(Array.isArray(containerObject), false)
      expect(containerObject).not.to.be.an('array')

      if (!Array.isArray(containerObject) && containerObject) {
        const objectRetrieved = await container.getById(containerObject.id)
        // assert.deepEqual(objectRetrieved, containerObject)
        expect(objectRetrieved).to.deep.equal(containerObject)
      }
    })

    it('should return null if the id does not exist', async () => {
      const result = await container.getById('invalid-id')
      // assert.equal(result, null)
      expect(result).to.be.null
    })
  })

  describe('deleteById', () => {
    const container = new ContainerMemory<TestType>(TestSchema)
    it('should delete an object', async () => {
      const data = { name: 'test', age: 10 }
      const containerObject = await container.save(data)

      // assert.equal(Array.isArray(containerObject), false)
      expect(containerObject).not.to.be.an('array')

      if (!Array.isArray(containerObject) && containerObject) {
        const result = await container.deleteById(containerObject.id)
        const objectRetrieved = await container.getById(containerObject.id)
        // assert.equal(result, null)
        expect(result).to.be.null
        // assert.equal(objectRetrieved, null)
        expect(objectRetrieved).to.be.null
      }
    })
  })
  describe('update', () => {
    it('should update an object saved', async () => {
      const container = new ContainerMemory<TestType>(TestSchema)
      const data = { name: 'test', age: 10 }
      const containerObject = await container.save(data)

      // assert.equal(Array.isArray(containerObject), false)
      expect(containerObject).not.to.be.an('array')

      if (!Array.isArray(containerObject) && containerObject) {
        const result = await container.update(containerObject.id, {
          name: 'test2',
        })
        // assert.notEqual(result, null)
        expect(result).not.to.be.null

        // result !== null && assert.equal(result.name, 'test2')
        result !== null && expect(result).to.have.property('name', 'test2')
      }
    })
  })
})
