import auth, {initialState} from 'store/reducers/auth'
import {AllAuthActions, AuthActionTypes} from 'models/store/actions/auth'

describe('auth reducer', () => {
  const ACTIONS: Record<string, AllAuthActions> = {
    SET_LOGIN_DATA: {
      type: AuthActionTypes.SET_LOGIN_DATA,
      payload: {
        token: 'token123',
        user: {
          avatar: null,
          confirmed: false,
          createdAt: new Date(),
          email: 'email',
          full_name: 'full_name',
          last_seen: new Date(),
          updatedAt: new Date(),
          id: 'test_id',
        }
      },
      meta: undefined,
    },
    SET_ERROR_MESSAGE: {
      type: AuthActionTypes.SET_ERROR_MESSAGE,
      payload: 'errorMessage',
      meta: undefined,
    },
    RESET_ERROR_MESSAGE: {
      type: AuthActionTypes.RESET_ERROR_MESSAGE,
      payload: undefined,
      meta: undefined,
    },
    SET_SIGN_UP_DATA: {
      type: AuthActionTypes.SET_SIGN_UP_DATA,
      payload: {
        avatar: 'avatar',
        confirmed: true,
        createdAt: new Date(),
        email: 'email',
        full_name: 'full_name',
        last_seen: new Date(),
        updatedAt: new Date(),
        id: '2',
      },
      meta: undefined,
    },
  }

  it('should return the payload from SET_LOGIN_DATA action', () => {
    expect(auth(initialState, ACTIONS.SET_LOGIN_DATA)).toEqual(
      {
        ...initialState,
        token: ACTIONS.SET_LOGIN_DATA.payload.token,
        account: ACTIONS.SET_LOGIN_DATA.payload.user,
        errorMessage: false
      },
    )
  })

  it('should return the payload from SET_ERROR_MESSAGE action', () => {
    expect(auth(initialState, ACTIONS.SET_ERROR_MESSAGE)).toEqual(
      {
        ...initialState,
        errorMessage: ACTIONS.SET_ERROR_MESSAGE.payload,
      },
    )
  })

  it('should return the payload from RESET_ERROR_MESSAGE action', () => {
    expect(auth(initialState, ACTIONS.RESET_ERROR_MESSAGE)).toEqual(
      {
        ...initialState,
        errorMessage: null,
      },
    )
  })

  it('should return the payload from SET_SIGN_UP_DATA action', () => {
    expect(auth(initialState, ACTIONS.SET_SIGN_UP_DATA)).toEqual(
      {
        ...initialState,
        account: ACTIONS.SET_SIGN_UP_DATA.payload,
      },
    )
  })
})
