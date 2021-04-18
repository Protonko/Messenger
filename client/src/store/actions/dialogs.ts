import type {IDialog} from 'models/dialog'
import {
  DialogsActionTypes,
  GetDialogsStartAction,
  GetDialogsSuccessAction,
  GetDialogsErrorAction,
} from 'models/store/actions/dialogs'

export const getDialogs = (): GetDialogsStartAction =>
  ({type: DialogsActionTypes.GET_START})

export const getDialogsSuccess = (payload: IDialog[]): GetDialogsSuccessAction =>
  ({type: DialogsActionTypes.GET_SUCCESS, payload})

export const getDialogsError = (payload: string): GetDialogsErrorAction =>
  ({type: DialogsActionTypes.GET_ERROR, payload})
