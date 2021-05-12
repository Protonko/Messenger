import type {ICreateDialogBody, IDialog} from 'models/dialog'
import type {IInitialState as AuthState} from 'store/reducers/auth'
import type {IInitialState as UsersState} from 'store/reducers/users'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {CreateDialogAction, DialogsActionTypes} from 'models/store/actions/dialogs'
import {DialogsApi} from 'api/Dialogs'
import {selectors} from 'store/saga/selectors'
import {
  getDialogsError,
  getDialogsSuccess,
  createDialogSuccess,
  createDialogError,
} from 'store/actions/dialogs'

// get
export function* getDialogsWorker() {
  try {
    const {account}: AuthState = yield select(selectors.getAuth)

    if (account?.id) {
      const dialogs: IDialog[] = yield call(DialogsApi.getDialogs, account.id)
      yield put(getDialogsSuccess(dialogs))
    } else {
      yield put(getDialogsError('ID not found!'))
    }
  } catch (e) {
    yield put(getDialogsError(e.message))
  }
}

export function* getDialogsWatcher() {
  yield takeEvery(DialogsActionTypes.GET_START, getDialogsWorker)
}

// post
export function* createDialogWorker({payload}: CreateDialogAction) {
  try {
    const {account}: AuthState = yield select(selectors.getAuth)
    const {selectedUserId}: UsersState = yield select(selectors.getUsers)

    if (account?.id && selectedUserId) {
      const body: ICreateDialogBody = {
        author: account.id,
        interlocutor: selectedUserId,
        text: payload,
      }

      const dialog: IDialog = yield call(DialogsApi.createDialog, body)
      yield put(createDialogSuccess(dialog))
    } else {
      yield put(createDialogError('ID not found!'))
    }
  } catch (e) {
    yield put(createDialogError(e))
  }
}

export function* createDialogWatcher() {
  yield takeEvery(DialogsActionTypes.CREATE_DIALOG, createDialogWorker)
}
