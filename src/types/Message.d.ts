export type Message = {
  id?: string | number
  _id?: string | number
  author: {
    email: string
    nombre: string
    apelido: string
    alias: string
    avatar: string
  }
  text: string
}
