import type {IMessage} from 'models/message'
import {expectSaga} from 'redux-saga-test-plan'
import {call} from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {
  CreateMessageAction,
  GetMessagesAction,
  ICreateMessagePayload,
  MessageActionsTypes,
} from 'models/store/actions/message'
import {MessagesApi} from 'api/Messages'
import {
  createMessageWatcher,
  createMessageWorker,
  getMessagesWatcher,
  getMessagesWorker,
} from 'store/saga/message'

describe('message sagas', () => {
  const createMessagePayload: ICreateMessagePayload = {
    dialogId: 'userId',
    interlocutorId: 'interlocutorId',
    text: 'text',
  }
  const message: IMessage = {
    read: false,
    attachments: [],
    id: 'id',
    dialog: 'foo',
    author: {
      avatar: null,
      confirmed: true,
      createdAt: new Date('01.01.01'),
      updatedAt: new Date('01.01.01'),
      last_seen: new Date('01.01.01'),
      email: 'string',
      full_name: 'string',
      id: 'bar',
    },
    text: 'baz',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }

  describe('create message', () => {
    const createMessageAction: CreateMessageAction = {
      type: MessageActionsTypes.CREATE_MESSAGE,
      payload: createMessagePayload,
    }

    it('Should create message', () => {
      return expectSaga(createMessageWatcher)
        .provide([[call.fn(MessagesApi.createMessage), message]])
        .put({
          type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
          payload: message,
        })
        .dispatch(createMessageAction)
        .run()
    })

    it('Should create message successfully', () => {
      return expectSaga(createMessageWorker, createMessageAction)
        .provide([[call.fn(MessagesApi.createMessage), message]])
        .put({
          type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
          payload: message,
        })
        .run()
    })

    it('Should get error', () => {
      return expectSaga(createMessageWorker, createMessageAction)
        .provide([
          [call.fn(MessagesApi.createMessage), throwError(new Error('error'))],
        ])
        .put({
          type: MessageActionsTypes.CREATE_MESSAGE_ERROR,
          payload: 'error',
        })
        .run()
    })
  })

  describe('get messages', () => {
    const getMessagesAction: GetMessagesAction = {
      type: MessageActionsTypes.GET_MESSAGES,
      payload: 'dialog_id',
    }

    it('Should get success', () => {
      return expectSaga(getMessagesWatcher)
        .provide([[call.fn(MessagesApi.getMessages), [message]]])
        .put({
          type: MessageActionsTypes.GET_MESSAGES_SUCCESS,
          payload: {
            messages: [message],
            dialogId: getMessagesAction.payload,
          },
        })
        .dispatch(getMessagesAction)
        .run()
    })

    it('Should get error', () => {
      return expectSaga(getMessagesWorker, getMessagesAction)
        .provide([
          [call.fn(MessagesApi.getMessages), throwError(new Error('error'))],
        ])
        .put({
          type: MessageActionsTypes.GET_MESSAGES_ERROR,
          payload: {
            errorMessage: 'error',
            dialogId: getMessagesAction.payload,
          },
        })
        .run()
    })
  })
})
