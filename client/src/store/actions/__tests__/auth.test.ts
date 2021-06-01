import {
  setLoginData,
  login,
  setErrorMessage,
  resetErrorMessage,
  setSignUpData,
  signUp,
  setUserData,
} from 'store/actions/auth'
import {AuthActionTypes} from 'models/store/actions/auth'

const USER = {
  email: 'test@email.com',
  password: 'string',
}
const USER_SIGN_UP = {
  ...USER,
  full_name: 'full name',
}
const USER_DATA = {
  ...USER_SIGN_UP,
  avatar: 'https://test.test',
  confirmed: true,
  createdAt: new Date(),
  last_seen: new Date(),
  updatedAt: new Date(),
  id: 'string',
}

describe('auth actions', () => {
  it('should create login', () => {
    const expectedAction = {
      type: AuthActionTypes.LOGIN,
      payload: USER,
    }

    expect(login(USER)).toEqual(expectedAction)
  })

  it('should create setLoginData', () => {
    const expectedAction = {
      type: AuthActionTypes.SET_LOGIN_DATA,
      payload: {
        token: 'string',
        user: USER_DATA,
      },
    }

    expect(
      setLoginData({
        token: 'string',
        user: USER_DATA,
      }),
    ).toEqual(expectedAction)
  })

  it('should create setUserData', () => {
    const expectedAction = {
      type: AuthActionTypes.SET_USER_DATA,
      payload: USER_DATA,
    }

    expect(
      setUserData({
        ...USER_DATA,
      }),
    ).toEqual(expectedAction)
  })

  it('should create signUp', () => {
    const expectedAction = {
      type: AuthActionTypes.SIGN_UP,
      payload: USER_SIGN_UP,
    }

    expect(signUp(USER_SIGN_UP)).toEqual(expectedAction)
  })

  it('should create setSignUpData', () => {
    const expectedAction = {
      type: AuthActionTypes.SET_SIGN_UP_DATA,
      payload: USER_DATA,
    }

    expect(setSignUpData(USER_DATA)).toEqual(expectedAction)
  })

  it('should create resetErrorMessage', () => {
    const expectedAction = {
      type: AuthActionTypes.RESET_ERROR_MESSAGE,
    }

    expect(resetErrorMessage()).toEqual(expectedAction)
  })

  it('should create setErrorMessage', () => {
    const expectedAction = {
      type: AuthActionTypes.SET_ERROR_MESSAGE,
      payload: 'string',
    }

    expect(setErrorMessage('string')).toEqual(expectedAction)
  })
})
