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
  const message = {
    read: false,
    attachments: [],
    id: 'id',
    dialog: 'dialog_id',
    user: 'user',
    text: 'text',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }

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
      payload: message,
    }

    expect(createMessageSuccess(message)).toEqual(expectedAction)
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
      payload: {
        errorMessage: 'Error message',
        dialogId: '123',
      },
    }

    expect(
      getMessagesError({
        errorMessage: 'Error message',
        dialogId: '123',
      }),
    ).toEqual(expectedAction)
  })

  it('should create getMessagesSuccess', () => {
    const expectedAction = {
      type: MessageActionsTypes.GET_MESSAGES_SUCCESS,
      payload: {
        messages: [message],
        dialogId: '123',
      },
    }

    expect(
      getMessagesSuccess({
        messages: [message],
        dialogId: '123',
      }),
    ).toEqual(expectedAction)
  })
})
