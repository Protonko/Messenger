import type {AnyAction} from 'redux'

export enum ErrorActionTypes {
  INVALID_TOKEN_ERROR = '[ERROR]INVALID_TOKEN_ERROR',
}

export interface InvalidTokenErrorAction extends AnyAction {
  type: ErrorActionTypes.INVALID_TOKEN_ERROR
  payload: string
}

export type AllErrorActions = InvalidTokenErrorAction
