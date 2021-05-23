import type {ICreateMessageBody, ICreateMessageResponse} from 'models/message'
import {
  MessageActionsTypes,
  MessageAction, MessageErrorAction, MessageSuccessAction,
} from 'models/store/actions/message'

export const createMessage = (payload: ICreateMessageBody): MessageAction =>
  ({type: MessageActionsTypes.CREATE_MESSAGE, payload})

export const createMessageSuccess = (payload: Omit<ICreateMessageResponse, 'status'>): MessageSuccessAction =>
  ({type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS, payload})

export const createMessageError = (payload: string): MessageErrorAction =>
  ({type: MessageActionsTypes.CREATE_MESSAGE_ERROR, payload})
