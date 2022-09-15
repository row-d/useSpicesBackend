/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'

import logger from '../logger'
import AbstractContainer from './AbstractContainer'

export class ContainerMongodb<Input> implements AbstractContainer<Input> {
  collection: string
  connectionURL: string
  db: mongoose.Connection
  modelName: string
  schema: mongoose.Schema<Input>
  Model: mongoose.Model<Input>

  constructor(
    collection: string,
    connectionURI: string,
    modelName: string,
    schema: mongoose.SchemaDefinition<Input>
  ) {
    this.collection = collection
    this.connectionURL = connectionURI
    this.modelName = modelName
    this.schema = new mongoose.Schema<Input>(schema)
    this.db = mongoose.createConnection(connectionURI, { keepAlive: true })
    this.Model = this.db.model<Input>(modelName, this.schema, collection)
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
      return this.Model.findByIdAndUpdate(id, Data)
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async getById(id: string) {
    try {
      return this.Model.findById(id) || null
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async getAll() {
    try {
      return this.Model.find()
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async deleteById(id: string) {
    try {
      this.Model.findByIdAndDelete(id)
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async deleteAll() {
    try {
      this.Model.deleteMany()
    } catch (error) {
      logger.error(error)
      return null
    }
  }
}
