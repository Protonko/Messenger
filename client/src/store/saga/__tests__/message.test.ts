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
import {MESSAGE} from 'static/test-mocks'

describe('message sagas', () => {
  const createMessagePayload: ICreateMessagePayload = {
    dialogId: 'userId',
    interlocutorId: 'interlocutorId',
    text: 'text',
  }

  describe('create message', () => {
    const createMessageAction: CreateMessageAction = {
      type: MessageActionsTypes.CREATE_MESSAGE,
      payload: createMessagePayload,
    }

    it('Should create message', () => {
      return expectSaga(createMessageWatcher)
        .provide([[call.fn(MessagesApi.createMessage), MESSAGE]])
        .put({
          type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
          payload: MESSAGE,
        })
        .dispatch(createMessageAction)
        .run()
    })

    it('Should create message successfully', () => {
      return expectSaga(createMessageWorker, createMessageAction)
        .provide([[call.fn(MessagesApi.createMessage), MESSAGE]])
        .put({
          type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
          payload: MESSAGE,
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
        .provide([[call.fn(MessagesApi.getMessages), [MESSAGE]]])
        .put({
          type: MessageActionsTypes.GET_MESSAGES_SUCCESS,
          payload: {
            messages: [MESSAGE],
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
