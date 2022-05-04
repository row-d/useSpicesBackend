import express from 'express'
import Contenedor from '../Contenedor.js'

const app = express()
const port = process.env.PORT || 8080
const products = new Contenedor('productos.txt')

app.get('/productos', async (req, res) => {
  res.json(await products.getAll())
})

app.get('/productoRandom', async (req, res) => {
  const data = await products.getAll()
  const random = Math.floor(Math.random() * data.length)
  res.json(data[random])
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
