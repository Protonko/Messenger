import type {AnyAction} from 'redux'
import type {IUserLoginBody, IUserSignupBody} from 'models/auth'

export enum AuthActionTypes {
  LOGIN = '[AUTH]LOGIN',
  SET_LOGIN_DATA = '[AUTH]SET_LOGIN_DATA',
  SET_ERROR_MESSAGE = '[AUTH]SET_ERROR_MESSAGE',
  RESET_ERROR_MESSAGE = '[AUTH]RESET_ERROR_MESSAGE',
  SIGN_UP = '[AUTH]SIGN_UP',
  SET_SIGN_UP_DATA = '[AUTH]SET_SIGN_UP_DATA',
}

export interface LoginAction extends AnyAction {
  type: AuthActionTypes.LOGIN
  payload: IUserLoginBody
}

export interface SignUpAction extends AnyAction {
  type: AuthActionTypes.SIGN_UP
  payload: IUserSignupBody
}
