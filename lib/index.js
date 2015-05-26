import 'babel-core/polyfill'
import bodyParser from 'body-parser'
import express from 'express'
import Bot from './bot'

let bot = new Bot(process.env.BOT_USERNAME, process.env.BOT_PASSWORD, {})
let server = express()

server.use(bodyParser.json())

server.all('/', (req, res) => {
  res.end()
  bot.onEvent(req.body)
})

server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
