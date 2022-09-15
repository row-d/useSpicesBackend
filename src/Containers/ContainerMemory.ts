import { v4 as uuidv4 } from 'uuid'

import logger from '../logger'
import AbstractContainer from './AbstractContainer'

export default class ContainerMemory<Input>
  implements AbstractContainer<Input>
{
  private _data: Map<string, Input>

  constructor() {
    this._data = new Map()
  }

  async save(Data: Input | Input[]) {
    logger.info('Saving data in memory' + JSON.stringify(Data))
    if (!Array.isArray(Data)) {
      const id = uuidv4()
      this._data.set(id, Data)
      return id
    }
    return Data.map((data) => {
      const id = uuidv4()
      this._data.set(id, data)
      return id
    })
  }

  async update(id: string, Data: Partial<Input>) {
    const actual = await this.getById(id)
    if (!actual) {
      return null
    }
    const updated = { ...actual, ...Data }
    this._data.set(id, updated)
    return updated
  }

  async getById(id: string) {
    logger.info('Looking for ' + id)
    return this._data.get(id) || null
  }

  async getAll() {
    logger.info('Getting all data' + JSON.stringify(this._data))
    return [...this._data.values()]
  }

  async deleteById(id: string) {
    this._data.delete(id)
  }

  async deleteAll() {
    this._data.clear()
  }
}
