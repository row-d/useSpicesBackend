const user = document.getElementById('user')
const form = document.getElementsByTagName('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: user.value,
    }),
  })
})
