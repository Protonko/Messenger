import type {AnyAction} from 'redux'

export enum ErrorActionTypes {
  INVALID_TOKEN_ERROR = '[ERROR]INVALID_TOKEN_ERROR',
  HIDE_ERROR_NOTIFICATION = '[ERROR]HIDE_ERROR_NOTIFICATION',
}

export interface InvalidTokenErrorAction extends AnyAction {
  type: ErrorActionTypes.INVALID_TOKEN_ERROR
  payload: string
}

export interface HideErrorNotificationAction extends AnyAction {
  type: ErrorActionTypes.HIDE_ERROR_NOTIFICATION
}

export type AllErrorActions =
  | InvalidTokenErrorAction
  | HideErrorNotificationAction
