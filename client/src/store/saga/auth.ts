import type {IUser} from 'models/user'
import {put, takeEvery, call} from 'redux-saga/effects'
import {AuthActionTypes, LoginAction, SignUpAction} from 'models/store/actions/auth'
import {api} from 'api'
import {UserApi} from 'api/User'
import {setCookie} from 'utils/setCookie'
import {setLoginData, setErrorMessage, setSignUpData} from 'store/actions/auth'
import {SagaIterator} from 'redux-saga'

// login
export function* loginWorker({payload}: LoginAction): SagaIterator | Generator {
  try {
    yield console.log(123)
    const {token, user}: {token: string, user: IUser} = yield call(UserApi.login, payload)
    yield api.defaults.headers.common['token'] = token
    yield setCookie('token', token, {secure: true})
    yield put(setLoginData({token, user}))
    return
  } catch (e) {
    yield put(setErrorMessage(e))
    return
  }
}

export function* authWatcher() {
  yield takeEvery(AuthActionTypes.LOGIN, loginWorker)
}

// ./login

// sign up
export function* signUpWorker({payload}: SignUpAction) {
  try {
    const data: IUser = yield call(UserApi.signUp, payload)
    yield put(setSignUpData(data))
  } catch (e) {
    yield put(setErrorMessage(e.message))
  }
}

export function* signUpWatcher() {
  yield takeEvery(AuthActionTypes.SIGN_UP, signUpWorker)
}

// ./sign up
