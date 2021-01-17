import {Server, Socket} from 'socket.io'
import {Server as ServerHttp} from 'http'

export const createSocket = (http: ServerHttp, io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Connected')
    socket.emit('test', 'Text value')
  })
}
