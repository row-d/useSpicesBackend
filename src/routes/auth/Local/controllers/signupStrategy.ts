import mongoose from 'mongoose'
import { Strategy as LocalStrategy } from 'passport-local'

import { createHash } from './helpers/hashing'

type AuthUser = {
  email: string
  password: string
}

export const signupStrategy = (userModel: mongoose.Model<AuthUser>) =>
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await userModel.findOne({ email: email, password }).lean()
      if (user) {
        return done(null, false, { message: 'User already exists' })
      }
      const newUser = await userModel.create({
        email,
        password: createHash(password),
      })

      return done(null, newUser)
    }
  )
