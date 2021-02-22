import {all} from 'redux-saga/effects'
import {authWatcher, signUpWatcher} from './auth'

export function* rootWatcher() {
  yield all([authWatcher(), signUpWatcher()])
}
