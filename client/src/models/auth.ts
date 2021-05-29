import type {IUser} from './user'

export enum FormTypes {
  auth = 'auth',
  register = 'register',
}

export interface IAuthToken {
  data: IUser
  exp: number
  iat: number
}

export interface IUserLoginBody {
  email: string
  password: string
}

export interface IUserSignupBody extends IUserLoginBody {
  full_name: string
}

export interface IUserLoginResponse {
  token: string
  user: IUser
}
