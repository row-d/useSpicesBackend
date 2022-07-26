import express from 'express'
import session from 'express-session'
import passport from 'passport'

import { loginStrategy } from './controllers/loginStrategy'
import { deserialize, serialize } from './controllers/serial'
import { signupOptions, signupStrategy } from './controllers/signupStrategy'

export default class AuthLocalRoute {
  route: express.Router
  constructor() {
    this.route = express.Router()
    this.route.use(
      session({ secret: 'secret', resave: true, saveUninitialized: true })
    )
    this.route.use(passport.initialize())
    this.route.use(passport.session())

    passport.use('login', loginStrategy)
    passport.use(signupOptions, 'signup', signupStrategy)
    passport.serializeUser(serialize)

    passport.deserializeUser(deserialize)
  }
}
