import { strict as assert } from 'assert'
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
      assert.ok(container)
    })
  })

  describe('save', () => {
    const container = new ContainerMemory<TestType>(TestSchema)
    it('should be return the same object with an id', async () => {
      const data = { name: 'test', age: 10 }
      const result = await container.save(data)
      result && assert.equal(result.hasOwnProperty('id'), true)
    })

    it('should be return the same array, but for each object with an id', async () => {
      const data = Array.from({ length: 10 }, (_, i) => ({
        name: `test${i}`,
        age: i,
      }))
      const results = await container.save(data)

      assert.equal(Array.isArray(results), true)

      Array.isArray(results) &&
        results.forEach((result) => {
          assert.equal(result.hasOwnProperty('id'), true)
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
      assert.equal(results, null)
      for (const v of values) {
        const result = await container.save(v)
        assert.equal(result, null)
      }
    })
  })

  describe('getAll', () => {
    const container = new ContainerMemory<TestType>(TestSchema)
    it('should return an empty array', async () => {
      const result = await container.getAll()
      assert.deepEqual(result, [])
    })
    it('should return the same array that was saved', async () => {
      const data = Array.from({ length: 10 }, (_, i) => ({
        name: `test${i}`,
        age: i,
      }))
      const containerObject = await container.save(data)

      assert.equal(Array.isArray(containerObject), true)

      if (Array.isArray(containerObject)) {
        assert.equal(containerObject.length, data.length)
        const result = await container.getAll()
        assert.deepEqual(result, containerObject)
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
      assert.deepEqual(result, [])
    })
  })

  describe('getById', () => {
    const container = new ContainerMemory<TestType>(TestSchema)
    it('should return the same object that was saved', async () => {
      const data = { name: 'test', age: 10 }
      const containerObject = await container.save(data)

      assert.equal(Array.isArray(containerObject), false)

      if (!Array.isArray(containerObject) && containerObject) {
        const objectRetrieved = await container.getById(containerObject.id)
        assert.deepEqual(objectRetrieved, containerObject)
      }
    })

    it('should return null if the id does not exist', async () => {
      const result = await container.getById('invalid-id')
      assert.equal(result, null)
    })
  })

  describe('deleteById', () => {
    const container = new ContainerMemory<TestType>(TestSchema)
    it('should delete an object', async () => {
      const data = { name: 'test', age: 10 }
      const containerObject = await container.save(data)

      assert.equal(Array.isArray(containerObject), false)

      if (!Array.isArray(containerObject) && containerObject) {
        const result = await container.deleteById(containerObject.id)
        const objectRetrieved = await container.getById(containerObject.id)
        assert.equal(result, null)
        assert.equal(objectRetrieved, null)
      }
    })
  })
  describe('update', () => {
    it('should update an object saved', async () => {
      const container = new ContainerMemory<TestType>(TestSchema)
      const data = { name: 'test', age: 10 }
      const containerObject = await container.save(data)

      assert.equal(Array.isArray(containerObject), false)

      if (!Array.isArray(containerObject) && containerObject) {
        const result = await container.update(containerObject.id, {
          name: 'test2',
        })
        assert.notEqual(result, null)

        result !== null && assert.equal(result.name, 'test2')
      }
    })
  })
})
