import 'dotenv/config'

import chalk from 'chalk'
import cluster from 'cluster'
import os from 'os'

import cli from './cli'
import server from './server'

const args = cli(process.argv)

if (cluster.isPrimary && args.mode === 'cluster') {
  for (const _ of os.cpus()) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    )
  })
} else {
  const nets = os.networkInterfaces()
  const networkAddress = nets['eth0']?.find((e) => e.family === 'IPv4')?.address
  const port = args.port
  const envMode = process.env.NODE_ENV || 'development'

  server.listen(port, () => {
    console.log('Local: ' + chalk.yellowBright(`http://localhost:${port}`))
    networkAddress &&
      console.log(
        `Network (eth0): ${chalk.yellowBright(
          `http://${networkAddress}:${port}`
        )}`
      )
    console.log(`Execution Mode: ${chalk.yellowBright(args.mode)}`)
    console.log(`Environment Mode: ${chalk.yellowBright(envMode)}`)
    console.log(`Press ${chalk.redBright('CTRL-C')} to stop`)
  })
}
