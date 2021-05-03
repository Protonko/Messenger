import {Express} from 'express'
import {Server} from 'socket.io'
import {UserController} from '../../controllers/UserController'
import {loginValidation} from '../../utils/validations/login'

export const usersRoute = (app: Express, io: Server) => {
  const user = new UserController(io)

  app.get('/user/own', user.getOwnProfile)
  app.get('/user/:id', user.find)
  app.get('/users', user.getProfiles)
  app.delete('/user/:id', user.delete)
  app.post('/user/signup', loginValidation, user.create)
  app.post('/user/login', loginValidation, user.login)
}
