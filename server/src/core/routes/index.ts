import {Express} from 'express'
import {Server} from 'socket.io'
import bodyParser from 'body-parser'
import {updateLastSeen} from '../../middlewares/updateLastSeen'
import {checkAuth} from '../../middlewares/checkAuth'
import {usersRoute} from './users.routes'
import {dialogsRoutes} from './dialogs.routes'
import {messagesRoutes} from './messages.routes'

export const createRoutes = (app: Express, io: Server) => {
  app.use(bodyParser.json())
  app.use(updateLastSeen)
  app.use(checkAuth)

  usersRoute(app, io)
  dialogsRoutes(app, io)
  messagesRoutes(app, io)
}
