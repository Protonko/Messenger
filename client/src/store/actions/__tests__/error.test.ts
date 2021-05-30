import {ErrorActionTypes} from 'models/store/actions/error'
import {invalidToken} from 'store/actions/error'

describe('Error actions', () => {
  it('Should create invalidToken', () => {
    const exceptedAction = {
      type: ErrorActionTypes.INVALID_TOKEN_ERROR,
      payload: 'error',
    }

    expect(invalidToken('error')).toEqual(exceptedAction)
  })
})
