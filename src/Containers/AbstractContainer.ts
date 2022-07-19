/* eslint-disable @typescript-eslint/no-explicit-any */
import ContainerId from './types/ContainerId'

export default interface AbstractContainer<Input> {
  save(Data: Input | Input[]): Promise<any>
  update(ID: ContainerId, Data: Input): Promise<any>
  getById(ID: ContainerId): Promise<any>
  getAll(): Promise<Array<any>>
  deleteById(ID: ContainerId): Promise<any>
  deleteAll(): Promise<any>
}
