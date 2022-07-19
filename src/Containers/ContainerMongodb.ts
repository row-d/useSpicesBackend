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
    this.db = mongoose.createConnection(connectionURI, { keepAlive: true })
    this.Model = this.db.model(modelName, this.schema, collection)
  }

  async save(Data: object): Promise<object> {
    const res = await this.Model.create(Data)
    const { __v, _id, ...rest } = await res.toObject()
    return rest
  }

  async update(ID: ContainerId, Data: object): Promise<object | null> {
    return await this.Model.findByIdAndUpdate(ID, Data).exec()
  }

  async getById(ID: ContainerId): Promise<object | null> {
    return await this.Model.findById(ID)
  }

  async getAll(): Promise<object[]> {
    const res = await this.Model.find({}, { _id: 0, __v: 0 })
    return res.map((item) => item.toObject())
  }

  async deleteById(ID: ContainerId): Promise<object | null> {
    return await this.Model.findByIdAndDelete(ID).exec()
  }

  async deleteAll(): Promise<object> {
    return await this.Model.deleteMany()
  }
}
