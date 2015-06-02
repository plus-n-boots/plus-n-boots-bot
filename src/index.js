import 'babel-core/polyfill'
import bodyParser from 'body-parser'
import cradle from 'cradle'
import dedent from 'dedent'
import express from 'express'
import Bot from './bot'
import {
  botUsername,
  botPassword,
  couchInstance,
  couchPort,
  port,
  test} from './config'

let db

if (!test) {
  db = initDb()
}

export default db

/**
 * initialise database
 */
function initDb() {
  let couch = new (cradle.Connection)(couchInstance, couchPort)
  let db = couch.database('issues')

  db.exists(function (err, exists) {
    if (err) {
      console.log(err)
    } else {
      if (exists) {
        initServer()
        console.log(dedent`Connected to database
                           Host:      ${db.connection.host}:${db.connection.port}
                           Database:  ${db.name}` + '\n')
      } else {
        db.create((err) => {
          if (err) {
            console.log(err)
          } else {
            initServer()
            console.log(dedent`Connected to database
                               Host:      ${db.connection.host}:${db.connection.port}
                               Database:  ${db.name}`+ '\n')
          }
        })
      }
    }
  })

  return db
}

/**
 * initialise server
 */
function initServer() {
  let bot = new Bot(botUsername, botPassword)
  let server = express()

  server.use(bodyParser.json())

  server.all('/postreceive', (req, res) => {
    res.end()
    bot.onEvent(req.body)
  })

  server.listen(port, () => {
    console.log(dedent`Connected to server
                       Port:      ${port}`)
  })
}
