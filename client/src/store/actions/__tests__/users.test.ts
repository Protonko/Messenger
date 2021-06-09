import {UsersActionTypes} from 'models/store/actions/users'
import {
  getUsers,
  getUsersSuccess,
  getUsersError,
  resetUsersState,
  setSelectedUserId,
  resetSelectedUserId,
} from 'store/actions/users'
import {USER} from 'static/test-mocks'

describe('Auth actions', () => {
  it('Should create getDialogs', () => {
    const expectedAction = {
      type: UsersActionTypes.GET_START,
    }

    expect(getUsers()).toEqual(expectedAction)
  })

  it('Should create getSuccess', () => {
    const expectedAction = {
      type: UsersActionTypes.GET_SUCCESS,
      payload: [USER],
    }

    expect(getUsersSuccess([USER])).toEqual(expectedAction)
  })

  it('Should create getError', () => {
    const expectedAction = {
      type: UsersActionTypes.GET_ERROR,
      payload: 'errorMessage',
    }

    expect(getUsersError('errorMessage')).toEqual(expectedAction)
  })

  it('Should create resetUsersState', () => {
    const expectedAction = {
      type: UsersActionTypes.RESET,
    }

    expect(resetUsersState()).toEqual(expectedAction)
  })

  it('Should create setSelectedUserId', () => {
    const expectedAction = {
      type: UsersActionTypes.SET_SELECTED_USER_ID,
      payload: 'foo',
    }

    expect(setSelectedUserId('foo')).toEqual(expectedAction)
  })

  it('Should create resetSelectedUserId', () => {
    const expectedAction = {
      type: UsersActionTypes.RESET_SELECTED_USER_ID,
    }

    expect(resetSelectedUserId()).toEqual(expectedAction)
  })
})
