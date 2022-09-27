import Joi from 'joi'
import { v4 as uuidv4 } from 'uuid'

import logger from '../logger'
import AbstractContainer from './AbstractContainer'

export default class ContainerMemory<In>
  implements AbstractContainer<In, In & { id: string }>
{
  private _data: Map<string, In & { id: string }>
  private _schema: Joi.Schema<In>

  constructor(JoiSchema: Joi.Schema<In>) {
    if (!JoiSchema) throw new Error('JoiSchema is required')
    this._schema = JoiSchema
    this._data = new Map()
  }

  assignId(i: In) {
    const id = uuidv4()
    const ContainerObject = { ...i, id }
    return ContainerObject
  }

  async save(Data: In | In[]) {
    try {
      if (!Data) return null

      if (Array.isArray(Data)) {
        const validated = await Promise.all(
          Data.map((i) => this._schema.validateAsync(i))
        )
        const formatted = validated.map((i) => this.assignId(i))
        formatted.forEach((i) => this._data.set(i.id, i))
        return formatted
      }

      const validated = await this._schema.validateAsync(Data)
      const formatted = this.assignId(validated)
      this._data.set(formatted.id, formatted)
      return formatted
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async update(id: string, Data: Partial<In>) {
    const actual = await this.getById(id)
    if (!actual) {
      return null
    }
    const updated = { ...actual, ...Data }
    this._data.set(id, updated)
    return updated
  }

  async getById(id: string) {
    return this._data.get(id) || null
  }

  async getAll() {
    return Array.from(this._data.values())
  }

  async deleteById(id: string) {
    this._data.delete(id)
    return null
  }

  async deleteAll() {
    this._data.clear()
    return null
  }
}
