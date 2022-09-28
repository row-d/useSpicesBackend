import flash from 'connect-flash'
import express from 'express'
import session from 'express-session'
import passport from 'passport'

import AuthContainerMongodb from '../../../DAOs/Auth/AuthDAOMongodb'
import isAuthenticated from '../../../middlewares/isAuthenticated'
import { loginStrategy } from './controllers/loginStrategy'
import { deserialize, serialize } from './controllers/serial'
import { signupStrategy } from './controllers/signupStrategy'

export default class AuthLocalRoute {
  route: express.Router
  container: AuthContainerMongodb
  constructor() {
    this.container = new AuthContainerMongodb()
    this.route = express.Router()
    this.route.use(
      session({
        cookie: { maxAge: 600000 },
        rolling: true,
        secret: 'asd123',
        resave: true,
        saveUninitialized: false,
      })
    )
    this.route.use(express.json())
    this.route.use(express.urlencoded({ extended: false }))
    this.route.use(passport.initialize())
    this.route.use(passport.session())
    this.route.use(flash())

    passport.use('login', loginStrategy(this.container))
    passport.use('signup', signupStrategy(this.container))
    passport.serializeUser(serialize)
    passport.deserializeUser(deserialize(this.container))
    this.route.post(
      '/auth/login',
      passport.authenticate('login', {
        failureRedirect: '/login',
        successRedirect: '/',
        failureFlash: true,
      })
    )

    this.route.post(
      '/auth/signup',
      passport.authenticate('signup', {
        failureRedirect: '/signup',
        successRedirect: '/',
        failureFlash: true,
      })
    )

    this.route.get('/', isAuthenticated(), (req, res) => {
      res.render('layouts/index', {
        headers: ['id', 'title', 'price', 'thumbnail'],
        title: 'App',
      })
    })

    this.route.get('/signup', (req, res) => {
      res.render('layouts/signup', {
        title: 'Signup',
        messages: req.flash('error'),
      })
    })

    this.route.get('/login', (req, res) => {
      res.render('layouts/login', {
        title: 'Login',
        messages: req.flash('error'),
      })
    })

    this.route.get('/logout', isAuthenticated(), async (req, res) => {
      return res.render('layouts/logout', {
        message: 'Logged out successfully',
        title: `Logout`,
      })
    })
  }
}
