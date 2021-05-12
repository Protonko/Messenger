import type {AnyAction} from 'redux'
import type {IDialog} from 'models/dialog'

export enum DialogsActionTypes {
  GET_START = '[DIALOGS]GET_START',
  GET_SUCCESS = '[DIALOGS]GET_SUCCESS',
  GET_ERROR = '[DIALOGS]GET_ERROR',
  CREATE_DIALOG = '[DIALOGS]CREATE_DIALOG',
  CREATE_DIALOG_SUCCESS = '[DIALOGS]CREATE_DIALOG_SUCCESS',
  CREATE_DIALOG_ERROR = '[DIALOGS]CREATE_DIALOG_ERROR',
  RESET_CREATE_DIALOG_STATE = '[DIALOGS]RESET_CREATE_DIALOG_STATE',
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

export interface CreateDialogAction extends AnyAction {
  type: DialogsActionTypes.CREATE_DIALOG
  payload: string
}

export interface CreateDialogSuccessAction extends AnyAction {
  type: DialogsActionTypes.CREATE_DIALOG_SUCCESS
  payload: IDialog
}

export interface CreateDialogErrorAction extends AnyAction {
  type: DialogsActionTypes.CREATE_DIALOG_ERROR
  payload: string
}

export interface ResetCreateDialogState extends AnyAction {
  type: DialogsActionTypes.RESET_CREATE_DIALOG_STATE
}

export type AllDialogsActions =
  | GetDialogsStartAction
  | GetDialogsSuccessAction
  | GetDialogsErrorAction
  | CreateDialogAction
  | CreateDialogSuccessAction
  | CreateDialogErrorAction
  | ResetCreateDialogState
