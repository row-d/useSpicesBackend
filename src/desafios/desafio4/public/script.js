import { getProducts, postProduct, deleteProduct,putProduct } from './api.js'
// HTML Elements
const productsDiv = document.getElementById('products')
const dragImgArea = document.getElementById('drag-img-area')
const fileUpload = document.getElementById('file-upload')
const postProductForm = document.querySelector("form[action='/api/productos']")

// Event Listeners
window.addEventListener('DOMContentLoaded', async () => {
  const products = await getProducts()
  const productsElement = products.map(({ title, price, thumbnail, id }) => {
    const element = document.createElement('div')
    element.id = id
    element.innerHTML = `
    <a href="/api/productos/${id}" class="group">
        <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <img src="${thumbnail}" alt="${title}" class="w-full h-full object-center object-cover group-hover:opacity-75">
        </div>
        <h3 aria-label="title" class="mt-4 text-sm text-gray-700">${title}</h3>
        <p aria-label="price" class="mt-1 text-lg font-medium text-gray-900">$${price}</p>
        </a>
        <div class="flex justify-between">
          <button class="removeProduct rounded p-1 right-0 text-white bg-red-400 hover:text-red-400 hover:bg-white">remove</button>
          <button class="edit">Edit</button>
        </div>
    `

    element.querySelector('.removeProduct').addEventListener('click', () => {
      deleteProduct(id)
      element.remove()
    })



    return element
  })
  productsElement.forEach((element) => productsDiv.appendChild(element))
})

dragImgArea.addEventListener('dragover', (e) => {
  e.preventDefault()
  e.stopPropagation()
})

dragImgArea.addEventListener('drop', (e) => {
  e.preventDefault()
  e.stopPropagation()
  const file = e.dataTransfer.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = document.createElement('img')
    img.src = e.target.result
    img.className = 'w-full h-full object-center object-cover'
    dragImgArea.innerHTML = ''
    dragImgArea.appendChild(img)
  }
  reader.readAsDataURL(file)
})

fileUpload.addEventListener('change', (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = document.createElement('img')
    img.src = e.target.result
    img.className = 'w-full h-full object-center object-cover'
    dragImgArea.innerHTML = ''
    dragImgArea.appendChild(img)
  }
  reader.readAsDataURL(file)
})

postProductForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(postProductForm)
  formData.append('thumbnail', fileUpload.files[0])
  const product = await postProduct(formData)
})
