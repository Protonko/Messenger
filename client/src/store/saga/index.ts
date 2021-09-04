import {all} from 'redux-saga/effects'
import {authWatcher, signUpWatcher} from './auth'
import {createDialogWatcher, getDialogsWatcher} from './dialogs'
import {
  createMessageWatcher,
  deleteMessagesWatcher,
  getMessagesWatcher,
} from './message'
import {getUsersWatcher} from './users'

export function* rootWatcher() {
  yield all([
    authWatcher(),
    signUpWatcher(),
    getDialogsWatcher(),
    createDialogWatcher(),
    getUsersWatcher(),
    createMessageWatcher(),
    getMessagesWatcher(),
    deleteMessagesWatcher(),
  ])
}
