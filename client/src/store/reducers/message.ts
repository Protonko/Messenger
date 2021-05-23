import type {IMessage} from 'models/message'
import {AllMessageActions, MessageActionsTypes} from 'models/store/actions/message'

export interface IInitialState {
  messages: Record<string, IMessage> | null
  loading: boolean
  creating: boolean
  errorMessage: string | null
  createErrorMessage: string | null
}

export const initialState = {
  messages: null,
  loading: false,
  creating: false,
  errorMessage: null,
  createErrorMessage: null,
} as IInitialState

const reducers = (
  state: IInitialState,
  action: AllMessageActions,
) => {
  switch (action.type) {
    case MessageActionsTypes.CREATE_MESSAGE:
      return {
        ...state,
        creating: true,
      }

    case MessageActionsTypes.CREATE_MESSAGE_ERROR:
      return {
        ...state,
        creating: false,
        createErrorMessage: action.payload,
      }

    case MessageActionsTypes.CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        creating: false,
        createErrorMessage: null,
      }

    default:
      return state
  }
}

export default reducers


