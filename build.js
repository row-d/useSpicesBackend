/* eslint-disable */
const fs = require('fs/promises')
const path = require('path')

const { build } = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

async function deepReadDir(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name)
      return dirent.isDirectory() ? deepReadDir(res) : res
    })
  )
  return [...files].flat()
}

;(async () => {
  try {
    const srcPath = path.resolve(__dirname, 'src')

    const allSrcFiles = await deepReadDir(srcPath)
    const entryPoints = allSrcFiles.filter(
      (file) => file.endsWith('.ts') && !file.endsWith('.d.ts')
    )

    build({
      entryPoints,
      outdir: './dist',
      sourcemap: true,
      bundle: true,
      minify: true,
      write: true,
      sourcemap: false,
      external: ['/node_modules/*'],
      platform: 'node',
      target: ['node16'],
      plugins: [nodeExternalsPlugin()],
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
