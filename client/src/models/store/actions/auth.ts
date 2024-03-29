import type {AnyAction} from 'redux'
import type {
  IUserLoginBody,
  IUserLoginResponse,
  IUserSignupBody,
} from 'models/auth'
import type {IUser} from 'models/user'

export enum AuthActionTypes {
  LOGIN = '[AUTH]LOGIN',
  SET_LOGIN_DATA = '[AUTH]SET_LOGIN_DATA',
  SET_USER_DATA = '[AUTH]SET_USER_DATA',
  SET_ERROR_MESSAGE = '[AUTH]SET_ERROR_MESSAGE',
  RESET_ERROR_MESSAGE = '[AUTH]RESET_ERROR_MESSAGE',
  SIGN_UP = '[AUTH]SIGN_UP',
  SET_SIGN_UP_DATA = '[AUTH]SET_SIGN_UP_DATA',
}

export interface LoginAction extends AnyAction {
  type: AuthActionTypes.LOGIN
  payload: IUserLoginBody
}

export interface SetLoginDataAction extends AnyAction {
  type: AuthActionTypes.SET_LOGIN_DATA
  payload: IUserLoginResponse
}

export interface SetUserDataAction extends AnyAction {
  type: AuthActionTypes.SET_USER_DATA
  payload: IUser
}

export interface SignUpAction extends AnyAction {
  type: AuthActionTypes.SIGN_UP
  payload: IUserSignupBody
}

export interface SetSignUpDataAction extends AnyAction {
  type: AuthActionTypes.SET_SIGN_UP_DATA
  payload: IUser
}

export interface ResetErrorMessageAction extends AnyAction {
  type: AuthActionTypes.RESET_ERROR_MESSAGE
}

export interface SetErrorMessageAction extends AnyAction {
  type: AuthActionTypes.SET_ERROR_MESSAGE
  payload: string
}

export type AllAuthActions =
  | LoginAction
  | SetLoginDataAction
  | SetUserDataAction
  | SignUpAction
  | SetSignUpDataAction
  | ResetErrorMessageAction
  | SetErrorMessageAction
