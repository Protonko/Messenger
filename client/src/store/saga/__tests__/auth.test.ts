import sagaHelper from 'redux-saga-testing'
import {call, take, takeEvery} from 'redux-saga/effects'
import {loginWorker, authWatcher, signUpWorker, signUpWatcher} from 'store/saga/auth'
import {AuthActionTypes, LoginAction} from 'models/store/actions/auth'

const ACTION_LOGIN: LoginAction = {
  type: AuthActionTypes.LOGIN,
  payload: {
    email: 'email@test.com',
    password: '123456'
  },
  meta: undefined,
}

describe('auth sagas', () => {
  describe('authWatcher', () => {
    const it = sagaHelper(authWatcher())

    it('Should have took LOGIN action', (result) => {
      expect(result).toEqual(take(AuthActionTypes.LOGIN))

      return ACTION_LOGIN
    })

    it('Should have called a worker second', (result) => {
      expect(result).toEqual(call(loginWorker, ACTION_LOGIN))
    })
  })

  describe('signUpWatcher', () => {
    const it = sagaHelper(signUpWatcher())

    it('Should have called a worker first', (result) => {
      expect(result).toEqual(takeEvery(AuthActionTypes.SIGN_UP, signUpWorker))
    })
  })
})