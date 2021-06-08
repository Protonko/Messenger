import type {IMessage} from 'models/message'
import {
  MessageActionsTypes,
  CreateMessageAction,
  CreateMessageErrorAction,
  CreateMessageSuccessAction,
  GetMessagesAction,
  GetMessagesSuccessAction,
  GetMessagesErrorAction,
  IGetMessagesSuccessPayload,
  IGetMessagesErrorPayload,
  ICreateMessagePayload,
  AppendMessageAction,
} from 'models/store/actions/message'

export const createMessage = (
  payload: ICreateMessagePayload,
): CreateMessageAction => ({
  type: MessageActionsTypes.CREATE_MESSAGE,
  payload,
})

export const createMessageSuccess = (
  payload: IMessage,
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

export const getMessagesSuccess = (
  payload: IGetMessagesSuccessPayload,
): GetMessagesSuccessAction => ({
  type: MessageActionsTypes.GET_MESSAGES_SUCCESS,
  payload,
})

export const getMessagesError = (
  payload: IGetMessagesErrorPayload,
): GetMessagesErrorAction => ({
  type: MessageActionsTypes.GET_MESSAGES_ERROR,
  payload,
})

export const appendMessage = (payload: IMessage): AppendMessageAction => ({
  type: MessageActionsTypes.APPEND_MESSAGE,
  payload,
})
