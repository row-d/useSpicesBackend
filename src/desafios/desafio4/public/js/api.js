// API consumer
const getProducts = async () => {
  const products = await fetch('/api/productos')
  const productsJson = await products.json()
  return productsJson
}

const getProduct = async (id) => {
  const product = await fetch(`/api/productos/${id}`)
  const productJson = await product.json()
  return productJson
}

const postProduct = async (product) => {
  const response = await fetch('/api/productos', {
    method: 'POST',
    body: product,
  })
  const responseJson = await response.json()
  return responseJson
}

const putProduct = async (id, product) => {
  const response = await fetch(`/api/productos/${id}`, {
    method: 'PUT',
    body: product,
  })
  const responseJson = await response.json()
  return responseJson
}

const deleteProduct = async (id) => {
  const response = await fetch(`/api/productos/${id}`, { method: 'DELETE' })
  const responseJson = await response.json()
  return responseJson
}

export { getProducts, getProduct, postProduct, putProduct, deleteProduct }
