import type {Express} from 'express'
import type {IError} from '../types/error'
import type {IUserMongoose} from '../types/user'
import type {Server, Socket} from 'socket.io'
import {Server as ServerHttp} from 'http'
import {MessageController} from '../controllers/MessageController'
import {User} from '../models/User'
import {userDTO} from '../utils/dto/userDTO'
import {EventsSocket} from '../types/socketEvents'

export const createSocket = (http: ServerHttp, io: Server, app: Express) => {
  const messageController = new MessageController(io)

  io.on(EventsSocket.CONNECTION, (socket: Socket) => {
    socket.on(EventsSocket.JOIN, (id: string) => {
      socket.join(id)
    })

    socket.on(
      EventsSocket.TYPING_MESSAGE,
      (interlocutor: string, author: string) => {
        socket.to(interlocutor).emit(EventsSocket.TYPING_MESSAGE, author)
      },
    )

    socket.on(
      EventsSocket.READ_MESSAGE,
      (interlocutor: string, dialogId: string) => {
        messageController.readMessage(app.response, dialogId, interlocutor)
      },
    )

    socket.on(
      EventsSocket.DELETE_MESSAGES,
      (messagesIds: string[], interlocutor: string, dialogId: string) => {
        socket.to(interlocutor).emit(EventsSocket.DELETE_MESSAGES, messagesIds, dialogId)
      }
    )

    socket.on(
      EventsSocket.START_CALL,
      (interlocutor: string, initiatorId: string) => {
        User.findById(initiatorId, (error: IError, user: IUserMongoose) => {
          try {
            if (error) {
              return socket
                .to(interlocutor)
                .emit(EventsSocket.SOCKET_ERROR, error.value)
            }

            socket
              .to(interlocutor)
              .emit(EventsSocket.SOCKET_ERROR, userDTO(user))
          } catch (error) {
            socket
              .to(interlocutor)
              .emit(EventsSocket.SOCKET_ERROR, error.message)
          }
        })
      },
    )

    socket.on(EventsSocket.DECLINE_CALL, (interlocutor: string) => {
      socket.to(interlocutor).emit(EventsSocket.DECLINE_CALL)
    })

    socket.on(
      EventsSocket.RELAY_ICE,
      (interlocutor: string, iceCandidate: RTCIceCandidate) => {
        io.to(interlocutor).emit(EventsSocket.ICE_CANDIDATE, iceCandidate)
      },
    )

    socket.on(
      EventsSocket.RELAY_SESSION_DESCRIPTION,
      (interlocutor: string, sessionDescription: RTCSessionDescriptionInit) => {
        io.to(interlocutor).emit(
          EventsSocket.SESSION_DESCRIPTION,
          sessionDescription,
        )
      },
    )
  })
}
