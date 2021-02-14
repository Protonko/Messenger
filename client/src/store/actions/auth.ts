import {AuthActionTypes} from 'models/store/auth'
import {FormTypes} from 'models/common/auth'
import {IAction} from 'models/common/store'

export const setTypeOfSign =
  (payload: FormTypes): IAction<AuthActionTypes.SET_TYPE_OF_SIGN, FormTypes> =>
    ({type: AuthActionTypes.SET_TYPE_OF_SIGN, payload})
