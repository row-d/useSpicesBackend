export default interface AbstractContainer<input, output, idType = string> {
  save(data: input | input[]): Promise<output | output[] | null>
  update(id: idType, data: Partial<input>): Promise<output | null>
  getById(id: idType): Promise<output | null>
  getAll(): Promise<output[]>
  deleteById(id: idType): Promise<null>
  deleteAll(): Promise<null>
}
