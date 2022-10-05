import { buildSchema } from 'graphql'

import ChatSchema from './Chat'
import ProductSchema from './Product'

const schema = buildSchema(
  `
    ${ChatSchema.typeDef}
    ${ProductSchema.typeDef}
    ${ChatSchema.input}
    ${ProductSchema.input}
    
    type Query {
      ${ChatSchema.query}
      ${ProductSchema.query}
    }

    type Mutation {
      ${ChatSchema.mutation}
      ${ProductSchema.mutation}
    }

  `
)

export default schema
