import {AuthActionTypes} from 'models/store/auth'
import {FormTypes, IUserLoginBody} from 'models/auth'
import {IAction} from 'models/common/store'

// export const setTypeOfSign =
//   (payload: FormTypes): IAction<AuthActionTypes.SET_TYPE_OF_SIGN, FormTypes> =>
//     ({type: AuthActionTypes.SET_TYPE_OF_SIGN, payload})

export const setLoginData = (payload: any) => ({type: AuthActionTypes.SET_LOGIN_DATA, payload})
export const login = (payload: IUserLoginBody) => ({type: AuthActionTypes.LOGIN, payload})
