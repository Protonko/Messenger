declare namespace Express {
  import {IUserMongoose} from './models/User'

  export interface Request {
    user?: IUser
  }
}
