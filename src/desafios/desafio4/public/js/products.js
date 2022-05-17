import { getProducts, deleteProduct } from './api.js'
// HTML Elements
const productsDiv = document.getElementById('products')

const productTemplate = ({ title, price, thumbnail, id }) => {
  const element = document.createElement('div')
  element.id = id
  element.innerHTML = `
  <div>
      <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img src="${thumbnail}" alt="${title}" class="w-full h-full object-center object-cover">
      </div>
      <h3 aria-label="title" class="mt-4 text-sm text-gray-700">${title}</h3>
      <p aria-label="price" class="mt-1 text-lg font-medium text-gray-900">$${price}</p>
  </div>
      <div class="flex justify-between">
        <p class="font-semibold">ID: ${id}</p>
        <button class="removeProduct text-red-400">remove</button>
      </div>
  `

  element.querySelector('.removeProduct').addEventListener('click', () => {
    deleteProduct(id)
    element.remove()
  })

  return element
}

// Event Listeners
window.addEventListener('DOMContentLoaded', async () => {
  const products = await getProducts()
  const productsElement = products.map((data) => productTemplate(data))
  productsElement.forEach((element) => productsDiv.appendChild(element))
})

export { productTemplate, productsDiv }
