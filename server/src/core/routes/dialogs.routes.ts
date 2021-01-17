import {Express} from 'express'
import {Server} from 'socket.io'
import {DialogController} from '../../controllers/DialogController'

export const dialogsRoutes = (app: Express, io: Server) => {
  const dialog = new DialogController(io)

  app.get('/dialogs/:id', dialog.find)
  app.delete('/dialogs/:id', dialog.delete)
  app.post('/dialogs', dialog.create)
}
