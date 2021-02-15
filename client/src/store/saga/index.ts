import {all} from 'redux-saga/effects'
import {authWatcher} from './auth'

export function* rootWatcher() {
  yield all([authWatcher()])
}
