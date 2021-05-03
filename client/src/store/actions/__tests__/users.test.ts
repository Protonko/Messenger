import {UsersActionTypes} from 'models/store/actions/users'
import {
  getUsers,
  getUsersSuccess,
  getUsersError,
  resetUsersState,
} from 'store/actions/users'

describe('Auth actions', () => {
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

  it('Should create getDialogs', () => {
    const expectedAction = {
      type: UsersActionTypes.GET_START,
    }

    expect(getUsers()).toEqual(expectedAction)
  })

  it('Should create getSuccess', () => {
    const expectedAction = {
      type: UsersActionTypes.GET_SUCCESS,
      payload: users,
    }

    expect(getUsersSuccess(users)).toEqual(expectedAction)
  })

  it('Should create getError', () => {
    const expectedAction = {
      type: UsersActionTypes.GET_ERROR,
      payload: 'errorMessage'
    }

    expect(getUsersError('errorMessage')).toEqual(expectedAction)
  })

  it('Should create resetUsersState', () => {
    const expectedAction = {
      type: UsersActionTypes.RESET,
    }

    expect(resetUsersState()).toEqual(expectedAction)
  })
})
