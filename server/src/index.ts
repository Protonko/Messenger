import express from 'express'
import {createServer} from 'http'
import {config} from './config'
import './core/db'
import {createRoutes} from './core/routes'

const app = express()
const http = createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});

createRoutes(app)

// sockets
io.on('connection', (socket: any) => {
  console.log('Connected')
  socket.emit('test', 'Text value')
})

http.listen(config.PORT, () => {
  console.log(`App has been started on port ${config.PORT}`)
})
