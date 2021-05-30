import {
  ErrorActionTypes,
  HideErrorNotificationAction,
  InvalidTokenErrorAction,
} from 'models/store/actions/error'

export const invalidToken = (payload: string): InvalidTokenErrorAction =>
  ({type: ErrorActionTypes.INVALID_TOKEN_ERROR, payload})

export const hideErrorNotification = (): HideErrorNotificationAction =>
  ({type: ErrorActionTypes.HIDE_ERROR_NOTIFICATION})
