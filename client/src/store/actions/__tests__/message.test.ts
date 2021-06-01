import {
  createMessage,
  createMessageError,
  createMessageSuccess,
  getMessages,
  getMessagesError,
  getMessagesSuccess,
} from 'store/actions/message'
import {MessageActionsTypes} from 'models/store/actions/message'

describe('message actions', () => {
  const createMessageResponse = {
    status: 'success',
    read: false,
    attachments: [],
    id: 'id',
    user: 'user',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }

  // TODO: FIX
  const messages = [
    {
      read: false,
      attachments: [],
      id: 'id',
      user: 'user',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  ]

  it('should create createMessage', () => {
    const expectedAction = {
      type: MessageActionsTypes.CREATE_MESSAGE,
      payload: 'text',
    }

    expect(createMessage('text')).toEqual(expectedAction)
  })

  it('should create createMessageSuccess', () => {
    const expectedAction = {
      type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
      payload: createMessageResponse,
    }

    expect(createMessageSuccess(createMessageResponse)).toEqual(expectedAction)
  })

  it('should create createMessageError', () => {
    const expectedAction = {
      type: MessageActionsTypes.CREATE_MESSAGE_ERROR,
      payload: 'error',
    }

    expect(createMessageError('error')).toEqual(expectedAction)
  })

  it('should create getMessages', () => {
    const expectedAction = {
      type: MessageActionsTypes.GET_MESSAGES,
      payload: 'id',
    }

    expect(getMessages('id')).toEqual(expectedAction)
  })

  it('should create getMessagesError', () => {
    const expectedAction = {
      type: MessageActionsTypes.GET_MESSAGES_ERROR,
      payload: 'Error message',
    }

    expect(getMessagesError('Error message')).toEqual(expectedAction)
  })

  it('should create getMessagesSuccess', () => {
    const expectedAction = {
      type: MessageActionsTypes.GET_MESSAGES_SUCCESS,
      payload: messages,
    }

    expect(getMessagesSuccess(messages)).toEqual(expectedAction)
  })
})
