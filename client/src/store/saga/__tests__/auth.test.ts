import {expectSaga} from 'redux-saga-test-plan'
import {call} from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {
  signUpWatcher,
  signUpWorker,
  loginWorker,
  authWatcher,
} from 'store/saga/auth'
import {
  AuthActionTypes,
  LoginAction,
  SignUpAction,
} from 'models/store/actions/auth'
import {UserApi} from 'api/User'
import {USER} from 'static/test-mocks'

describe('auth sagas', () => {
  const signUpAction: SignUpAction = {
    type: AuthActionTypes.SIGN_UP,
    payload: {
      email: 'email@email.test',
      password: 'password1234',
      full_name: 'name full',
    },
  }
  const loginAction: LoginAction = {
    type: AuthActionTypes.LOGIN,
    payload: {
      email: 'login@test.test',
      password: '123456',
    },
  }

  // sign up
  it('Should sign up success', () => {
    return expectSaga(signUpWorker, signUpAction)
      .provide([[call.fn(UserApi.signUp), {token: '123', USER}]])
      .put({
        type: AuthActionTypes.SET_SIGN_UP_DATA,
        payload: {token: '123', USER},
      })
      .run()
  })

  it('Should sign up error', () => {
    return expectSaga(signUpWorker, signUpAction)
      .provide([[call.fn(UserApi.signUp), throwError(new Error('error'))]])
      .put({type: AuthActionTypes.SET_ERROR_MESSAGE, payload: 'error'})
      .run()
  })

  it('Should take SignUp action', () => {
    return expectSaga(signUpWatcher)
      .provide([[call.fn(UserApi.signUp), throwError(new Error('error'))]])
      .put({type: AuthActionTypes.SET_ERROR_MESSAGE, payload: 'error'})
      .dispatch(signUpAction)
      .run()
  })

  // login
  it('Should login success', () => {
    return expectSaga(loginWorker, loginAction)
      .provide([[call.fn(UserApi.login), {token: '123', user: USER}]])
      .put({
        type: AuthActionTypes.SET_LOGIN_DATA,
        payload: {token: '123', user: USER},
      })
      .run()
  })

  it('Should login error', () => {
    return expectSaga(loginWorker, loginAction)
      .provide([[call.fn(UserApi.login), throwError(new Error('error'))]])
      .put({type: AuthActionTypes.SET_ERROR_MESSAGE, payload: 'error'})
      .run()
  })

  it('Should take Login action', () => {
    return expectSaga(authWatcher)
      .provide([[call.fn(UserApi.login), throwError(new Error('error'))]])
      .put({type: AuthActionTypes.SET_ERROR_MESSAGE, payload: 'error'})
      .dispatch(loginAction)
      .run()
  })
})
