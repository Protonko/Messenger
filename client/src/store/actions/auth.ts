import type {
  IUserLoginBody,
  IUserLoginResponse,
  IUserSignupBody,
} from 'models/auth'
import type {IUser} from 'models/user'
import {
  AuthActionTypes,
  LoginAction,
  ResetErrorMessageAction,
  SetErrorMessageAction,
  SetLoginDataAction,
  SetSignUpDataAction,
  SetUserDataAction,
  SignUpAction,
} from 'models/store/actions/auth'

// login
export const login = (payload: IUserLoginBody): LoginAction => ({
  type: AuthActionTypes.LOGIN,
  payload,
})

export const setLoginData = (
  payload: IUserLoginResponse,
): SetLoginDataAction => ({type: AuthActionTypes.SET_LOGIN_DATA, payload})

export const setUserData = (payload: IUser): SetUserDataAction => ({
  type: AuthActionTypes.SET_USER_DATA,
  payload,
})

// sign up
export const signUp = (payload: IUserSignupBody): SignUpAction => ({
  type: AuthActionTypes.SIGN_UP,
  payload,
})

export const setSignUpData = (payload: IUser): SetSignUpDataAction => ({
  type: AuthActionTypes.SET_SIGN_UP_DATA,
  payload,
})

// error
export const resetErrorMessage = (): ResetErrorMessageAction => ({
  type: AuthActionTypes.RESET_ERROR_MESSAGE,
})

export const setErrorMessage = (payload: string): SetErrorMessageAction => ({
  type: AuthActionTypes.SET_ERROR_MESSAGE,
  payload,
})
