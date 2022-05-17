import { postProduct } from './api.js'
import { productTemplate, productsDiv } from './products.js'

const dragImgAreaPost = document.getElementById('drag-img-area-post')
const fileUploadPost = document.getElementById('file-upload-post')
const postProductForm = document.querySelector("form[method='POST']")

console.log(dragImgAreaPost, fileUploadPost, postProductForm)

// Post Form
dragImgAreaPost.addEventListener('dragover', (e) => {
  e.preventDefault()
  e.stopPropagation()
})

dragImgAreaPost.addEventListener('drop', (e) => {
  e.preventDefault()
  e.stopPropagation()
  const file = e.dataTransfer.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = document.createElement('img')
    img.src = e.target.result
    img.className = 'w-full h-full object-center object-cover'
    dragImgAreaPost.innerHTML = ''
    dragImgAreaPost.appendChild(img)
  }
  reader.readAsDataURL(file)
})

fileUploadPost.addEventListener('change', (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = document.createElement('img')
    img.src = e.target.result
    img.className = 'w-full h-full object-center object-cover'
    dragImgAreaPost.innerHTML = ''
    dragImgAreaPost.appendChild(img)
  }
  reader.readAsDataURL(file)
})

postProductForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(postProductForm)
  formData.append('thumbnail', fileUploadPost.files[0])
  const product = await postProduct(formData)
  productsDiv.appendChild(productTemplate(product))
  // clean form
  postProductForm.reset()
})
