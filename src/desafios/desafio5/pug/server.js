const express = require('express')
const ApiController = require('../ApiController.js')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const controller = new ApiController('../productos.json')
const port = process.env.PORT || 8080

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Post Product',
    navbarItems: [
      { name: 'Post Product', ref: '/', active: true },
      { name: 'Products', ref: '/productos', active: false },
    ],
  })
})

app.post(
  '/productos',
  controller.upload.single('thumbnail'),
  controller.postData()
)

app.get('/productos', async (req, res) => {
  res.render('pages/products', {
    title: 'Productos',
    navbarItems: [
      { name: 'Post Product', ref: '/', active: false },
      { name: 'Products', ref: '/productos', active: true },
    ],
    products: await controller.contenedor.getAll(),
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

app.on('error', (err) => {
  console.err(err)
})
