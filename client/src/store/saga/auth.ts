import {IAction} from 'models/common/store'
import {IUserLoginBody, IUserSignupBody} from 'models/auth'
import {AuthActionTypes} from 'models/store/auth'

import {api} from 'api'
import {put, take, takeEvery, call} from 'redux-saga/effects'
import {UserApi} from 'api/User'
import {setLoginData, setErrorMessage, setSignUpData} from 'store/actions/auth'
import {IUser} from 'models/user'

// login
export function* loginWorker({payload}: IAction<AuthActionTypes.LOGIN, IUserLoginBody>) {
  try {
    const {token}: {token: string} = yield call(() => UserApi.login(payload))
    yield api.defaults.headers.common['token'] = token;
    yield put(setLoginData(token))
  } catch (e) {
    yield put(setErrorMessage(e))
  }
}

export function* authWatcher() {
  const data = yield take(AuthActionTypes.LOGIN)
  yield call(loginWorker, data)
}
// ./login

// sign up
export function* signUpWorker({payload}: IAction<AuthActionTypes.SIGN_UP, IUserSignupBody>) {
  try {
    const data: IUser = yield call(() => UserApi.signUp(payload))
    yield put(setSignUpData(data))
  } catch (e) {
    yield put(setErrorMessage(e))
  }
}

export function* signUpWatcher() {
  yield takeEvery(AuthActionTypes.SIGN_UP, signUpWorker)
}
// ./sign up
