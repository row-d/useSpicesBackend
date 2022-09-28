// import { strict as assert } from 'assert'
import { expect } from 'chai'
import { beforeEach, describe, it } from 'mocha'

import ContainerMongodb from '../ContainerMongodb'

type TestType = { name: string; age: number }

const container = new ContainerMongodb<TestType>(
  'Tests',
  'mongodb://localhost:49153/test',
  'Test',
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
  }
)

describe('ContainerMongodb', () => {
  beforeEach(async () => {
    await container.deleteAll()
  })

  describe('constructor', () => {
    it('should be return a instance of ContainerMongodb', () => {
      // assert.ok(container)
      expect(container).to.be.instanceOf(ContainerMongodb)
    })
  })

  describe('save', () => {
    it('should be return the same object with an id', async () => {
      const data = { name: 'test', age: 10 }
      const result = await container.save(data)

      // result && assert.equal('_id' in result, true)
      result && expect(result).to.have.property('_id')
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
          // assert.equal('_id' in result, true)
          expect(result).to.have.property('_id')
        })
    })
  })

  describe('getAll', () => {
    it('should return an empty array', async () => {
      await container.deleteAll()
      const result = await container.getAll()
      // assert.deepEqual(result, [])
      expect(result).to.be.an('array').that.is.empty
    })
    it('should return the same array that was saved', async () => {
      await container.deleteAll()
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
        // assert.equal(result.length, 10)
        expect(result).to.have.lengthOf(10)
      }
    })
  })

  describe('deleteAll', () => {
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
    it('should return the same object that was saved', async () => {
      const data = { name: 'test', age: 10 }
      const containerObject = await container.save(data)

      // assert.equal(Array.isArray(containerObject), false)
      expect(containerObject).to.be.an('object')
      expect(containerObject).not.to.be.an('array')

      if (!Array.isArray(containerObject) && containerObject !== null) {
        const objectRetrieved = await container.getById(
          containerObject._id.toString()
        )
        // objectRetrieved && assert.deepEqual(objectRetrieved._id, containerObject._id)
        objectRetrieved &&
          expect(objectRetrieved._id).to.deep.equal(containerObject._id)
      }
    })

    it('should return null if the id does not exist', async () => {
      const result = await container.getById('asdasdasd')
      // assert.equal(result, null)
      expect(result).to.be.null
    })
  })

  describe('deleteById', () => {
    it('should delete an object', async () => {
      const data = { name: 'test', age: 10 }
      const containerObject = await container.save(data)

      // assert.equal(Array.isArray(containerObject), false)
      expect(containerObject).to.be.an('object')
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
      const data = { name: 'test', age: 10 }
      const containerObject = await container.save(data)

      // assert.equal(Array.isArray(containerObject), false)
      expect(containerObject).to.be.an('object')
      expect(containerObject).not.to.be.an('array')

      if (!Array.isArray(containerObject) && containerObject) {
        const result = await container.update(containerObject.id, {
          name: 'test2',
        })
        // assert.notEqual(result, null)
        expect(result).not.to.be.null

        // result !== null && assert.equal(result.name, 'test2')
        result !== null && expect(result.name).to.equal('test2')
      }
    })
  })
})
