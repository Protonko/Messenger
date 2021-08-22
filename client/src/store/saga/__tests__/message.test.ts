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
import {UploadApi} from '../../../api/Upload'

describe('message sagas', () => {
  let createMessagePayload: ICreateMessagePayload
  let createMessageAction: CreateMessageAction

  beforeEach(() => {
    createMessagePayload = {
      dialogId: 'userId',
      interlocutorId: 'interlocutorId',
      text: 'text',
      attachment: undefined,
    }

    createMessageAction = {
      type: MessageActionsTypes.CREATE_MESSAGE,
      payload: createMessagePayload,
    }
  })

  describe('create message', () => {
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

    it('Should create message with attachment', () => {
      const file = new File([], 'filename')
      const message = {...MESSAGE, attachment: file}
      createMessagePayload.attachment = file

      return expectSaga(createMessageWatcher)
        .provide([
          [call.fn(MessagesApi.createMessage), message],
          [call.fn(UploadApi.uploadFile), file],
        ])
        .put({
          type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
          payload: message,
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
