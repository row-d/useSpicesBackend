// chat elements
const chatForm = document.getElementById('chatForm')
const emailInput = chatForm.querySelector('input[name="email"]')
const messageInput = chatForm.querySelector('input[name="message"]')
const chatMessages = document.getElementById('chatMessages')
// Post product
const postForm = document.getElementById('postProduct')
const productsBody = document.querySelector('#products tbody')
// template helpers
async function getRowTemplate(data) {
  const response = await fetch(`/rowTemplate`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST',
  })
  const html = await response.text()
  return html
}

async function getChatBoxTemplate(data) {
  const response = await fetch(`/chatBoxTemplate`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST',
  })
  const html = await response.text()
  return html
}
// Socket.io
const socket = io() // eslint-disable-line

// Chat
// save message function
async function saveMessage(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }
  await fetch('/chats', options)
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const user = {
    email: emailInput.value,
    message: messageInput.value,
    instantSent: new Date().toLocaleString(),
  }
  socket.emit('chat:message', user)
  await saveMessage(user)
  messageInput.value = ''
})

socket.on('chat:message', async ({ email, message, instantSent }) => {
  const chatBox = document.createElement('div')
  const template = await getChatBoxTemplate({ email, message, instantSent })
  chatBox.innerHTML = template
  chatMessages.appendChild(chatBox)
  window.scrollTo(0, chatBox.scrollHeight)
})

// Product
// save product function

async function saveProduct(formData) {
  const options = {
    method: 'POST',
    body: formData,
  }
  const res = await fetch('/productos', options)
  return res.json()
}

postForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = await saveProduct(new FormData(postForm))
  socket.emit('producto:post', data)
})

socket.on('producto:post', async (data) => {
  console.log(data)
  const template = await getRowTemplate(data)
  const row = document.createElement('tr')
  row.innerHTML = template
  productsBody.appendChild(row)
  postForm.reset()
})
