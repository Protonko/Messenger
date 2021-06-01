import {AllUsersActions, UsersActionTypes} from 'models/store/actions/users'
import users, {initialState} from 'store/reducers/users'

describe('Users reducer', () => {
  const ACTIONS: Record<string, AllUsersActions> = {
    GET_START: {
      type: UsersActionTypes.GET_START,
    },
    GET_SUCCESS: {
      type: UsersActionTypes.GET_SUCCESS,
      payload: [
        {
          avatar: 'avatar',
          confirmed: false,
          createdAt: new Date(),
          email: 'email',
          full_name: 'full name',
          last_seen: new Date(),
          updatedAt: new Date(),
          id: '123id',
        },
      ],
    },
    GET_ERROR: {
      type: UsersActionTypes.GET_ERROR,
      payload: 'errorMessage',
    },
    RESET: {
      type: UsersActionTypes.RESET,
    },
    SET_SELECTED_USER_ID: {
      type: UsersActionTypes.SET_SELECTED_USER_ID,
      payload: 'foo',
    },
    RESET_SELECTED_USER_ID: {
      type: UsersActionTypes.RESET_SELECTED_USER_ID,
    },
  }

  it('Should return the payload from GET_START action', () => {
    expect(users(initialState, ACTIONS.GET_START)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('Should return the payload from GET_SUCCESS action', () => {
    expect(users(initialState, ACTIONS.GET_SUCCESS)).toEqual({
      ...initialState,
      users: ACTIONS.GET_SUCCESS.payload,
    })
  })

  it('Should return the payload from GET_ERROR action', () => {
    expect(users(initialState, ACTIONS.GET_ERROR)).toEqual({
      ...initialState,
      errorMessage: ACTIONS.GET_ERROR.payload,
    })
  })

  it('Should return the initial state after SET_SELECTED_USER_ID action', () => {
    expect(users(initialState, ACTIONS.RESET)).toEqual(initialState)
  })

  it('Should return the payload after SET_SELECTED_USER_ID action', () => {
    expect(users(initialState, ACTIONS.SET_SELECTED_USER_ID)).toEqual({
      ...initialState,
      selectedUserId: ACTIONS.SET_SELECTED_USER_ID.payload,
    })
  })

  it('Should reset selectedUserId after RESET_SELECTED_USER_ID action', () => {
    expect(users(initialState, ACTIONS.RESET_SELECTED_USER_ID)).toEqual({
      ...initialState,
      selectedUserId: null,
    })
  })
})
