import { Strategy as LocalStrategy } from 'passport-local'
import db from '../../../db/connection.js'
import { createHash } from './helpers/create-hash.js'

const User = db.model('User')

export const signupOptions = {
  passReqToCallback: true,
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}

const signupVerify = async (req, username, password, done) => {
  const user = await User.findOne({ username, password })
  if (user) {
    return done(null, false, { message: 'User already exists' })
  }
  const newUser = new User({
    username,
    password: createHash(password),
    email: req.body.email,
  })

  return done(null, newUser)
}

export const signupStrategy = new LocalStrategy(signupVerify)
