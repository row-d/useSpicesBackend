import knex, { Knex } from 'knex'

export default class Container {
  knex: Knex
  table: string

  constructor(table: string, config: object) {
    this.knex = knex(config)
    this.table = table
  }

  save(Data: object) {
    return this.knex(this.table).insert(Data)
  }

  update(ID: number, Data: object) {
    return this.knex(this.table).where('id', ID).update(Data)
  }

  getById(ID: number) {
    return this.knex(this.table).where('id', ID).first()
  }

  getAll() {
    return this.knex(this.table)
  }

  deleteById(ID: number) {
    return this.knex(this.table).where('id', ID).del()
  }

  deleteAll() {
    return this.knex(this.table).del()
  }
}
