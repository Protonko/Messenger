import type {AnyAction} from 'redux'
import type {AxiosResponse} from 'axios'
import {invalidToken} from 'store/actions/error'
import {CookieHandler} from 'utils/CookieHandler'

export function errorHandler(
  error: AxiosResponse<Error>,
  callback: (payload: string) => AnyAction,
): AnyAction

export function errorHandler(
  error: Error,
  callback: (payload: string) => AnyAction,
): AnyAction

export function errorHandler<T extends object>(
  error: Error,
  callback: (payload: T) => AnyAction,
  payload: Omit<T, 'errorMessage'>,
): AnyAction

export function errorHandler<T extends object>(
  error: AxiosResponse,
  callback: (payload: T) => AnyAction,
  payload: Omit<T, 'errorMessage'>,
): AnyAction

export function errorHandler<T extends object>(
  error: AxiosResponse<Error> | Error,
  callback: (payload: string | T) => AnyAction,
  payload?: T,
) {
  if ('status' in error) {
    switch (error.status) {
      case 403:
        CookieHandler.deleteCookie('accessToken')
        return invalidToken(error.data.message)

      default:
        return callback(error.data.message)
    }
  }

  if (payload) {
    return callback({...payload, errorMessage: error.message})
  }

  return callback(error.message)
}
