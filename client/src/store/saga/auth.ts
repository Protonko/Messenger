import {IAction} from 'models/common/store'
import {IUserLoginBody} from 'models/auth'
import {AuthActionTypes} from 'models/store/auth'

import {put, takeEvery, call} from 'redux-saga/effects'
import {UserApi} from 'classes/User'
import {setLoginData} from 'store/actions/auth'

function* loginWorker({payload}: IAction<AuthActionTypes.LOGIN, IUserLoginBody>) {
  try {
    const data = yield call(() => UserApi.login(payload))
    yield put(setLoginData(data))
  } catch (e) {
    console.log(e)
  }
}

export function* authWatcher() {
  yield takeEvery(AuthActionTypes.LOGIN, loginWorker)
}
