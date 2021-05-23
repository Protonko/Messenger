import type {AnyAction} from 'redux'
import type {ICreateMessageResponse} from 'models/message'

export enum MessageActionsTypes {
  CREATE_MESSAGE = '[MESSAGE]CREATE_MESSAGE',
  CREATE_MESSAGE_SUCCESS = '[MESSAGE]CREATE_MESSAGE_SUCCESS',
  CREATE_MESSAGE_ERROR = '[MESSAGE]CREATE_MESSAGE_ERROR',
}

export interface CreateMessageAction extends AnyAction {
  type: MessageActionsTypes.CREATE_MESSAGE
  payload: string
}

export interface CreateMessageSuccessAction extends AnyAction {
  type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS
  payload: Omit<ICreateMessageResponse, 'status'>
}

export interface CreateMessageErrorAction extends AnyAction {
  type: MessageActionsTypes.CREATE_MESSAGE_ERROR
  payload: string
}

export type AllMessageActions =
  | CreateMessageAction
  | CreateMessageSuccessAction
  | CreateMessageErrorAction
