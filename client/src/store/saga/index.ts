import {all} from 'redux-saga/effects'
import {authWatcher, signUpWatcher} from './auth'
import {getDialogsWatcher} from './dialogs'
import {getUsersWatcher} from './users'

export function* rootWatcher() {
  yield all([
    authWatcher(),
    signUpWatcher(),
    getDialogsWatcher(),
    getUsersWatcher(),
  ])
}
