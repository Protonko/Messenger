import {
  ErrorActionTypes,
  HideErrorNotificationAction,
  CommonErrorAction,
  InvalidTokenErrorAction,
} from 'models/store/actions/error'

export const invalidToken = (payload: string): InvalidTokenErrorAction => ({
  type: ErrorActionTypes.INVALID_TOKEN_ERROR,
  payload,
})

export const commonError = (payload: string): CommonErrorAction => ({
  type: ErrorActionTypes.COMMON_ERROR,
  payload,
})

export const hideErrorNotification = (): HideErrorNotificationAction => ({
  type: ErrorActionTypes.HIDE_ERROR_NOTIFICATION,
})
