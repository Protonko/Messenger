import {combineReducers} from 'redux'
import auth from './auth'
import dialogs from './dialogs'

const rootReducer = combineReducers({
  auth,
  dialogs,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
