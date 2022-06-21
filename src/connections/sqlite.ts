import { resolve } from 'path'

import KnexConfig from '../types/KnexConfig'

const config: KnexConfig = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, '../db/ecommerce.sqlite'),
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: resolve(
        __dirname,
        `../db/${process.env.SQLITE3_FILENAME}.sqlite`
      ),
    },
    useNullAsDefault: true,
  },
}

export default config
