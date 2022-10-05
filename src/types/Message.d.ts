export type author = {
  email: string
  nombre: string
  apellido: string
  alias: string
  avatar: string
}

export type Message = {
  id?: string | number
  _id?: string | number
  author: author
  text: string
}
