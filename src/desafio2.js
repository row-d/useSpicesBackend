import { faker } from '@faker-js/faker'

import Contenedor from './Contenedor.js'
import Usuario from './Usuario.js'

const container = new Contenedor('users.json')

// const user = new Usuario(faker.name.firstName(), faker.name.lastName())
const rest = new Array(10)
  .fill(new Usuario(faker.name.firstName(), faker.name.lastName()))
  .map((obj, i) => ({ ...obj, id: i }))

;(async () => {
  await container.deleteAll()
  for (let i = 0; i < rest.length; i++) {
    await container.save(rest[i])
  }
  const data = await container.getAll()
  console.table(data)
  console.log(await container.getById(5))
})()
