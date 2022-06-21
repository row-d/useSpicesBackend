import { resolve } from 'path'

import KnexConfig from '../types/KnexConfig'

const config: KnexConfig = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      port: 49153,
      password: 'mariadbpw',
      database: 'ecommerce',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.MARIADB_HOST,
      port: process.env.MARIADB_PORT,
      user: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE,
    },
  },
}

export default config
