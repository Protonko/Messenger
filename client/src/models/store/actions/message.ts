import type {AnyAction} from 'redux'
import type {IMessage} from 'models/message'

export enum MessageActionsTypes {
  CREATE_MESSAGE = '[MESSAGE]CREATE_MESSAGE',
  CREATE_MESSAGE_SUCCESS = '[MESSAGE]CREATE_MESSAGE_SUCCESS',
  CREATE_MESSAGE_ERROR = '[MESSAGE]CREATE_MESSAGE_ERROR',
  GET_MESSAGES = '[MESSAGE]GET_MESSAGES',
  GET_MESSAGES_SUCCESS = '[MESSAGE]GET_MESSAGES_SUCCESS',
  GET_MESSAGES_ERROR = '[MESSAGE]GET_MESSAGES_ERROR',
  APPEND_MESSAGE = '[MESSAGE]APPEND_MESSAGE',
}

// payloads
export interface IGetMessagesSuccessPayload {
  messages: IMessage[]
  dialogId: string
}

export interface IGetMessagesErrorPayload {
  errorMessage: string
  dialogId: string
}

export interface ICreateMessagePayload {
  text: string
  dialogId: string
  interlocutorId: string
}

// actions
export interface CreateMessageAction extends AnyAction {
  type: MessageActionsTypes.CREATE_MESSAGE
  payload: ICreateMessagePayload
}

export interface CreateMessageSuccessAction extends AnyAction {
  type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS
  payload: IMessage
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
  payload: IGetMessagesSuccessPayload
}

export interface GetMessagesErrorAction extends AnyAction {
  type: MessageActionsTypes.GET_MESSAGES_ERROR
  payload: IGetMessagesErrorPayload
}

export interface AppendMessageAction extends AnyAction {
  type: MessageActionsTypes.APPEND_MESSAGE
  payload: IMessage
}

export type AllMessageActions =
  | CreateMessageAction
  | CreateMessageSuccessAction
  | CreateMessageErrorAction
  | GetMessagesAction
  | GetMessagesSuccessAction
  | GetMessagesErrorAction
  | AppendMessageAction
