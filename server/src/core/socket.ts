import {Server, Socket} from 'socket.io'
import {Server as ServerHttp} from 'http'
import {EVENTS_SOCKET} from '../static'

export const createSocket = (http: ServerHttp, io: Server) => {
  io.on('connection', (socket: Socket) => {
    const {id} = socket.handshake.headers

    if (typeof id === 'string') {
      socket.join(id)
    } else {
      socket.emit(EVENTS_SOCKET.CONNECTION_ERROR, 'Token should be string.')
    }
  })
}
