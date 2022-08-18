import bcrypt from 'bcrypt'

export function createHash(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

export function compareHash(password: string, hash: string) {
  return bcrypt.compareSync(password, hash)
}
