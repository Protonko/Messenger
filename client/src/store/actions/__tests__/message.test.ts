import {
  createMessage,
  createMessageError,
  createMessageSuccess,
} from 'store/actions/message'
import {MessageActionsTypes} from 'models/store/actions/message'

describe('message actions', () => {
  const createMessageBody = {
    id: '123',
    text: 'text',
  }

  const createMessageResponse = {
    status: 'success',
    read: false,
    attachments: [],
    id: 'id',
    user: 'user',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }

  it('should create createMessage', () => {
    const expectedAction = {
      type: MessageActionsTypes.CREATE_MESSAGE,
      payload: createMessageBody,
    }

    expect(createMessage(createMessageBody)).toEqual(expectedAction)
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
})
