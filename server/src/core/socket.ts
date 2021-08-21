import type {Express} from 'express'
import type {IError} from '../types/error'
import type {IUserMongoose} from '../types/user'
import type {Server, Socket} from 'socket.io'
import {Server as ServerHttp} from 'http'
import {MessageController} from '../controllers/MessageController'
import {User} from '../models/User'
import {userDTO} from '../utils/dto/userDTO'
import {EVENTS_SOCKET} from '../types/socketEvents'

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
      messageController.readMessage(app.response, dialog, interlocutor)
    })

    socket.on(EVENTS_SOCKET.START_CALL, (interlocutor: string, initiatorId: string) => {
      User.findById(initiatorId, (error: IError, user: IUserMongoose) => {
        try {
          if (error) {
            return socket.to(interlocutor).emit(EVENTS_SOCKET.CALL_ERROR, error.value)
          }

          socket.to(interlocutor).emit(EVENTS_SOCKET.START_CALL, userDTO(user))
        } catch (error) {
          socket.to(interlocutor).emit(EVENTS_SOCKET.CALL_ERROR, error.message)
        }
      })
    })

    socket.on(EVENTS_SOCKET.DECLINE_CALL, (interlocutor: string) => {
      socket.to(interlocutor).emit(EVENTS_SOCKET.DECLINE_CALL)
    })

    socket.on(EVENTS_SOCKET.RELAY_ICE, (interlocutor: string, iceCandidate: RTCIceCandidate) => {
      io.to(interlocutor).emit(EVENTS_SOCKET.ICE_CANDIDATE, iceCandidate);
    })

    socket.on(EVENTS_SOCKET.RELAY_SESSION_DESCRIPTION, (interlocutor: string, sessionDescription: RTCSessionDescriptionInit) => {
      io.to(interlocutor).emit(EVENTS_SOCKET.SESSION_DESCRIPTION, sessionDescription);
    });
  })
}
