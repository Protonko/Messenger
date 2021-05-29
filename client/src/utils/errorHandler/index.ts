import type {AnyAction} from 'redux'
import type {AxiosResponse} from 'axios'
import {invalidToken} from 'store/actions/error'
import {CookieHandler} from 'utils/CookieHandler'

export function errorHandler(error: AxiosResponse<Error>, callback: (payload: string) => AnyAction): AnyAction
export function errorHandler(error: Error, callback: (payload: string) => AnyAction): AnyAction

export function errorHandler(
  error: AxiosResponse<Error> | Error,
  callback: (payload: string) => AnyAction)
{
  if ('status' in error) {
    switch (error.status) {
      case 403:
        CookieHandler.deleteCookie('token')
        return invalidToken(error.data.message)

      default:
        return callback(error.data.message)
    }
  }

  return callback(error.message)
}
