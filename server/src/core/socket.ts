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

    socket.on(EVENTS_SOCKET.START_CALL, (interlocutor: string) => {
      socket.to(interlocutor).emit(EVENTS_SOCKET.START_CALL)
    })

    socket.on(EVENTS_SOCKET.CREATE_OFFER, (interlocutor: string, sessionDescription: RTCSessionDescriptionInit) => {
      socket.to(interlocutor).emit(EVENTS_SOCKET.CREATE_OFFER, sessionDescription)
    })

    socket.on(EVENTS_SOCKET.CREATE_ANSWER, (interlocutor: string, sessionDescription: RTCSessionDescriptionInit) => {
      socket.to(interlocutor).emit(EVENTS_SOCKET.CREATE_ANSWER, sessionDescription)
    })

    socket.on(EVENTS_SOCKET.DECLINE_CALL, (interlocutor: string) => {
      socket.to(interlocutor).emit(EVENTS_SOCKET.DECLINE_CALL)
    })

    socket.on(EVENTS_SOCKET.RELAY_ICE, (interlocutor: string, iceCandidate: RTCIceCandidate) => {
      io.to(interlocutor).emit(EVENTS_SOCKET.ICE_CANDIDATE, iceCandidate);
    });
  })
}
