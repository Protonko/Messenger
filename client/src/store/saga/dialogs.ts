import type {IDialog} from 'models/dialog'
import type {IInitialState as AuthState} from 'store/reducers/auth'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {DialogsActionTypes} from 'models/store/actions/dialogs'
import {DialogsApi} from 'api/Dialogs'
import {selectors} from 'store/saga/selectors'
import {getDialogsError, getDialogsSuccess} from 'store/actions/dialogs'

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
