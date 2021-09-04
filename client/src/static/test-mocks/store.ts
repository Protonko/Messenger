import type {Middleware} from 'redux'
import type {RootState} from 'store/reducers'
import configureStore from 'redux-mock-store'
import {initialState as dialogsState} from 'store/reducers/dialogs'
import {initialState as authState} from 'store/reducers/auth'
import {initialState as usersState} from 'store/reducers/users'
import {initialState as messageState} from 'store/reducers/message'
import {initialState as errorState} from 'store/reducers/error'

export const state = {
  dialogs: dialogsState,
  auth: authState,
  users: usersState,
  message: messageState,
  error: errorState,
}

const middlewares: Middleware[] = []
export const createMockStore = configureStore<RootState>(middlewares)
