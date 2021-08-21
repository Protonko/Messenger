import {Express} from 'express'
import {Server} from 'socket.io'
import {MessageController} from '../../controllers/MessageController'

export const messagesRoutes = (app: Express, io: Server) => {
  const message = new MessageController(io)

  app.get('/messages', message.find)
  app.post('/messages', (request, response) => message.create(request, response))
  app.delete('/messages', message.delete)
}
