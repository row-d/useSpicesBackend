import 'dotenv/config'

import knex from 'knex'

import mariadbConfig from '../src/connections/mariadb'
import sqliteConfig from '../src/connections/sqlite'

console.table(mariadbConfig.development)

const mariadb = knex(
  process.env.NODE_ENV === 'production'
    ? mariadbConfig.production
    : mariadbConfig.development
)

const sqlite = knex(
  process.env.NODE_ENV === 'production'
    ? sqliteConfig.production
    : sqliteConfig.development
)

;(async () => {
  if (!(await sqlite.schema.hasTable('messages'))) {
    await sqlite.schema.createTableIfNotExists('messages', (table) => {
      table.increments('id').primary()
      table.string('email')
      table.string('message')
      table.string('instant_sent')
    })
  }
  if (!(await mariadb.schema.hasTable('products'))) {
    await mariadb.schema.createTableIfNotExists('products', (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.string('price').notNullable()
      table.string('thumbnail').notNullable()
    })
  }
})()
