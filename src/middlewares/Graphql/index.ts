import { graphqlHTTP } from 'express-graphql'

import rootValue from './Resolvers'
import schema from './Schemas'

export default function gqlmid() {
  return graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
}
