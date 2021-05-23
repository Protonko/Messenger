import {combineReducers} from 'redux'
import auth from './auth'
import dialogs from './dialogs'
import users from './users'
import message from './message'

const rootReducer = combineReducers({
  auth,
  dialogs,
  users,
  message,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
