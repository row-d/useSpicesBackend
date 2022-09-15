export default interface AbstractContainer<Input> {
  save(
    Data: Input | Input[]
  ): Promise<Input | string | Array<Input | string> | null>
  update(id: string, Data: Partial<Input>): Promise<Input | null>
  getById(id: string): Promise<Input | null>
  getAll(): Promise<Input[] | null>
  deleteById(id: string): Promise<void | null>
  deleteAll(): Promise<void | null>
}
