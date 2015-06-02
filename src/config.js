import yargs from 'yargs'

let argv = yargs.argv

/**
 * config can be entered via arguments on the command line
 * (e.g. --username=bot-username) or by replacing the null values below
 */
export const botUsername = argv.username || null
export const botPassword = argv.password || null
export const port = argv.port || null
export const couchInstance = argv.couch || null
export const couchPort = argv['couch-port'] || null
export const test = process.env.TEST || false
