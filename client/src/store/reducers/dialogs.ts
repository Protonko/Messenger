import type {IDialog} from 'models/dialog'
import type {AllDialogsActions} from 'models/store/actions/dialogs'
import {DialogsActionTypes} from 'models/store/actions/dialogs'

export interface IInitialState {
  loading: boolean
  creating: boolean
  dialogs: null | IDialog[]
  errorMessage: null | string
  createErrorMessage: null | false | string
}

export const initialState = {
  loading: false,
  creating: false,
  dialogs: null,
  errorMessage: null,
  createErrorMessage: null,
} as IInitialState

const reducers = (
  state = initialState,
  action: AllDialogsActions,
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
    default:
      return state
  }
}

export default reducers
