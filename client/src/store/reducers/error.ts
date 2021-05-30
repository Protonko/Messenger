import {AllErrorActions, ErrorActionTypes} from 'models/store/actions/error'

export interface IInitialState {
  showErrorNotification: boolean
  errorMessage: string
}

export const initialState = {
  showErrorNotification: false,
  errorMessage: ''
} as IInitialState

const reducers = (
  state = initialState,
  action: AllErrorActions
) => {
  switch (action.type) {
    case ErrorActionTypes.INVALID_TOKEN_ERROR:
      return {
        ...state,
        showErrorNotification: true,
        errorMessage: action.payload,
      }

    case ErrorActionTypes.HIDE_ERROR_NOTIFICATION:
      return {
        ...state,
        showErrorNotification: false,
        errorMessage: '',
      }

    default:
      return initialState
  }
}

export default reducers
