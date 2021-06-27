import {all} from 'redux-saga/effects'
import {authWatcher, signUpWatcher} from './auth'
import {createDialogWatcher, getDialogsWatcher} from './dialogs'
import {createMessageWatcher, getMessagesWatcher} from './message'
import {getUsersWatcher} from './users'
import {uploadWatcher} from './files'

export function* rootWatcher() {
  yield all([
    authWatcher(),
    signUpWatcher(),
    getDialogsWatcher(),
    createDialogWatcher(),
    getUsersWatcher(),
    createMessageWatcher(),
    getMessagesWatcher(),
    uploadWatcher(),
  ])
}
