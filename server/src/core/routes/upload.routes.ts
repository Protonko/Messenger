import {Express} from 'express'
import {UploadController} from '../../controllers/UploadController'

export const uploadRoutes = (app: Express) => {
  const uploadController = new UploadController()

  app.post('/upload', uploadController.upload)
}
