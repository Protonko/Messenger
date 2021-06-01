import type {AxiosResponse} from 'axios'
import {ErrorActionTypes} from 'models/store/actions/error'
import {invalidToken} from 'store/actions/error'
import {errorHandler} from 'utils/errorHandler'

describe('errorHandler', () => {
  let error: Error
  let axiosError: AxiosResponse<Error>

  const actionCreator = (payload: string) => ({type: 'test', payload})
  const axiosErrorActionCreator = (payload: string) => ({
    type: ErrorActionTypes.INVALID_TOKEN_ERROR,
    payload,
  })

  beforeEach(() => {
    error = {name: 'Error', message: 'error message'}
    axiosError = {
      status: 403,
      statusText: '403 Forbidden',
      data: {
        name: 'Error',
        message: '403 error',
      },
      headers: {},
      config: {},
    }
  })

  it('Should return default action on Error', () => {
    expect(errorHandler(error, actionCreator)).toEqual(
      actionCreator(error.message),
    )
  })

  it('Should return invalid token action', () => {
    expect(errorHandler(axiosError, axiosErrorActionCreator)).toEqual(
      invalidToken(axiosError.data.message),
    )
  })

  it('Should return invalid token action on AxiosError', () => {
    axiosError.status = 400
    expect(errorHandler(axiosError, axiosErrorActionCreator)).toEqual(
      invalidToken(axiosError.data.message),
    )
  })
})
