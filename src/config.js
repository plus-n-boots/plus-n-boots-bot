import yargs from 'yargs'

let argv = yargs.argv

export const botUsername = argv.username || null
export const botPassword = argv.password || null
export const port = argv.port || null
export const couchInstance = argv.couch || null
export const couchPort = argv['couch-port'] || null
