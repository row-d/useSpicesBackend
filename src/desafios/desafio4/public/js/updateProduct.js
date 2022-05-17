import { productTemplate, productsDiv } from './products.js'
import { putProduct } from './api.js'

const dragImgAreaPut = document.getElementById('drag-img-area-put')
const fileUploadPut = document.getElementById('file-upload-put')
const putProductForm = document.querySelector("form[method='PUT']")

// Put Form
dragImgAreaPut.addEventListener('dragover', (e) => {
  e.preventDefault()
  e.stopPropagation()
})

dragImgAreaPut.addEventListener('drop', (e) => {
  e.preventDefault()
  e.stopPropagation()
  const file = e.dataTransfer.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = document.createElement('img')
    img.src = e.target.result
    img.className = 'w-full h-full object-center object-cover'
    dragImgAreaPut.innerHTML = ''
    dragImgAreaPut.appendChild(img)
  }
  reader.readAsDataURL(file)
})

fileUploadPut.addEventListener('change', (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = document.createElement('img')
    img.src = e.target.result
    img.className = 'w-full h-full object-center object-cover'
    dragImgAreaPut.innerHTML = ''
    dragImgAreaPut.appendChild(img)
  }
  reader.readAsDataURL(file)
})

putProductForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(putProductForm)
  const id = putProductForm.querySelector('input[name="productId"]').value
  if (fileUploadPut.files[0]) {
    formData.append('thumbnail', fileUploadPut.files[0])
  }

  const product = await putProduct(id, formData)
  productsDiv.replaceChild(
    productTemplate(product),
    document.getElementById(id)
  )
  // clean form
  putProductForm.reset()
})
