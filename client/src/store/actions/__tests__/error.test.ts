import {ErrorActionTypes} from 'models/store/actions/error'
import {invalidToken, hideErrorNotification} from 'store/actions/error'

describe('Error actions', () => {
  it('Should create invalidToken', () => {
    const exceptedAction = {
      type: ErrorActionTypes.INVALID_TOKEN_ERROR,
      payload: 'error',
    }

    expect(invalidToken('error')).toEqual(exceptedAction)
  })

  it('Should create hideErrorNotification', () => {
    const exceptedAction = {
      type: ErrorActionTypes.HIDE_ERROR_NOTIFICATION,
    }

    expect(hideErrorNotification()).toEqual(exceptedAction)
  })
})
