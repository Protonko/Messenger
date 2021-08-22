import {
  appendMessage,
  createMessage,
  createMessageError,
  createMessageSuccess,
  getMessages,
  getMessagesError,
  getMessagesSuccess,
} from 'store/actions/message'
import {
  ICreateMessagePayload,
  MessageActionsTypes,
} from 'models/store/actions/message'
import {MESSAGE} from 'static/test-mocks'

describe('message actions', () => {
  it('should create createMessage', () => {
    const payload: ICreateMessagePayload = {
      text: 'text',
      dialogId: 'dialog',
      interlocutorId: 'interlocutor',
      attachment: undefined,
    }

    const expectedAction = {
      type: MessageActionsTypes.CREATE_MESSAGE,
      payload,
    }

    expect(createMessage(payload)).toEqual(expectedAction)
  })

  it('should create createMessageSuccess', () => {
    const expectedAction = {
      type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
      payload: MESSAGE,
    }

    expect(createMessageSuccess(MESSAGE)).toEqual(expectedAction)
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
        messages: [MESSAGE],
        dialogId: '123',
      },
    }

    expect(
      getMessagesSuccess({
        messages: [MESSAGE],
        dialogId: '123',
      }),
    ).toEqual(expectedAction)
  })

  it('should create appendMessage', () => {
    const expectedAction = {
      type: MessageActionsTypes.APPEND_MESSAGE,
      payload: {
        message: MESSAGE,
        isCurrentDialog: false,
      },
    }

    expect(appendMessage({message: MESSAGE, isCurrentDialog: false})).toEqual(
      expectedAction,
    )
  })
})
