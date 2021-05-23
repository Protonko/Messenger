import type {AnyAction} from 'redux'
import type {ICreateMessageBody, ICreateMessageResponse} from 'models/message'

export enum MessageActionsTypes {
  CREATE_MESSAGE = '[MESSAGE]CREATE_MESSAGE',
  CREATE_MESSAGE_SUCCESS = '[MESSAGE]CREATE_MESSAGE_SUCCESS',
  CREATE_MESSAGE_ERROR = '[MESSAGE]CREATE_MESSAGE_ERROR',
}

export interface MessageAction extends AnyAction {
  type: MessageActionsTypes.CREATE_MESSAGE
  payload: ICreateMessageBody
}

export interface MessageSuccessAction extends AnyAction {
  type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS
  payload: Omit<ICreateMessageResponse, 'status'>
}

export interface MessageErrorAction extends AnyAction {
  type: MessageActionsTypes.CREATE_MESSAGE_ERROR
  payload: string
}

export type AllMessageActions =
  | MessageAction
  | MessageSuccessAction
  | MessageErrorAction
