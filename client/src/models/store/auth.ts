import {FormTypes} from 'models/common/auth'


export enum AuthActionTypes {
  SET_TYPE_OF_SIGN = '[AUTH]SET_TYPE_OF_SIGN'
}

export interface ISetTypeOfSign {
  type: AuthActionTypes.SET_TYPE_OF_SIGN
  payload: FormTypes
}
