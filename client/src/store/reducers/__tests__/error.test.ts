import {AllErrorActions, ErrorActionTypes} from 'models/store/actions/error'
import error, {initialState} from 'store/reducers/error'

describe('error reducer', () => {
  const ACTIONS: Record<string, AllErrorActions> = {
    INVALID_TOKEN_ERROR: {
      type: ErrorActionTypes.INVALID_TOKEN_ERROR,
      payload: 'error message',
    },
    HIDE_ERROR_NOTIFICATION: {
      type: ErrorActionTypes.HIDE_ERROR_NOTIFICATION,
    },
  }

  it('Should change state on INVALID_TOKEN_ERROR', () => {
    expect(error(initialState, ACTIONS.INVALID_TOKEN_ERROR)).toEqual({
      ...initialState,
      showErrorNotification: true,
      errorMessage: ACTIONS.INVALID_TOKEN_ERROR.payload,
    })
  })

  it('Should change state on HIDE_ERROR_NOTIFICATION', () => {
    expect(error(initialState, ACTIONS.HIDE_ERROR_NOTIFICATION)).toEqual(
      initialState,
    )
  })
})
