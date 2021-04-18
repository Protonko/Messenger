import {all} from 'redux-saga/effects'
import {authWatcher, signUpWatcher} from './auth'
import {getDialogsWatcher} from './dialogs'

export function* rootWatcher() {
  yield all([authWatcher(), signUpWatcher(), getDialogsWatcher()])
}
