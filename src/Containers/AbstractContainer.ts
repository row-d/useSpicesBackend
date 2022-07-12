import ContainerId from './types/ContainerId'

export default interface AbstractContainer {
  save(Data: object): Promise<object>
  update(ID: ContainerId, Data: object): Promise<object | null>
  getById(ID: ContainerId): Promise<object | null>
  getAll(): Promise<object[]>
  deleteById(ID: ContainerId): Promise<object | null>
  deleteAll(): Promise<object>
}
