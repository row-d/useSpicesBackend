import path from 'path'
import { writeFile } from 'fs/promises'
import { randomUser } from './utils/randomUser'
import Contenedor from '../../Contenedor'

const absPath = path.resolve('./src/tests')

describe('save method', () => {
  test('si el archivo existe agregar dato al archivo', async () => {
    const userTest = randomUser()
    const file = absPath + '/save1.json'
    const firstData = JSON.stringify([
      {
        some: 'data',
        id: 0,
      },
    ])
    await writeFile(file, firstData)
    const updatedFile = new Contenedor(file)

    const id = await updatedFile.save(userTest)
    expect(id).toBe(await updatedFile.lastId)
  })
  test('si el archivo no existe crear archivo', async () => {
    const userTest = randomUser()
    const file = absPath + '/save2.json'
    const updatedFile = new Contenedor(file)

    const id = await updatedFile.save(userTest)
    expect(id).toBe(await updatedFile.lastId)
  })

  test('si el archivo existe y tiene mas de 1 elemento debe agregar un elemento al archivo con el id correcto', async () => {
    const userTest = randomUser()
    const file = absPath + '/save3.json'

    const generatedData = new Array(5)
      .fill(randomUser())
      .map((obj, i) => ({ ...obj, id: i }))
    const jsonData = JSON.stringify(generatedData)

    await writeFile(file, jsonData)
    const updatedFile = new Contenedor(file)

    const id = await updatedFile.save(userTest)
    expect(id).toBe(5)
  })

  test('si el archivo existe y esta vacio debe escribir en el archivo', async () => {
    const file = absPath + '/save4.json'
    const userTest = randomUser()

    await writeFile(file, '')
    const updatedFile = new Contenedor(file)
    const id = await updatedFile.save(userTest)
    expect(id).toBe(1)
  })

  //  TODO: test('si ya existe un objeto igual no debe haber un duplicado', async () => {})
})
