const { writeFile, readFile, access } = require('fs/promises')
const constants = require('fs').constants

class Contenedor {
  constructor(fileName) {
    ;(async () => {
      if ((await this.fileExists()) === false) {
        await writeFile(fileName, '[]')
      }
    })()
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
      await writeFile(this.file, JSON.stringify([parsedData], null, 2))
    }
    return this.lastId
  }

  async update(ObjectId, ObjectData) {
    const data = await this.getAll()
    const index = data.findIndex((item) => item.id === ObjectId)
    if (index !== -1) {
      data[index] = { ...ObjectData, id: ObjectId }
      const newData = JSON.stringify(data, null, 2)
      await writeFile(this.file, newData)
    }
    return index
  }

  async getById(ObjectId) {
    const data = await this.getAll()
    return data.find(({ id }) => id === ObjectId) || null
  }

  async getAll() {
    const res = await readFile(this.file, 'utf8')
    if (res !== '') return JSON.parse(res)
    await writeFile(this.file, '[]')
    return await this.getAll()
  }

  async deleteById(ObjectId) {
    const oldData = await this.getAll()
    const newData = oldData.filter(({ id }) => {
      if (id === this.lastId) this.lastId--
      return id !== ObjectId
    })
    await writeFile(this.file, JSON.stringify(newData))
  }

  async deleteAll() {
    this.lastId = 0
    await writeFile(this.file, '[]')
  }
}

module.exports = Contenedor
