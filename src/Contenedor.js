import { writeFile, readFile, access, unlink } from 'fs/promises'
import { constants } from 'fs'

class Contenedor {
  constructor(fileName) {
    this.file = fileName
    this.lastId = 0
  }

  async fileExists() {
    let exists
    try {
      await access(this.file, constants.F_OK)
      exists = true
    } catch (e) {
      exists = false
    }
    return exists
  }

  async save(ObjectData) {
    const parsedData = { ...ObjectData, id: ++this.lastId }

    if (await this.fileExists()) {
      const data = await this.getAll()

      if (data.length > 0) {
        this.lastId = data.at(-1)?.id
        parsedData.id = ++this.lastId
      }

      const newData = JSON.stringify([...data, parsedData], null, 2)
      await writeFile(this.file, newData)
    } else {
      await writeFile(this.file, JSON.stringify([parsedData]))
    }

    return this.lastId
  }

  async getById(ObjectId) {
    const data = await this.getAll()
    return data.find(({ id }) => id === ObjectId)
  }

  async getAll() {
    const res = await readFile(this.file, 'utf8')
    if (res !== '') return JSON.parse(res)

    await writeFile(this.file, '[]')
    return this.getAll()
  }

  async deleteById(ObjectId) {
    const oldData = await this.getAll()
    const newData = oldData.filter(({ id }) => {
      if (id === this.lastId) this.lastId--
      return id !== ObjectId
    })
    const promise = writeFile(this.file, newData)

    await promise
  }

  async deleteAll() {
    this.lastId = 0
    const promise = unlink(this.file)
    await promise
  }
}

export default Contenedor
