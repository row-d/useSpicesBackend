const typeDef = /* GraphQL */ `
  type Product {
    id: ID!
    title: String!
    price: Float!
    thumbnail: String!
  }
`
const input = /* GraphQL */ `
  input ProductInput {
    title: String!
    price: Float!
    thumbnail: String!
  }
`
const query = /* GraphQL */ `
    getProducts: [Product!]!
    getProduct(id: ID!): Product
`
const mutation = /* GraphQL */ `
    createProduct(productInput: ProductInput): Product
    updateProduct(id: ID!, productInput: ProductInput): Product
    deleteProduct(id: ID!): Product
    deleteAllProducts: Product
`

const ProductSchema = {
  typeDef,
  input,
  query,
  mutation,
}

export default ProductSchema
