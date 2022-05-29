const Contenedor = require('./Contenedor.js')
const fs = require('fs/promises')
const multer = require('multer')
const express = require('express')

class ContenedorController {
  constructor(file, destination = 'public/thumbnails', redirect = false) {
    fs.mkdir(destination, { recursive: true })
    this.route = express.Router()
    this.route.use(express.static(destination.split('/')[0]))
    this.route.use(express.json())
    this.route.use(express.urlencoded({ extended: true }))
    this.contenedor = new Contenedor(file)
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, destination)
      },
      filename: (req, file, cb) => {
        cb(
          null,
          `${new Date().toISOString().split('T')[0]}-${file.originalname}`
        )
      },
    })
    this.upload = multer({ storage: this.storage })
    this.route.get('/', this.getData)
    this.route.get('/:id', this.getId)
    this.route.post(
      '/',
      this.upload.single('thumbnail'),
      this.postData(redirect)
    )
    this.route.put('/:id', this.upload.single('thumbnail'), this.putId)
    this.route.delete('/:id', this.deleteId)
  }

  async getData(_, res) {
    res.send(await this.contenedor.getAll())
  }

  async getId(req, res) {
    const id = Number(req.params.id)
    const producto = await this.contenedor.getById(id)
    if (producto !== null) {
      res.send(producto)
    } else {
      res.status(404).send({ error: 'Producto no encontrado' })
    }
  }

  postData(redirect) {
    return async (req, res) => {
      const producto = req.body
      const file = req.file
      const parsedProduct = { ...producto }
      if (file) {
        parsedProduct.thumbnail = file.path.replace('public', '')
      }
      const id = await this.contenedor.save(parsedProduct)
      if (redirect === true) {
        return res.redirect(302, '/')
      }
      return res.send({ ...parsedProduct, id })
    }
  }

  async putId(req, res) {
    const id = Number(req.params.id)
    const reqData = { ...req.body }
    const actual = await this.contenedor.getById(id)
    const file = req.file

    if (!actual) {
      return res.status(404).send({ error: 'Producto no encontrado' })
    }

    const parsedProduct = {}

    Object.entries(reqData).forEach(([key, value]) => {
      if (value !== actual[key]) {
        parsedProduct[key] = value
      }
    })

    if (file) {
      parsedProduct.thumbnail = file.path.replace('public', '')
    }
    await this.contenedor.update(id, parsedProduct)

    res.send({ ...parsedProduct, id })
  }

  async deleteId(req, _) {
    await this.contenedor.deleteById(Number(req.params.id))
  }
}

module.exports = ContenedorController
