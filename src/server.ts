import 'dotenv/config'

import { faker } from '@faker-js/faker'
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import path from 'path'
import { Server } from 'socket.io'

import { chat, products } from './routes'

// Server constants & config

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('tiny'))

// Routes
app.use('/api/chats', new chat().route)
app.use('/api/products', new products().route)

app.get('/api/productos-test', (req, res) => {
  res.json(
    Array.from({ length: 5 }, () => ({
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.imageUrl(640, 480, undefined, true),
    }))
  )
})

app.get('/', (req, res) => {
  res.render('layouts/index', {
    headers: ['id', 'title', 'price', 'thumbnail'],
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
