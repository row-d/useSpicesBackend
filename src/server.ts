import 'dotenv/config'

import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'

import { chat, products } from './routes'

// Server constants & config
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/chats', chat.route)
app.use('/products', products.route)

app.get('/', async (req, res) => {
  res.render('layouts/index', {
    headers: ['id', 'title', 'price', 'thumbnail'],
    products: await products.controller.contenedor.getAll(),
    messages: await chat.controller.contenedor.getAll(),
  })
})

app.post('/rowTemplate', (req, res) => {
  const { id, title, price, thumbnail } = req.body
  res.render('templates/row', {
    product: {
      id,
      title,
      price,
      thumbnail,
    },
  })
})
app.post('/chatBoxTemplate', (req, res) => {
  const { message, email, instant_sent } = req.body
  res.render('templates/chatBox', {
    user: {
      message,
      email,
      instant_sent,
    },
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
  console.log('\tApp is running at http://localhost:%d in %s mode', port, mode)
  console.log('\tPress CTRL-C to stop\n')
})

export default server
