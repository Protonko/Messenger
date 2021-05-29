import {ErrorActionTypes, InvalidTokenErrorAction} from 'models/store/actions/error'

export const invalidToken = (payload: string): InvalidTokenErrorAction =>
  ({type: ErrorActionTypes.INVALID_TOKEN_ERROR, payload})
