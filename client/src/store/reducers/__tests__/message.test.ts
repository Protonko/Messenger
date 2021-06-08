import type {IMessage} from 'models/message'
import message, {initialState} from 'store/reducers/message'
import {
  AllMessageActions,
  MessageActionsTypes,
} from 'models/store/actions/message'

describe('auth reducer', () => {
  const ERROR_MESSAGE = 'error'
  const DIALOG_ID = '123'
  const MESSAGE: IMessage = {
    read: false,
    attachments: [],
    id: 'id',
    text: 'text',
    dialog: 'dialog_id',
    author: {
      avatar: null,
      confirmed: false,
      email: 'foo@bar.baz',
      id: '123',
      full_name: 'name',
      createdAt: new Date('01-01-01'),
      updatedAt: new Date('01-01-01'),
      last_seen: new Date('01-01-01'),
    },
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
  const STATE_WITH_MESSAGES_DATA = {
    ...initialState,
    messages: {
      [DIALOG_ID]: [MESSAGE],
    },
  }
  const ACTIONS: Record<string, AllMessageActions> = {
    CREATE_MESSAGE: {
      type: MessageActionsTypes.CREATE_MESSAGE,
      payload: {
        text: 'foo',
        dialogId: 'bar',
        interlocutorId: 'baz',
      },
    },
    CREATE_MESSAGE_SUCCESS: {
      type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
      payload: MESSAGE,
    },
    CREATE_MESSAGE_ERROR: {
      type: MessageActionsTypes.CREATE_MESSAGE_ERROR,
      payload: ERROR_MESSAGE,
    },
    GET_MESSAGES: {
      type: MessageActionsTypes.GET_MESSAGES,
      payload: DIALOG_ID,
    },
    GET_MESSAGES_ERROR: {
      type: MessageActionsTypes.GET_MESSAGES_ERROR,
      payload: {
        errorMessage: ERROR_MESSAGE,
        dialogId: DIALOG_ID,
      },
    },
    GET_MESSAGES_SUCCESS: {
      type: MessageActionsTypes.GET_MESSAGES_SUCCESS,
      payload: {
        messages: [MESSAGE],
        dialogId: DIALOG_ID,
      },
    },
  }

  it('Should change creating prop on CREATE_MESSAGE action', () => {
    expect(message(initialState, ACTIONS.CREATE_MESSAGE)).toEqual({
      ...initialState,
      creating: true,
    })
  })

  it('Should change createErrorMessage prop on CREATE_MESSAGE_ERROR action', () => {
    expect(message(initialState, ACTIONS.CREATE_MESSAGE_ERROR)).toEqual({
      ...initialState,
      createErrorMessage: ERROR_MESSAGE,
    })
  })

  it('Should change state on CREATE_MESSAGE_SUCCESS action', () => {
    expect(message(initialState, ACTIONS.CREATE_MESSAGE_SUCCESS)).toEqual({
      ...initialState,
      messages: {
        [MESSAGE.dialog]: [MESSAGE],
      },
    })
  })

  it('Should change state on GET_MESSAGES action', () => {
    expect(message(initialState, ACTIONS.GET_MESSAGES)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('Should change state on GET_MESSAGES_ERROR action', () => {
    expect(message(initialState, ACTIONS.GET_MESSAGES_ERROR)).toEqual({
      ...initialState,
      loading: false,
      errorMessage: ERROR_MESSAGE,
    })
  })

  it('Should remove messages data on GET_MESSAGES_ERROR action', () => {
    expect(
      message(STATE_WITH_MESSAGES_DATA, ACTIONS.GET_MESSAGES_ERROR),
    ).toEqual({
      ...STATE_WITH_MESSAGES_DATA,
      loading: false,
      errorMessage: ERROR_MESSAGE,
      messages: {},
    })
  })

  it('Should change state on GET_MESSAGES_SUCCESS action', () => {
    expect(message(initialState, ACTIONS.GET_MESSAGES_SUCCESS)).toEqual({
      ...initialState,
      loading: false,
      messages: {
        [DIALOG_ID]: [MESSAGE],
      },
    })
  })

  it('Should append messages data on GET_MESSAGES_SUCCESS action', () => {
    expect(
      message(STATE_WITH_MESSAGES_DATA, ACTIONS.GET_MESSAGES_SUCCESS),
    ).toEqual({
      ...STATE_WITH_MESSAGES_DATA,
      loading: false,
      messages: {
        [DIALOG_ID]: [MESSAGE, MESSAGE],
      },
    })
  })
})
