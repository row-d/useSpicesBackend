const path = require('path');
const writeFile = require('fs/promises').writeFile;
const Contenedor = require('../../Contenedor');


const absPath = path.resolve('./src/tests')

describe('fileExists method', () => {
  test('si el archivo no existe debe retornar false', async () => {
    const file = absPath + '/test.json'
    const testFile = new Contenedor(file)

    expect(await testFile.fileExists()).toBe(false)
  })

  test('si el archivo existe debe retornar true', async () => {
    const file = absPath + '/test.txt'
    const testFile = new Contenedor(file)
    await writeFile(file, 'some text')
    expect(await testFile.fileExists()).toBe(true)
  })
})
