const typeDef = /* GraphQL */ `
  type Author {
    email: String!
    nombre: String!
    apellido: String!
    alias: String!
    avatar: String!
  }

  type Message {
    id: ID!
    text: String!
    author: Author!
  }
`
const input = /* GraphQL */ `
  input AuthorInput {
    email: String!
    nombre: String!
    apellido: String!
    alias: String!
    avatar: String!
  }

  input MessageInput {
    id: ID!
    text: String!
    author: AuthorInput!
  }
`
const query = /* GraphQL */ `
    getMessages: [Message!]!
    getMessage(id: ID!): Message
`
const mutation = /* GraphQL */ `
    createMessage(messageInput: MessageInput): Message
    updateMessage(id: ID!, messageInput: MessageInput): Message
    deleteMessage(id: ID!): Message
    deleteAllMessages: Message
`

const ChatSchema = {
  typeDef,
  input,
  query,
  mutation,
}

export default ChatSchema
