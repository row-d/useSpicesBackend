import yargs from 'yargs'

export default function cli(argv = process.argv) {
  return yargs(argv.slice(2))
    .options({
      port: {
        alias: 'p',
        default: process.env.PORT || '3000',
        describe: 'Port to run the server on',
        type: 'string',
      },
      mode: {
        alias: 'm',
        default: 'fork',
        describe: 'Mode to run the server in',
        type: 'string',
        choices: ['fork', 'cluster'],
      },
      instance: {
        alias: 'i',
        default: 'memory',
        describe: 'Instance to run the server with',
        type: 'string',
        choices: ['memory', 'mongodb'],
      },
    })
    .parseSync()
}
