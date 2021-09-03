import type {IDialog} from 'models/dialog'
import {
  AppendDialogAction,
  ChangeReadStatusAction,
  CreateDialogAction,
  CreateDialogErrorAction,
  CreateDialogSuccessAction,
  DialogsActionTypes,
  GetDialogsErrorAction,
  GetDialogsStartAction,
  GetDialogsSuccessAction,
  ResetCreateDialogStateAction,
  UpdateLastMessageAction,
} from 'models/store/actions/dialogs'

export const getDialogs = (): GetDialogsStartAction => ({
  type: DialogsActionTypes.GET_START,
})

export const getDialogsSuccess = (
  payload: IDialog[],
): GetDialogsSuccessAction => ({
  type: DialogsActionTypes.GET_SUCCESS,
  payload,
})

export const getDialogsError = (payload: string): GetDialogsErrorAction => ({
  type: DialogsActionTypes.GET_ERROR,
  payload,
})

export const createDialog = (payload: string): CreateDialogAction => ({
  type: DialogsActionTypes.CREATE_DIALOG,
  payload,
})

export const createDialogSuccess = (
  payload: IDialog,
): CreateDialogSuccessAction => ({
  type: DialogsActionTypes.CREATE_DIALOG_SUCCESS,
  payload,
})

export const createDialogError = (
  payload: string,
): CreateDialogErrorAction => ({
  type: DialogsActionTypes.CREATE_DIALOG_ERROR,
  payload,
})

export const resetCreateDialogState = (): ResetCreateDialogStateAction => ({
  type: DialogsActionTypes.RESET_CREATE_DIALOG_STATE,
})

export const changeReadStatus = (payload: string): ChangeReadStatusAction => ({
  type: DialogsActionTypes.CHANGE_READ_STATUS,
  payload,
})

export const updateLastMessage = (payload: IDialog): UpdateLastMessageAction => ({
  type: DialogsActionTypes.UPDATE_LAST_MESSAGE,
  payload,
})

export const appendDialog = (payload: IDialog): AppendDialogAction => ({
  type: DialogsActionTypes.APPEND_DIALOG,
  payload,
})
