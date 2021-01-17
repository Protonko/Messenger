import {Express} from 'express'
import {DialogController} from '../../controllers/DialogController'

export const dialogsRoutes = (app: Express) => {
  const dialog = new DialogController()

  app.get('/dialogs/:id', dialog.find)
  app.delete('/dialogs/:id', dialog.delete)
  app.post('/dialogs', dialog.create)
}
