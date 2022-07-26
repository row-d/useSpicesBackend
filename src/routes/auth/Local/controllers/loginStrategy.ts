import mongoose from 'mongoose'
import { Strategy as LocalStrategy } from 'passport-local'

import { compareHash } from './helpers/hashing'

type AuthUser = {
  email: string
  password: string
}

export const loginStrategy = (User: mongoose.Model<AuthUser>) =>
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await User.findOne({ email: email }).lean()
      if (!user) {
        return done(null, false, { message: 'User not found' })
      }

      if (!compareHash(password, user.password)) {
        return done(null, false, { message: 'Incorrect password' })
      }
      return done(null, user)
    }
  )
