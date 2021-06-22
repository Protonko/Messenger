import {Express} from 'express'
import {Server, Socket} from 'socket.io'
import {Server as ServerHttp} from 'http'
import {EVENTS_SOCKET} from '../static'
import {MessageController} from '../controllers/MessageController'

export const createSocket = (http: ServerHttp, io: Server, app: Express) => {
  const messageController = new MessageController(io)

  io.on(EVENTS_SOCKET.CONNECTION, (socket: Socket) => {
    const {id} = socket.handshake.headers

    if (typeof id === 'string') {
      socket.join(id)
    } else {
      socket.emit(EVENTS_SOCKET.CONNECTION_ERROR, 'Token should be string.')
    }

    socket.on(EVENTS_SOCKET.TYPING_MESSAGE, (interlocutor: string) => {
      socket.to(interlocutor).emit(EVENTS_SOCKET.TYPING_MESSAGE)
    })

    socket.on(EVENTS_SOCKET.READ_MESSAGE, (interlocutor: string, dialog: string) => {
      messageController.clearUnreadMessages(dialog, app.response)
      messageController.updateReadStatus(dialog, app.response, interlocutor)
    })
  })
}
