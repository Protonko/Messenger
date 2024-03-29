import type {IDialog} from 'models/dialog'
import type {IMessage} from 'models/message'
import type {AllDialogsActions} from 'models/store/actions/dialogs'
import {DialogsActionTypes} from 'models/store/actions/dialogs'
import {
  AppendMessageAction,
  CreateMessageSuccessAction,
  GetMessagesSuccessAction,
  MessageActionsTypes,
} from 'models/store/actions/message'

export interface IInitialState {
  loading: boolean
  creating: boolean
  dialogs: null | IDialog[]
  errorMessage: null | string
  createErrorMessage: null | false | string
}

export type TDialogsReducerActions =
  | AllDialogsActions
  | AppendMessageAction
  | CreateMessageSuccessAction
  | GetMessagesSuccessAction

export const initialState = {
  loading: false,
  creating: false,
  dialogs: null,
  errorMessage: null,
  createErrorMessage: null,
} as IInitialState

const updateLastMessage = (state: IInitialState, message: IMessage) => {
  if (!state.dialogs) {
    return state
  }

  const dialogs = state.dialogs.map((dialog) => {
    if (dialog.id !== message.dialog || !dialog.lastMessage) {
      return dialog
    }

    return {
      ...dialog,
      messages: ++dialog.messages,
      lastMessage: {
        ...dialog.lastMessage,
        text: message.text,
        read: message.read,
      },
    }
  })

  return {
    ...state,
    dialogs,
  }
}

const reducers = (
  state = initialState,
  action: TDialogsReducerActions,
): IInitialState => {
  switch (action.type) {
    case DialogsActionTypes.GET_START:
      return {
        ...state,
        loading: true,
      }
    case DialogsActionTypes.GET_SUCCESS:
      return {
        ...state,
        creating: state.creating,
        loading: false,
        errorMessage: null,
        dialogs: action.payload,
      }
    case DialogsActionTypes.GET_ERROR:
      return {
        ...state,
        loading: false,
        dialogs: null,
        errorMessage: action.payload,
      }
    case DialogsActionTypes.CREATE_DIALOG:
      return {
        ...state,
        creating: true,
        createErrorMessage: null,
      }
    case DialogsActionTypes.CREATE_DIALOG_SUCCESS:
      return {
        ...state,
        dialogs: [...(state.dialogs ?? []), action.payload],
        creating: false,
        createErrorMessage: false,
      }
    case DialogsActionTypes.CREATE_DIALOG_ERROR:
      return {
        ...state,
        creating: false,
        createErrorMessage: action.payload,
      }
    case DialogsActionTypes.RESET_CREATE_DIALOG_STATE:
      return {
        ...state,
        creating: initialState.creating,
        createErrorMessage: initialState.createErrorMessage,
      }

    case DialogsActionTypes.CHANGE_READ_STATUS: {
      const message = state.dialogs?.find(
        ({id}) => id === action.payload,
      )?.lastMessage

      if (!message) {
        return state
      }

      return updateLastMessage(state, {...message, read: true})
    }

    case DialogsActionTypes.UPDATE_LAST_MESSAGE: {
      if (!action.payload.lastMessage) return state

      return updateLastMessage(state, {
        ...action.payload.lastMessage,
        read: true,
      })
    }

    case MessageActionsTypes.APPEND_MESSAGE: {
      if (action.payload.isCurrentDialog) {
        return updateLastMessage(state, {...action.payload.message, read: true})
      }

      return updateLastMessage(state, action.payload.message)
    }

    case MessageActionsTypes.CREATE_MESSAGE_SUCCESS: {
      return updateLastMessage(state, action.payload)
    }

    case MessageActionsTypes.GET_MESSAGES_SUCCESS: {
      const message = state.dialogs?.find(
        ({id}) => id === action.payload.dialogId,
      )?.lastMessage

      if (!message) {
        return state
      }

      return updateLastMessage(state, {...message, read: true})
    }

    case DialogsActionTypes.APPEND_DIALOG:
      return {
        ...state,
        dialogs: [action.payload, ...(state.dialogs ?? [])],
      }

    default:
      return state
  }
}

export default reducers
