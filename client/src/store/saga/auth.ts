import type {SagaIterator} from 'redux-saga'
import type {IUser} from 'models/user'
import type {IUserLoginResponse} from 'models/auth'
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

// login
export function* loginWorker({payload}: LoginAction): SagaIterator | Generator {
  try {
    const {accessToken, user}: IUserLoginResponse = yield call(
      UserApi.login,
      payload,
    )
    yield (api.defaults.headers.authorization = `Bearer ${accessToken}`)
    yield CookieHandler.setCookie('accessToken', accessToken, {secure: true})
    yield put(setLoginData({accessToken, user}))
  } catch (error) {
    yield put(errorHandler(error, setErrorMessage))
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
