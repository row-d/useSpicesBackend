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
    return await this.Model.findByIdAndUpdate(ID, Data)
  }

  async getById(ID: ContainerId): Promise<object | null> {
    return await this.Model.findById(ID)
  }

  async getAll(): Promise<object[]> {
    return await this.Model.find()
  }

  async deleteById(ID: ContainerId): Promise<object | null> {
    return await this.Model.findByIdAndDelete(ID)
  }

  async deleteAll(): Promise<object> {
    return await this.Model.deleteMany()
  }
}
