import { fork } from 'child_process'
import { Router } from 'express'
import path from 'path'

const randoms = Router()
randoms.get('/', (req, res) => {
  const scriptPath = path.resolve(__dirname, '../functions/randoms')
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

export default randoms
