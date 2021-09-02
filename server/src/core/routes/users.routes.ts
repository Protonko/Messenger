import type {Express} from 'express'
import {UserController} from '../../controllers/UserController'
import {loginValidation} from '../../utils/validations/login'

export const usersRoute = (app: Express) => {
  const user = new UserController()

  app.get('/user/own', user.getOwnProfile)
  app.get('/user/:id', user.find)
  app.get('/users', user.getProfiles)
  app.post('/user/signup', loginValidation, user.create)
  app.post('/user/login', loginValidation, user.login)
}
