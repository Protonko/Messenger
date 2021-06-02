import {expectSaga} from 'redux-saga-test-plan'
import {call} from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {select} from 'redux-saga/effects'
import {
  CreateMessageAction,
  GetMessagesAction,
  MessageActionsTypes,
} from 'models/store/actions/message'
import {MessagesApi} from 'api/Messages'
import {selectors} from 'store/saga/selectors'
import {
  createMessageWatcher,
  createMessageWorker,
  getMessagesWatcher,
  getMessagesWorker,
} from 'store/saga/message'

describe('message sagas', () => {
  const message = {
    read: false,
    attachments: [],
    id: 'id',
    user: 'user',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }

  describe('create message', () => {
    const createMessageAction: CreateMessageAction = {
      type: MessageActionsTypes.CREATE_MESSAGE,
      payload: 'text',
    }

    it('Should get error "ID not found!"', () => {
      return expectSaga(createMessageWatcher)
        .provide([[select(selectors.getUsers), {selectedUserId: null}]])
        .put({
          type: MessageActionsTypes.CREATE_MESSAGE_ERROR,
          payload: 'ID not found!',
        })
        .dispatch(createMessageAction)
        .run()
    })

    it('Should create message successfully', () => {
      return expectSaga(createMessageWorker, createMessageAction)
        .provide([
          [select(selectors.getUsers), {selectedUserId: '1'}],
          [call.fn(MessagesApi.createMessage), message],
        ])
        .put({
          type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
          payload: message,
        })
        .run()
    })

    it('Should get error', () => {
      return expectSaga(createMessageWorker, createMessageAction)
        .provide([
          [select(selectors.getUsers), {selectedUserId: '1'}],
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
