import type {ICreateMessageResponse, IMessage} from 'models/message'
import {
  MessageActionsTypes,
  CreateMessageAction,
  CreateMessageErrorAction,
  CreateMessageSuccessAction,
  GetMessagesAction,
  GetMessagesSuccessAction,
  GetMessagesErrorAction,
} from 'models/store/actions/message'

export const createMessage = (payload: string): CreateMessageAction => ({
  type: MessageActionsTypes.CREATE_MESSAGE,
  payload,
})

export const createMessageSuccess = (
  payload: ICreateMessageResponse,
): CreateMessageSuccessAction => ({
  type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
  payload,
})

export const createMessageError = (
  payload: string,
): CreateMessageErrorAction => ({
  type: MessageActionsTypes.CREATE_MESSAGE_ERROR,
  payload,
})

export const getMessages = (payload: string): GetMessagesAction => ({
  type: MessageActionsTypes.GET_MESSAGES,
  payload,
})

export const getMessagesSuccess = (payload: IMessage[]): GetMessagesSuccessAction => ({
  type: MessageActionsTypes.GET_MESSAGES_SUCCESS,
  payload,
})

export const getMessagesError = (payload: string): GetMessagesErrorAction => ({
  type: MessageActionsTypes.GET_MESSAGES_ERROR,
  payload,
})
