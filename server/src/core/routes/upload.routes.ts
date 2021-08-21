import type {Express} from 'express'
import {UploadController} from '../../controllers/UploadController'

export const uploadRoutes = (app: Express) => {
  const upload = new UploadController()

  app.post('/upload', upload.uploadFile)
}
