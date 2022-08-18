/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'

import AbstractContainer from './AbstractContainer'
import ContainerId from './types/ContainerId'

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
    schema: mongoose.SchemaDefinition
  ) {
    this.collection = collection
    this.connectionURL = connectionURI
    this.modelName = modelName
    this.schema = new mongoose.Schema<Input>(schema)
    this.db = mongoose.createConnection(connectionURI, { keepAlive: true })
    this.Model = this.db.model<Input>(modelName, this.schema, collection)
  }

  async save(Data: Input | Input[]) {
    return await this.Model.create(Data)
  }

  async update(ID: ContainerId, Data: Input) {
    return await this.Model.findByIdAndUpdate(ID, Data).lean()
  }

  async getById(ID: ContainerId) {
    return await this.Model.findById(ID).lean()
  }

  async getAll() {
    return await this.Model.find().lean()
  }

  async deleteById(ID: ContainerId) {
    return await this.Model.findByIdAndDelete(ID).lean()
  }

  async deleteAll() {
    return await this.Model.deleteMany().lean()
  }
}
