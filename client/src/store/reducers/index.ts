import {combineReducers} from 'redux'
import auth from './auth'
import dialogs from './dialogs'
import users from './users'
import message from './message'
import error from './error'
import files from './files'

const rootReducer = combineReducers({
  auth,
  dialogs,
  users,
  message,
  error,
  files,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
