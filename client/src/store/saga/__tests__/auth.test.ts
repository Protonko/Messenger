import {call} from 'redux-saga-test-plan/matchers'
import {expectSaga} from 'redux-saga-test-plan'
import {authWatcher, loginWorker, signUpWorker, signUpWatcher} from 'store/saga/auth'
import {AuthActionTypes, SignUpAction} from 'models/store/actions/auth'
import {UserApi} from 'api/User'
import {IUserSignupBody} from '../../../models/auth'

describe('auth sagas', () => {
  const user = {
    avatar: null,
    confirmed: false,
    createdAt: 'now',
    email: 'string',
    full_name: 'full name',
    last_seen: 'Date',
    updatedAt: 'Date',
    id: 'stringID',
  }

  it('tmp test', () => {
    const action: SignUpAction = {
      type: AuthActionTypes.SIGN_UP,
      payload: {
        email: 'email@email.test',
        password: 'password1234',
        full_name: 'name full',
      },
    }
    return expectSaga(signUpWorker, action)
      .provide([[call.fn(UserApi.signUp), []]])
      .put({type: AuthActionTypes.SET_SIGN_UP_DATA, payload: {token: '123', user}})
      .run();
  })
})
