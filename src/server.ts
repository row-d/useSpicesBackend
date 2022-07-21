import 'dotenv/config'

import { faker } from '@faker-js/faker'
import MongoStore from 'connect-mongo'
import express from 'express'
import session from 'express-session'
import http from 'http'
import { MongoClientOptions } from 'mongodb'
import morgan from 'morgan'
import path from 'path'
import { Server } from 'socket.io'

import { chat, products } from './routes'

// Server constants & config
declare module 'express-session' {
  interface SessionData {
    user: string
  }
}
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Middlewares

process.env.NODE_ENV === 'development' && app.use(morgan('tiny')) // dev
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      mongoOptions: advancedOptions as MongoClientOptions,
      ttl: 60,
    }),
    secret: 'asd123',
    resave: true,
    saveUninitialized: true,
  })
)

// Routes
app.use('/api/chats', new chat().route)
app.use('/api/products', new products().route)

app.get('/api/productos-test', (req, res) => {
  res.json(
    Array.from({ length: 5 }, () => ({
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.imageUrl(480, 480, undefined, true),
    }))
  )
})

app.get('/', (req, res) => {
  const user = req.session.user

  user
    ? res.render('layouts/index', {
        headers: ['id', 'title', 'price', 'thumbnail'],
        user,
        title: 'App',
      })
    : res.redirect('/login')
})

app.get('/login', (req, res) => {
  const user = req.session.user
  user ? res.redirect('/') : res.render('layouts/login', { title: 'Login' })
})

app.get('/logout', async (req, res) => {
  const user = req.session.user
  if (user) {
    return req.session.destroy((err) => {
      if (err) {
        return res.redirect('/login')
      }
      return res.render('layouts/logout', {
        message: `See you later ${user}`,
        title: `Goodbye ${user}`,
      })
    })
  }
})

app.post('/login', async (req, res) => {
  const { user } = req.body
  if (!user)
    return res.render('layouts/login', {
      message: 'No user provided',
      title: 'Login',
    })
  req.session.user = user
  res.redirect('/')
})

// Socket.io

io.on('connection', (socket) => {
  socket.on('chat:message', (msg) => {
    io.emit('chat:message', msg)
  })
  socket.on('product:post', (data) => {
    io.emit('product:post', data)
  })
})

const port = process.env.PORT || 8080
const mode = process.env.NODE_ENV || 'development'

server.listen(port, () => {
  console.log(
    'App is running at \x1b[36mhttp://localhost:%d\x1b[0m in \x1b[33m%s \x1b[36m\x1b[0mmode',
    port,
    mode
  )
  console.log('\x1b[31mPress CTRL-C to stop\x1b[0m')
})

export default server
