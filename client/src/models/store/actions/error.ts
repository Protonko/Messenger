import type {AnyAction} from 'redux'

export enum ErrorActionTypes {
  INVALID_TOKEN_ERROR = '[ERROR]INVALID_TOKEN_ERROR',
  HIDE_ERROR_NOTIFICATION = '[ERROR]HIDE_ERROR_NOTIFICATION',
  COMMON_ERROR = '[ERROR]COMMON_ERROR_ACTION',
}

export interface InvalidTokenErrorAction extends AnyAction {
  type: ErrorActionTypes.INVALID_TOKEN_ERROR
  payload: string
}

export interface CommonErrorAction extends AnyAction {
  type: ErrorActionTypes.COMMON_ERROR
  payload: string
}

export interface HideErrorNotificationAction extends AnyAction {
  type: ErrorActionTypes.HIDE_ERROR_NOTIFICATION
}

export type AllErrorActions =
  | InvalidTokenErrorAction
  | CommonErrorAction
  | HideErrorNotificationAction
