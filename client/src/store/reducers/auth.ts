import type {IUser} from 'models/user'
import {AuthActionTypes} from 'models/store/actions/auth'

export interface IInitialState {
  token: null | string
  errorMessage: null | string | boolean
  account: null | IUser
}

export const initialState = {
  token: null,
  errorMessage: null,
  account: null,
} as IInitialState

const reducers = (
  state = initialState,
  action: any,
): IInitialState => {
  switch (action.type) {
    case AuthActionTypes.SET_LOGIN_DATA:
      return {
        ...state,
        token: action.payload,
        errorMessage: false,
      }
    case AuthActionTypes.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      }
    case AuthActionTypes.RESET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null
      }
    case AuthActionTypes.SET_SIGN_UP_DATA:
      return {
        ...state,
        account: action.payload,
      }
    default:
      return state
  }
}

export default reducers
