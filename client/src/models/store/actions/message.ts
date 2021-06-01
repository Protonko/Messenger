import type {AnyAction} from 'redux'
import type {ICreateMessageResponse, IMessage} from 'models/message'

export enum MessageActionsTypes {
  CREATE_MESSAGE = '[MESSAGE]CREATE_MESSAGE',
  CREATE_MESSAGE_SUCCESS = '[MESSAGE]CREATE_MESSAGE_SUCCESS',
  CREATE_MESSAGE_ERROR = '[MESSAGE]CREATE_MESSAGE_ERROR',
  GET_MESSAGES = '[MESSAGE]GET_MESSAGES',
  GET_MESSAGES_SUCCESS = '[MESSAGE]GET_MESSAGES_SUCCESS',
  GET_MESSAGES_ERROR = '[MESSAGE]GET_MESSAGES_ERROR',
}

export interface CreateMessageAction extends AnyAction {
  type: MessageActionsTypes.CREATE_MESSAGE
  payload: string
}

export interface CreateMessageSuccessAction extends AnyAction {
  type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS
  payload: ICreateMessageResponse
}

export interface CreateMessageErrorAction extends AnyAction {
  type: MessageActionsTypes.CREATE_MESSAGE_ERROR
  payload: string
}

export interface GetMessagesAction extends AnyAction {
  type: MessageActionsTypes.GET_MESSAGES
  payload: string
}

export interface GetMessagesSuccessAction extends AnyAction {
  type: MessageActionsTypes.GET_MESSAGES_SUCCESS
  payload: IMessage[]
}

export interface GetMessagesErrorAction extends AnyAction {
  type: MessageActionsTypes.GET_MESSAGES_ERROR
  payload: string
}

export type AllMessageActions =
  | CreateMessageAction
  | CreateMessageSuccessAction
  | CreateMessageErrorAction
  | GetMessagesAction
  | GetMessagesSuccessAction
  | GetMessagesErrorAction
