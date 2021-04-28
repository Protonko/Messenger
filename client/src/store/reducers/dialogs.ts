import type {IDialog} from 'models/dialog'
import type {AllDialogsActions} from 'models/store/actions/dialogs'
import {DialogsActionTypes} from 'models/store/actions/dialogs'

export interface IInitialState {
  loading: boolean
  dialogs: null | IDialog[]
  errorMessage: null | string
}

export const initialState = {
  loading: false,
  dialogs: null,
  errorMessage: null,
} as IInitialState

const reducers = (
  state = initialState,
  action: AllDialogsActions
): IInitialState => {
  switch (action.type) {
    case DialogsActionTypes.GET_START:
      return {
        ...state,
        loading: true,
      }
    case DialogsActionTypes.GET_SUCCESS:
      return {
        loading: false,
        errorMessage: null,
        dialogs: action.payload
      }
    case DialogsActionTypes.GET_ERROR:
      return {
        loading: false,
        dialogs: null,
        errorMessage: action.payload,
      }
  }
}

export default reducers
