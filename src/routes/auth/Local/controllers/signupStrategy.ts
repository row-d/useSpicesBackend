import { Strategy as LocalStrategy } from 'passport-local'

import AuthDAOMongodb from '../../../../DAOs/Auth/AuthDAOMongodb'
import { createHash } from './helpers/hashing'

// type AuthUser = {
//   email: string
//   password: string
// }

export const signupStrategy = (DAO: AuthDAOMongodb) =>
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await DAO.Model.findOne({ email })
      if (user) {
        return done(null, false, { message: 'User already exists' })
      }
      const newUser = await DAO.Model.create({
        email,
        password: createHash(password),
      })

      return done(null, newUser)
    }
  )
