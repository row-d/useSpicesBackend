// Dependecies
const http = require('http')
const express = require('express')
const { Server } = require('socket.io')
const ApiController = require('./ApiController.js')

// Server constants & config
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const productosController = new ApiController('./productos.json')
const chatsController = new ApiController('./chat.json')
const port = process.env.PORT || 8080
app.set('views', './views')
app.set('view engine', 'pug')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Routes
app.use('/chats', chatsController.route)
app.use('/productos', productosController.route)

app.get('/', async (req, res) => {
  res.render('layouts/index', {
    headers: ['id', 'title', 'price', 'thumbnail'],
    products: await productosController.contenedor.getAll(),
    messages: await chatsController.contenedor.getAll(),
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
  const { message, email, instantSent } = req.body
  res.render('templates/chatBox', {
    user: {
      message,
      email,
      instantSent,
    },
  })
})

// Socket.io

io.on('connection', (socket) => {
  socket.on('chat:message', (msg) => {
    io.emit('chat:message', msg)
  })
  socket.on('producto:post', (data) => {
    io.emit('producto:post', data)
  })
})

server.listen(port)

app.on('error', (err) => {
  console.err(err)
})
