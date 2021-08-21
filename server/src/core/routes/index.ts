import type {Express} from 'express'
import type {Server} from 'socket.io'
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'
import cors from 'cors'
import {CORS_OPTIONS} from '../../config'
import {updateLastSeen} from '../../middlewares/updateLastSeen'
import {checkAuth} from '../../middlewares/checkAuth'
import {usersRoute} from './users.routes'
import {dialogsRoutes} from './dialogs.routes'
import {messagesRoutes} from './messages.routes'
import {uploadRoutes} from './upload.routes'

export const createRoutes = (app: Express, io: Server) => {
  app.use(cors(CORS_OPTIONS));
  app.use(bodyParser.json())
  app.use(checkAuth)
  app.use(updateLastSeen)
  app.use(fileUpload())


  usersRoute(app)
  dialogsRoutes(app, io)
  messagesRoutes(app, io)
  uploadRoutes(app)
}
