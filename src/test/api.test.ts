import { assertEquals } from 'https://deno.land/std@0.159.0/testing/asserts.ts'

Deno.test('create color', async () => {
  const res = await fetch('http://127.0.0.1:3000/colors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ color: 'red' }),
  })

  const data = await res.json()
  assertEquals(data.color, 'red')
})

Deno.test('get all colors', async () => {
  const res = await fetch('http://127.0.0.1:3000/colors')
  const data = await res.json()
  assertEquals(data.length, 1)
})
