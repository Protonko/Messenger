import {AuthActionTypes} from 'models/store/auth'
import {TReducers} from 'models/common/store'
import {IUser} from 'models/user'

import {buildReducer} from 'utils/buildReducer'

interface TInitialState {
  token: null | string
  errorMessage: null | string | false
  account: null | IUser
}

const initialState = {
  token: null,
  errorMessage: null,
  account: null,
} as TInitialState

const reducers = {
  [AuthActionTypes.SET_LOGIN_DATA](state, action) {
    return {
      ...state,
      token: action.payload,
      errorMessage: false,
    }
  },

  [AuthActionTypes.SET_ERROR_MESSAGE](state, action) {
    return {
      ...state,
      errorMessage: action.payload
    }
  },

  [AuthActionTypes.RESET_ERROR_MESSAGE](state) {
    return {
      ...state,
      errorMessage: null
    }
  },

  [AuthActionTypes.SET_SIGN_UP_DATA](state, action) {
    return {
      ...state,
      account: action.payload,
    }
  },
} as TReducers<TInitialState, any, AuthActionTypes>

export const auth = buildReducer(reducers, initialState)
