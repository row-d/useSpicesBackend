import yargs from 'yargs'

export default function cli(argv = process.argv) {
  return yargs(argv.slice(2))
    .options({
      port: {
        alias: 'p',
        default: Number(process.env.PORT) || 8080,
        describe: 'Port to run the server on',
        type: 'number',
      },
      mode: {
        alias: 'm',
        default: 'fork',
        describe: 'Mode to run the server in',
        type: 'string',
        choices: ['fork', 'cluster'],
      },
    })
    .parseSync()
}
