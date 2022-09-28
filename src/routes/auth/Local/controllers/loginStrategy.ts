import { Strategy as LocalStrategy } from 'passport-local'

import AuthDAOMongodb from '../../../../DAOs/Auth/AuthDAOMongodb'
import { compareHash } from './helpers/hashing'

// type AuthUser = {
//   email: string
//   password: string
// }

export const loginStrategy = (DAO: AuthDAOMongodb) =>
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await DAO.Model.findOne({ email })
      if (!user) {
        return done(null, false, { message: 'User not found' })
      }

      if (!compareHash(password, user.password)) {
        return done(null, false, { message: 'Incorrect password' })
      }
      return done(null, user)
    }
  )
