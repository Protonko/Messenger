import message, {initialState} from 'store/reducers/message'
import {AllMessageActions, MessageActionsTypes} from 'models/store/actions/message'

describe('auth reducer', () => {
  const ACTIONS: Record<string, AllMessageActions> = {
    CREATE_MESSAGE: {
      type: MessageActionsTypes.CREATE_MESSAGE,
      payload: 'text',
    },
    CREATE_MESSAGE_SUCCESS: {
      type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
      payload: {
        read: false,
        attachments: [],
        id: 'id',
        user: 'user',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    },
    CREATE_MESSAGE_ERROR: {
      type: MessageActionsTypes.CREATE_MESSAGE_ERROR,
      payload: 'error',
    },
  }

  it('Should change creating prop on CREATE_MESSAGE action', () => {
    expect(message(initialState, ACTIONS.CREATE_MESSAGE)).toEqual(
      {
        ...initialState,
        creating: true,
      },
    )
  })

  it('Should change createErrorMessage prop on CREATE_MESSAGE_ERROR action', () => {
    expect(message(initialState, ACTIONS.CREATE_MESSAGE_ERROR)).toEqual(
      {
        ...initialState,
        createErrorMessage: ACTIONS.CREATE_MESSAGE_ERROR.payload,
      },
    )
  })

  it('Should change state on CREATE_MESSAGE_SUCCESS action', () => {
    expect(message(initialState, ACTIONS.CREATE_MESSAGE_SUCCESS)).toEqual(
      {
        ...initialState,
      },
    )
  })
})
