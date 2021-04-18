import type {AnyAction} from 'redux'
import type {IDialog} from 'models/dialog'

export enum DialogsActionTypes {
  GET_START = '[DIALOGS]GET_START',
  GET_SUCCESS = '[DIALOGS]GET_SUCCESS',
  GET_ERROR = '[DIALOGS]GET_ERROR',
}

export interface GetDialogsStartAction extends AnyAction {
  type: DialogsActionTypes.GET_START
}

export interface GetDialogsSuccessAction extends AnyAction {
  type: DialogsActionTypes.GET_SUCCESS
  payload: IDialog[]
}

export interface GetDialogsErrorAction extends AnyAction {
  type: DialogsActionTypes.GET_ERROR
  payload: string
}

export type AllDialogsActions =
  | GetDialogsStartAction
  | GetDialogsSuccessAction
  | GetDialogsErrorAction
