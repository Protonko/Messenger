import {AuthActionTypes} from 'models/store/auth'
import {IUserLoginBody, IUserSignupBody} from 'models/auth'
import {IUser} from 'models/user'

// login
export const login = (payload: IUserLoginBody) => ({type: AuthActionTypes.LOGIN, payload})
export const setLoginData = (payload: string) => ({type: AuthActionTypes.SET_LOGIN_DATA, payload})

// sign up
export const signUp = (payload: IUserSignupBody) => ({type: AuthActionTypes.SIGN_UP, payload})
export const setSignUpData = (payload: IUser) => ({type: AuthActionTypes.SET_SIGN_UP_DATA, payload})

// shared
export const resetErrorMessage = () => ({type: AuthActionTypes.RESET_ERROR_MESSAGE})
export const setErrorMessage = (payload: string) => ({type: AuthActionTypes.SET_ERROR_MESSAGE, payload})
