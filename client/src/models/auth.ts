import {TStatusResponse} from './common/fetch'

export enum FormTypes {
  auth = 'auth',
  register = 'register',
}

export interface IUserLoginBody {
  email: string
  password: string
}

export interface IUserSignupBody extends IUserLoginBody {
  full_name: string
}

export interface IUserLoginResponse {
  status: TStatusResponse
  token: string
}
