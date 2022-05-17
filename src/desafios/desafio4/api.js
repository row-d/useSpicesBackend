import express from 'express'
import multer from 'multer'
import Contenedor from '../../Contenedor.js'

const productsApi = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/thumbnails')
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString().split('T')[0]}-${file.originalname}`)
  },
})
const upload = multer({ storage })

const contenedor = new Contenedor('../productos.json')

productsApi.use(express.json())
productsApi.use(express.urlencoded({ extended: true }))

// devuelve todos los productos.
productsApi.get('/', async (req, res) => {
  res.send(await contenedor.getAll())
})

// devuelve un producto según su id.
productsApi.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const producto = await contenedor.getById(id)
  if (producto !== null) {
    res.send(producto)
    console.log(`Producto ${id} encontrado`)
  } else {
    res.status(404).send({ error: 'Producto no encontrado' })
  }
})

// recibe y agrega un producto, y lo devuelve con su id asignado.
productsApi.post('/', upload.single('thumbnail'), async (req, res) => {
  const producto = req.body
  const file = req.file

  if (!file) {
    res.status(400).send({ error: 'Debe subir una imagen' })
  }

  const parsedProduct = {
    title: producto.title,
    price: Number(producto.price),
    thumbnail: file.path.replace('public', ''),
  }

  const id = await contenedor.save(parsedProduct)

  res.send({ ...parsedProduct, id })

  console.log(`${file.originalname} archivado en ${file.path}`)
})

// recibe y actualiza un producto según su id.
productsApi.put('/:id', upload.single('thumbnail'), async (req, res) => {
  const id = Number(req.params.id)
  const product = { ...req.body }
  const actual = await contenedor.getById(id)
  const file = req.file

  if (!actual) {
    res.status(404).send({ error: 'Producto no encontrado' })
  }

  const parsedProduct = {}

  if (product.title !== actual.title) {
    parsedProduct.title = product.title
  }

  if (product.price !== actual.price) {
    parsedProduct.price = Number(product.price)
  }

  file
    ? (parsedProduct.thumbnail = file.path.replace('public', ''))
    : (parsedProduct.thumbnail = actual.thumbnail)

  await contenedor.update(id, parsedProduct)

  res.send({ ...parsedProduct, id })

  console.log(`Producto ${id} actualizado`)
})

// elimina un producto según su id.
productsApi.delete('/:id', async (req, res) => {
  await contenedor.deleteById(Number(req.params.id))
  console.log(`Producto ${req.params.id} eliminado`)
})

export default productsApi
