import {call} from 'redux-saga-test-plan/matchers'
import {expectSaga} from 'redux-saga-test-plan'
import {throwError} from 'redux-saga-test-plan/providers'
import {getUsersWatcher, getUsersWorker} from 'store/saga/users'
import {UsersActionTypes} from 'models/store/actions/users'
import {UserApi} from 'api/User'

describe('users sagas', () => {
  const users = [{
    avatar: null,
    confirmed: false,
    createdAt: new Date(),
    email: 'email',
    full_name: 'full name',
    last_seen: new Date(),
    updatedAt: new Date(),
    id: 'id',
  }]

  it('Should take GetUsers action', () => {
    return expectSaga(getUsersWatcher)
      .provide([
        [call.fn(UserApi.getUsers), users]
      ])
      .put({type: UsersActionTypes.GET_SUCCESS, payload: users})
      .dispatch({type: UsersActionTypes.GET_START})
      .run();
  })

  it('Should get success', () => {
    return expectSaga(getUsersWorker)
      .provide([
        [call.fn(UserApi.getUsers), users]
      ])
      .put({type: UsersActionTypes.GET_SUCCESS, payload: users})
      .run();
  })

  it('Should get error', () => {
    return expectSaga(getUsersWorker)
      .provide([
        [call.fn(UserApi.getUsers), throwError(new Error('error'))]
      ])
      .put({type: UsersActionTypes.GET_ERROR, payload: 'error'})
      .run();
  })
})
