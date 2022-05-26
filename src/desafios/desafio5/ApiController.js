const Contenedor = require('./Contenedor.js')
const multer = require('multer')

class ContenedorController {
  constructor(file, destination = 'public/thumbnails') {
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

  postData(status = 302, path = '/') {
    return async (req, res) => {
      const producto = req.body
      const file = req.file

      if (!file) {
        return res.status(400).send({ error: 'Debe subir una imagen' })
      }

      const parsedProduct = {
        title: producto.title,
        price: Number(producto.price),
        thumbnail: file.path.replace('public', ''),
      }
      
      await this.contenedor.save(parsedProduct)
      res.redirect(status, path)
      // const id = await this.contenedor.save(parsedProduct)
      //  res.send({ ...parsedProduct, id })
    }
  }

  async putId(req, res) {
    const id = Number(req.params.id)
    const product = { ...req.body }
    const actual = await this.contenedor.getById(id)
    const file = req.file

    if (!actual) {
      return res.status(404).send({ error: 'Producto no encontrado' })
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

    await this.contenedor.update(id, parsedProduct)

    res.send({ ...parsedProduct, id })
  }

  async deleteId(req, _) {
    await this.contenedor.deleteById(Number(req.params.id))
  }
}

module.exports = ContenedorController
