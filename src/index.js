import 'babel-core/polyfill'
import bodyParser from 'body-parser'
import express from 'express'
import Bot from './bot'
import {botUsername, botPassword, port} from './config'

let bot = new Bot(botUsername, botPassword)
let server = express()

server.use(bodyParser.json())

server.all('/postreceive', (req, res) => {
  res.end()
  bot.onEvent(req.body)
})

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})
