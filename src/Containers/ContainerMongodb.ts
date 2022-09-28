import mongoose from 'mongoose'

import logger from '../logger'
import AbstractContainer from './AbstractContainer'

export default class ContainerMongodb<Input>
  implements AbstractContainer<Input, mongoose.HydratedDocument<Input>>
{
  collectionName: string
  connectionURL: string
  db: mongoose.Connection
  modelName: string
  schema: mongoose.Schema<Input>
  Model: mongoose.Model<Input>

  constructor(
    collectionName: string,
    connectionURI: string,
    modelName: string,
    schema: mongoose.SchemaDefinition<Input>
  ) {
    if (!(collectionName || connectionURI || modelName || schema)) {
      throw new Error('Missing arguments')
    }
    this.collectionName = collectionName
    this.connectionURL = connectionURI
    this.modelName = modelName
    this.schema = new mongoose.Schema<Input>(schema)
    this.db = mongoose.createConnection(connectionURI)
    this.Model = this.db.model<Input>(modelName, this.schema, collectionName)
  }

  async save(Data: Input | Input[]) {
    try {
      return await this.Model.create(Data)
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async update(id: string, Data: Partial<Input>) {
    try {
      await this.Model.findByIdAndUpdate(id, Data).exec()
      return await this.Model.findById(id)
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async getById(id: string) {
    try {
      return await this.Model.findById(id)
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async getAll() {
    try {
      return await this.Model.find()
    } catch (error) {
      logger.error(error)
      return []
    }
  }

  async deleteById(id: string) {
    try {
      await this.Model.findByIdAndDelete(id)
    } catch (error) {
      logger.error(error)
    }
    return null
  }

  async deleteAll() {
    try {
      await this.Model.deleteMany()
    } catch (error) {
      logger.error(error)
    }
    return null
  }
}
