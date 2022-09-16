import { v4 as uuidv4 } from 'uuid'

import AbstractContainer from './AbstractContainer'

export default class ContainerMemory<Input>
  implements AbstractContainer<Input>
{
  private _data: Map<string, Input & { id: string }>

  constructor() {
    this._data = new Map()
  }

  async save(Data: Input | Input[]) {
    if (!Array.isArray(Data)) {
      const id = uuidv4()
      const hydrated = { ...Data, id }
      this._data.set(id, hydrated)
      return hydrated
    }
    return Data.map((d: Input) => {
      const id = uuidv4()
      const hydrated = { ...d, id }
      this._data.set(id, hydrated)
      return hydrated
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
    return this._data.get(id) || null
  }

  async getAll() {
    return [...this._data.values()]
  }

  async deleteById(id: string) {
    this._data.delete(id)
  }

  async deleteAll() {
    this._data.clear()
  }
}
