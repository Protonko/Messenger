import type {ICreateMessageBody, ICreateMessageResponse} from 'models/message'
import {
  MessageActionsTypes,
  CreateMessageAction,
  CreateMessageErrorAction,
  CreateMessageSuccessAction,
} from 'models/store/actions/message'

export const createMessage = (payload: string): CreateMessageAction => ({
  type: MessageActionsTypes.CREATE_MESSAGE,
  payload,
})

export const createMessageSuccess = (
  payload: Omit<ICreateMessageResponse, 'status'>,
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
