const { schema, denormalize } = normalizr
// chat elements
const chatForm = document.getElementById('chatForm')
const chatFormInputs = chatForm.querySelectorAll('input')
const chatMessages = document.getElementById('chatMessages')
// Post product
const postForm = document.getElementById('postProduct')
const productsBody = document.querySelector('#products tbody')
// template helpers
function getRowTemplate(product) {
  const template = `<td>${product._id}</td>
  <td>${product.title}</td>
  <td>${product.price}</td>`

  const image =
    (product.thumbnail || product.avatar) &&
    `<td>
    <div class="avatar">
      <div class="mask mask-squircle w-12 h-12"><img src="${
        product.thumbnail || product.avatar
      }" alt="${product.title}"/></div>
    </div>
  </td>`
  return product.thumbnail || product.avatar ? template + image : template
}

function getChatBoxTemplate(data) {
  return `<blockquote class="flex flex-col bg-base-200 p-1 rounded">
    <div class="flex gap-2">
      <span class="text-blue-300">${data.author.email}</span>
    </div>
    <p class="text-green-500 indent-8">${data.text}</p>
  </blockquote>`
}
// Normalizr Schemas/Entities
const author = new schema.Entity('authors', {}, { idAttribute: 'email' })
const message = new schema.Entity(
  'messages',
  { author },
  { idAttribute: '_id' }
)

const chatSchema = new schema.Entity('chat', {
  messages: [message],
})

// Socket.io
const socket = io() // eslint-disable-line

// ========= Chat =========
// save message function
async function getMessages() {
  const response = await fetch('/api/chats')
  console.log(
    'porcentaje : ' + Math.round(+response.headers.get('x-percentage'))
  )
  const data = await response.json()
  const denormalized = denormalize(data.result, chatSchema, data.entities)
  console.log(data)
  return denormalized
}

function renderMessage(data) {
  const chatBox = document.createElement('div')
  const template = getChatBoxTemplate(data)
  chatBox.innerHTML = template
  chatMessages.appendChild(chatBox)
}

async function saveMessage(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }
  await fetch('/api/chats', options)
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const user = {
    author: {
      email: chatFormInputs[0].value,
      nombre: chatFormInputs[1].value,
      apellido: chatFormInputs[2].value,
      alias: chatFormInputs[3].value,
      avatar: chatFormInputs[4].value,
    },
    text: chatFormInputs[5].value,
  }
  socket.emit('chat:message', user)
  await saveMessage(user)
  messageInput.value = ''
})

socket.on('chat:message', async (data) => {
  renderMessage(data)
  window.scrollTo(0, chatBox.scrollHeight)
})

// ========= Product =========
async function getProducts() {
  const res = await fetch('/api/products')
  return res.json()
}
async function getRandomProducts() {
  const res = await fetch('/api/productos-test')
  return res.json()
}

async function saveProduct(formElement) {
  const options = {
    method: 'POST',
    body: new FormData(formElement),
  }
  const res = await fetch('/api/products', options)
  return res.json()
}

function renderProduct(data) {
  const template = getRowTemplate(data)
  const row = document.createElement('tr')
  row.innerHTML = template
  productsBody.appendChild(row)
}

postForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = await saveProduct(postForm)
  socket.emit('product:post', data)
})

socket.on('product:post', async (data) => {
  renderProduct(data)
  postForm.reset()
})

// ========= On First Load =========
window.addEventListener('load', async () => {
  const { messages } = await getMessages()
  const RandomProducts = await getRandomProducts()
  const RealProducts = await getProducts()
  messages.forEach(renderMessage)
  RandomProducts.forEach(renderProduct)
  RealProducts.forEach(renderProduct)
})
