import type {IUser} from 'models/user'
import {put, take, takeEvery, call} from 'redux-saga/effects'
import {AuthActionTypes, LoginAction, SignUpAction} from 'models/store/actions/auth'
import {api} from 'api'
import {UserApi} from 'api/User'
import {setLoginData, setErrorMessage, setSignUpData} from 'store/actions/auth'

// login
export function* loginWorker({payload}: LoginAction) {
  try {
    const {token, user}: {token: string, user: IUser} = yield call(() => UserApi.login(payload))
    yield api.defaults.headers.common['token'] = token;
    yield put(setLoginData({token, user}))
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
export function* signUpWorker({payload}: SignUpAction) {
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
