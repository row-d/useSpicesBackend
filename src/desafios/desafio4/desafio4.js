import express from 'express'
import productsApi from './api.js'

const app = express()
const port = process.env.PORT || 8080
app.use('/api/productos', productsApi)
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
