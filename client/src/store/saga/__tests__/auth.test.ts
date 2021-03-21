import sagaHelper from 'redux-saga-testing'
import {call, take} from 'redux-saga/effects'
import {AuthActionTypes} from 'models/store/auth'
import {IAction} from 'models/common/store'
import {IUserLoginBody} from 'models/auth'
import {loginWorker, authWatcher} from 'store/saga/auth'

const ACTION_LOGIN: IAction<AuthActionTypes.LOGIN, IUserLoginBody> = {
  type: AuthActionTypes.LOGIN,
  payload: {
    email: 'email@test.com',
    password: '123456'
  },
  meta: undefined,
}

describe('auth sagas', () => {
  const it = sagaHelper(authWatcher())

  it('[authWatcher] should have took LOGIN action', (result) => {
    expect(result).toEqual(take(AuthActionTypes.LOGIN))

    return ACTION_LOGIN
  })

  it('[authWatcher] should have called the mock API secondly', (result) => {
    expect(result).toEqual(call(loginWorker, ACTION_LOGIN))
  })
})
