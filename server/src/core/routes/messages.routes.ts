import {Express} from 'express'
import {MessageController} from '../../controllers/MessageController'

export const messagesRoutes = (app: Express) => {
  const message = new MessageController()

  app.get('/messages', message.find)
  app.post('/messages', message.create)
  app.delete('/messages', message.delete)
}
