import express from 'express'
import {Server} from 'socket.io'
import {createServer} from 'http'
import {config} from './config'
import './core/db'
import {createRoutes} from './core/routes'
import {createSocket} from './core/socket'

const app = express()
const http = createServer(app)
const io = new Server(http, {
  cors: {
    origin: '*',
  }
});

createRoutes(app, io)
createSocket(http, io, app)

http.listen(config.PORT, () => {
  console.log(`App has been started on port ${config.PORT}`)
})
