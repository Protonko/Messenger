import type {Express} from 'express'
import type {Server} from 'socket.io'
import {MessageController} from '../../controllers/MessageController'

export const messagesRoutes = (app: Express, io: Server) => {
  const message = new MessageController(io)

  app.get('/messages', message.find)
  app.post('/messages', message.create)
  app.delete('/messages', message.delete)
}
