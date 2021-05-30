import {combineReducers} from 'redux'
import auth from './auth'
import dialogs from './dialogs'
import users from './users'
import message from './message'
import error from './error'

const rootReducer = combineReducers({
  auth,
  dialogs,
  users,
  message,
  error,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
