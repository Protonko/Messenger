import {Express} from 'express'
import bodyParser from 'body-parser'
import {usersRoute} from './users.routes'
import {dialogsRoutes} from './dialogs.routes'
import {messagesRoutes} from './messages.routes'
import {updateLastSeen} from '../../middlewares/updateLastSeen'
import {checkAuth} from '../../middlewares/checkAuth'

export const createRoutes = (app: Express) => {
  app.use(bodyParser.json())
  app.use(updateLastSeen)
  app.use(checkAuth)

  usersRoute(app)
  dialogsRoutes(app)
  messagesRoutes(app)
}
