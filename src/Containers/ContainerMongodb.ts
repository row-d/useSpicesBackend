import mongoose from 'mongoose'

import AbstractContainer from './AbstractContainer'
import ContainerId from './types/ContainerId'

export default class ContainerMongodb implements AbstractContainer {
  collection: string
  connectionURL: string
  db: mongoose.Connection
  modelName: string
  schema: mongoose.Schema
  Model: mongoose.Model<mongoose.Document>

  constructor(
    collection: string,
    connectionURI: string,
    modelName: string,
    schema: mongoose.SchemaDefinition
  ) {
    if (typeof connectionURI !== 'string') {
      throw new Error('connectionURI is required')
    }
    this.collection = collection
    this.connectionURL = connectionURI
    this.modelName = modelName
    this.schema = new mongoose.Schema(schema)
    this.db = mongoose.createConnection(connectionURI)
    this.Model = this.db.model(modelName, this.schema, collection)
  }

  async save(Data: object): Promise<object> {
    return await this.Model.create(Data)
  }

  async update(ID: ContainerId, Data: object): Promise<object | null> {
    return await this.Model.findByIdAndUpdate(ID, Data).exec()
  }

  async getById(ID: ContainerId): Promise<object | null> {
    try {
      return await this.Model.findById(ID).exec()
    } catch (error) {
      return null
    }
  }

  async getAll(): Promise<object[]> {
    try {
      return await this.Model.find().exec()
    } catch (e) {
      return []
    }
  }

  async deleteById(ID: ContainerId): Promise<object | null> {
    try {
      return await this.Model.findByIdAndDelete(ID).exec()
    } catch {
      return null
    }
  }

  async deleteAll(): Promise<object> {
    try {
      return await this.Model.deleteMany().exec()
    } catch (e) {
      return {}
    }
  }
}
