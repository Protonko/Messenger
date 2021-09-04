import {expectSaga, SagaType} from 'redux-saga-test-plan'
import {call} from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {select} from 'redux-saga/effects'
import {
  CreateMessageAction,
  DeleteMessagesAction,
  GetMessagesAction,
  ICreateMessagePayload,
  MessageActionsTypes,
} from 'models/store/actions/message'
import {MessagesApi} from 'api/Messages'
import {UploadApi} from 'api/Upload'
import {
  createMessageWatcher,
  createMessageWorker,
  deleteMessagesWatcher,
  deleteMessagesWorker,
  getMessagesWatcher,
  getMessagesWorker,
} from 'store/saga/message'
import {selectors} from 'store/saga/selectors'
import {ErrorActionTypes} from '../../../models/store/actions/error'
import type {AxiosError} from 'axios'
import {AxiosRequestConfig, AxiosResponse} from 'axios'
import {MESSAGE} from '../../../static/test-mocks/message'
import {DIALOG} from '../../../static/test-mocks/dialog'

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

  describe('delete messages', () => {
    const deleteMessagesAction: DeleteMessagesAction = {
      type: MessageActionsTypes.DELETE_MESSAGES,
      payload: {
        messagesIds: [MESSAGE.id],
        dialogId: DIALOG.id,
      },
    }

    it('Should delete messages', () => {
      return expectSaga(deleteMessagesWatcher)
        .provide([
          [select(selectors.getDialogs), {dialogs: [DIALOG]}],
          [call.fn(MessagesApi.deleteMessages), [MESSAGE.id]],
        ])
        .put({
          type: MessageActionsTypes.DELETE_MESSAGES_SUCCESS,
          payload: deleteMessagesAction.payload,
        })
        .dispatch(deleteMessagesAction)
        .run()
    })

    it('Should delete message successfully', () => {
      return expectSaga(deleteMessagesWorker as SagaType, deleteMessagesAction)
        .provide([
          [select(selectors.getDialogs), {dialogs: [DIALOG]}],
          [call.fn(MessagesApi.deleteMessages), [MESSAGE.id]],
        ])
        .put({
          type: MessageActionsTypes.DELETE_MESSAGES_SUCCESS,
          payload: deleteMessagesAction.payload,
        })
        .run()
    })

    it('Should get error', () => {
      return expectSaga(deleteMessagesWorker as SagaType, deleteMessagesAction)
        .provide([
          [select(selectors.getDialogs), {dialogs: [DIALOG]}],
          [call.fn(MessagesApi.deleteMessages), throwError(new Error('error'))],
        ])
        .put({
          type: ErrorActionTypes.COMMON_ERROR,
          payload: 'error',
        })
        .run()
    })

    it('Should get error because dialogs are empty', () => {
      return expectSaga(deleteMessagesWorker as SagaType, deleteMessagesAction)
        .provide([
          [select(selectors.getDialogs), {dialogs: null}],
          [call.fn(MessagesApi.deleteMessages), [MESSAGE.id]],
        ])
        .put({
          type: ErrorActionTypes.COMMON_ERROR,
          payload: 'Dialog not found.',
        })
        .run()
    })

    it('Should get axios error', () => {
      const axiosResponse: AxiosResponse<Error> = {
        data: {
          name: 'Error',
          message: 'axios error',
        },
        status: 400,
        statusText: 'Error',
        headers: '',
        config: {},
      }
      return expectSaga(deleteMessagesWorker as SagaType, deleteMessagesAction)
        .provide([
          [select(selectors.getDialogs), {dialogs: [DIALOG]}],
          // @ts-ignore
          [call.fn(MessagesApi.deleteMessages), throwError(axiosResponse)],
        ])
        .put({
          type: ErrorActionTypes.COMMON_ERROR,
          payload: 'axios error',
        })
        .run()
    })
  })
})
