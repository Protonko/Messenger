import type {IMessage} from 'models/message'
import {
  AllMessageActions,
  MessageActionsTypes,
} from 'models/store/actions/message'
import {omit} from 'utils/omit'

export interface IInitialState {
  messages: Record<string, IMessage[]> | null
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

const reducers = (state = initialState, action: AllMessageActions) => {
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

    case MessageActionsTypes.CREATE_MESSAGE_SUCCESS: {
      const dialogId = action.payload.dialog
      return {
        ...state,
        creating: false,
        createErrorMessage: null,
        messages: {
          ...state.messages,
          [dialogId]: [...(state.messages?.[dialogId] ?? []), action.payload],
        },
      }
    }

    case MessageActionsTypes.GET_MESSAGES:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      }

    case MessageActionsTypes.GET_MESSAGES_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage,
        messages:
          state.messages && omit(action.payload.dialogId, state.messages),
      }

    case MessageActionsTypes.GET_MESSAGES_SUCCESS: {
      const {dialogId, messages} = action.payload
      return {
        ...state,
        loading: false,
        errorMessage: null,
        messages: {
          ...state.messages,
          [dialogId]: [...(state.messages?.[dialogId] ?? []), ...messages],
        },
      }
    }

    case MessageActionsTypes.APPEND_MESSAGE: {
      const {dialog} = action.payload.message

      if (state.messages?.[dialog]) {
        return {
          ...state,
          messages: {
            ...state.messages,
            [dialog]: [...state.messages[dialog], action.payload.message],
          },
        }
      }

      return state
    }

    default:
      return state
  }
}

export default reducers
