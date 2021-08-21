import express from 'express'
import path from 'path'
import {Server} from 'socket.io'
import {createServer} from 'http'
import {config} from './config'
import './core/db'
import {createRoutes} from './core/routes'
import {createSocket} from './core/socket'
import {STATIC_PATH} from './constants'

const app = express()
const http = createServer(app)
const io = new Server(http, {
  cors: {
    origin: '*',
  }
});

app.use('/static', express.static(path.join(__dirname, STATIC_PATH)))

createRoutes(app, io)
createSocket(http, io, app)

http.listen(config.PORT, () => {
  console.log(`App has been started on port ${config.PORT}`)
})
