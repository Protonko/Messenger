import type {IUser} from 'models/user'
import {call, put, takeEvery} from 'redux-saga/effects'
import {UsersActionTypes} from 'models/store/actions/users'
import {UserApi} from 'api/User'
import {getUsersError, getUsersSuccess} from 'store/actions/users'
import {errorHandler} from 'utils/errorHandler'

export function* getUsersWorker() {
  try {
    const users: IUser[] = yield call(UserApi.getUsers)
    yield put(getUsersSuccess(users))
  } catch (error) {
    yield put(errorHandler(error, getUsersError))
  }
}

export function* getUsersWatcher() {
  yield takeEvery(UsersActionTypes.GET_START, getUsersWorker)
}
