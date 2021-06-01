import type {IUser} from 'models/user'
import {put, takeEvery, call} from 'redux-saga/effects'
import {
  AuthActionTypes,
  LoginAction,
  SignUpAction,
} from 'models/store/actions/auth'
import {api} from 'api'
import {UserApi} from 'api/User'
import {CookieHandler} from 'utils/CookieHandler'
import {errorHandler} from 'utils/errorHandler'
import {setLoginData, setErrorMessage, setSignUpData} from 'store/actions/auth'
import {SagaIterator} from 'redux-saga'

// login
export function* loginWorker({payload}: LoginAction): SagaIterator | Generator {
  try {
    const {token, user}: {token: string; user: IUser} = yield call(
      UserApi.login,
      payload,
    )
    yield (api.defaults.headers.common['token'] = token)
    yield CookieHandler.setCookie('token', token, {secure: true})
    yield put(setLoginData({token, user}))
    return
  } catch (error) {
    yield put(errorHandler(error, setErrorMessage))
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
  } catch (error) {
    yield put(errorHandler(error, setErrorMessage))
  }
}

export function* signUpWatcher() {
  yield takeEvery(AuthActionTypes.SIGN_UP, signUpWorker)
}

// ./sign up
