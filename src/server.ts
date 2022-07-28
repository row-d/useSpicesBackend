import 'dotenv/config'

import { faker } from '@faker-js/faker'
import { fork } from 'child_process'
import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'
import yargs from 'yargs/yargs'

import { auth, chat, products } from './routes'

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

const args = yargs(process.argv.slice(2))
  .options({
    port: {
      alias: 'p',
      default: Number(process.env.PORT) || 8080,
      describe: 'Port to run the server on',
      type: 'number',
    },
  })
  .parseSync()

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

app.get('/api/randoms', (req, res) => {
  const scriptPath = path.resolve(__dirname, 'functions/randoms')
  const child = fork(scriptPath)
  const range = req.query.cant
  range ? child.send(Number(range)) : child.send(1e8)

  child.on('exit', (code) => {
    if (code !== 0) {
      const err: Error & { statusCode?: number } = new Error(
        'Error in child process'
      )
      err.statusCode = 500
    }
  })

  child.on('message', (msg) => {
    res.send(msg)
  })
})

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
  res.json({
    args,
    execPath: process.execPath,
    pid: process.pid,
    dirname: process.cwd(),
    version: process.version,
    platform: process.platform,
    rss: process.memoryUsage.rss(),
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

const port = args.port
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
