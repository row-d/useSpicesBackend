import { faker } from '@faker-js/faker'
import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'

import cli from './cli'
import { auth, chat, products, randoms } from './routes'

// Server constants & config
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      email: string
      password: string
      _id?: string
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    email: string
    password: string
    _id?: string
  }
}

const args = cli(process.argv)
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Middlewares

if (process.env.NODE_ENV !== 'production') {
  ;(async function () {
    const morgan = await import('morgan')

    app.use(morgan.default('tiny'))
  })()
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes

app.use('/', new auth().route)
app.use('/api/chats', new chat().route)
app.use('/api/products', new products().route)
app.use('/api/randoms', randoms)

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

app.get('/info', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const os = require('os')

  res.render('layouts/info', {
    platform: process.platform,
    version: process.version,
    cpus: os.cpus().length,
    rss: process.memoryUsage.rss(),
    pid: process.pid,
    dirname: process.cwd(),
    execPath: process.execPath,
    args: args,
  })
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

export default server
