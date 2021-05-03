import type {AnyAction} from 'redux'
import type {IUser} from 'models/user'

export enum UsersActionTypes {
  GET_START = '[USERS]GET_START',
  GET_SUCCESS = '[USERS]GET_SUCCESS',
  GET_ERROR = '[USERS]GET_ERROR',
  RESET = '[USERS]RESET',
}

export interface GetUsersStartAction extends AnyAction {
  type: UsersActionTypes.GET_START
}

export interface GetUsersSuccessAction extends AnyAction {
  type: UsersActionTypes.GET_SUCCESS
  payload: IUser[]
}

export interface GetUsersErrorAction extends AnyAction {
  type: UsersActionTypes.GET_ERROR
  payload: string
}

export interface ResetUsersStateAction extends AnyAction {
  type: UsersActionTypes.RESET
}

export type AllUsersActions =
  | GetUsersStartAction
  | GetUsersSuccessAction
  | GetUsersErrorAction
  | ResetUsersStateAction
