import auth, {initialState} from 'store/reducers/auth'
import {AllAuthActions, AuthActionTypes} from 'models/store/actions/auth'
import {AllErrorActions, ErrorActionTypes} from 'models/store/actions/error'
import {USER} from 'static/test-mocks'

describe('auth reducer', () => {
  const ACTIONS: Record<string, AllAuthActions | AllErrorActions> = {
    SET_LOGIN_DATA: {
      type: AuthActionTypes.SET_LOGIN_DATA,
      payload: {
        accessToken: 'token123',
        user: USER,
      },
      meta: undefined,
    },
    SET_USER_DATA: {
      type: AuthActionTypes.SET_USER_DATA,
      payload: USER,
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
      payload: USER,
      meta: undefined,
    },
    SIGN_UP: {
      type: AuthActionTypes.SIGN_UP,
      payload: {
        email: 'test@test.test',
        full_name: 'full name',
        password: '123456',
      },
    },
    INVALID_TOKEN_ERROR: {
      type: ErrorActionTypes.INVALID_TOKEN_ERROR,
      payload: 'error',
    },
  }

  it('Should return the payload from SET_LOGIN_DATA action', () => {
    expect(auth(initialState, ACTIONS.SET_LOGIN_DATA)).toEqual({
      ...initialState,
      accessToken: ACTIONS.SET_LOGIN_DATA.payload.accessToken,
      account: ACTIONS.SET_LOGIN_DATA.payload.user,
      errorMessage: false,
    })
  })

  it('Should return the payload from SET_USER_DATA action', () => {
    expect(auth(initialState, ACTIONS.SET_USER_DATA)).toEqual({
      ...initialState,
      account: ACTIONS.SET_USER_DATA.payload,
    })
  })

  it('Should return the payload from SET_ERROR_MESSAGE action', () => {
    expect(auth(initialState, ACTIONS.SET_ERROR_MESSAGE)).toEqual({
      ...initialState,
      errorMessage: ACTIONS.SET_ERROR_MESSAGE.payload,
    })
  })

  it('Should return the payload from RESET_ERROR_MESSAGE action', () => {
    expect(auth(initialState, ACTIONS.RESET_ERROR_MESSAGE)).toEqual({
      ...initialState,
      errorMessage: null,
    })
  })

  it('Should return the payload from SET_SIGN_UP_DATA action', () => {
    expect(auth(initialState, ACTIONS.SET_SIGN_UP_DATA)).toEqual({
      ...initialState,
      account: ACTIONS.SET_SIGN_UP_DATA.payload,
    })
  })

  it('Should return initialState on INVALID_TOKEN_ERROR', () => {
    expect(auth(initialState, ACTIONS.INVALID_TOKEN_ERROR)).toEqual(
      initialState,
    )
  })

  it('Should return state without changes', () => {
    expect(auth(initialState, ACTIONS.SIGN_UP)).toEqual(initialState)
  })
})
