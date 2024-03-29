import type {AxiosResponse} from 'axios'
import type {ICreateMessageBody, IMessage} from 'models/message'
import type {IInitialState as DialogsState} from 'store/reducers/dialogs'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {
  CreateMessageAction,
  DeleteMessagesAction,
  GetMessagesAction,
  MessageActionsTypes,
} from 'models/store/actions/message'
import {EventsSocket} from 'models/common/socket'
import {commonError} from 'store/actions/error'
import {MessagesApi} from 'api/Messages'
import {UploadApi} from 'api/Upload'
import {
  createMessageError,
  createMessageSuccess,
  deleteMessagesSuccess,
  getMessagesError,
  getMessagesSuccess,
} from 'store/actions/message'
import {errorHandler} from 'utils/errorHandler'
import {socket} from 'utils/socket'
import {selectors} from './selectors'

//get
export function* getMessagesWorker({payload: dialogId}: GetMessagesAction) {
  try {
    const messages: IMessage[] = yield call(MessagesApi.getMessages, dialogId)
    yield put(getMessagesSuccess({messages, dialogId}))
  } catch (error) {
    yield put(errorHandler(error, getMessagesError, {dialogId}))
  }
}

export function* getMessagesWatcher() {
  yield takeEvery(MessageActionsTypes.GET_MESSAGES, getMessagesWorker)
}

// post
export function* createMessageWorker({payload}: CreateMessageAction) {
  try {
    const body: ICreateMessageBody = {
      dialog: payload.dialogId,
      text: payload.text,
      interlocutor: payload.interlocutorId,
      attachment: undefined,
    }

    if (payload.attachment) {
      const formData = new FormData()
      formData.append('file', payload.attachment)

      body.attachment = yield call(UploadApi.uploadFile, formData)
    }
    const message: IMessage = yield call(MessagesApi.createMessage, body)
    yield put(createMessageSuccess(message))
  } catch (error) {
    yield put(errorHandler(error, createMessageError))
  }
}

export function* createMessageWatcher() {
  yield takeEvery(MessageActionsTypes.CREATE_MESSAGE, createMessageWorker)
}

// delete
export function* deleteMessagesWorker({payload}: DeleteMessagesAction) {
  try {
    const {dialogs}: DialogsState = yield select(selectors.getDialogs)
    const interlocutorId = yield dialogs?.find(
      (dialog) => dialog.id === payload.dialogId,
    )?.interlocutor.id

    if (!interlocutorId) {
      yield put(commonError('Dialog not found.'))
    }

    const messagesIds: string[] = yield call(
      MessagesApi.deleteMessages,
      payload.messagesIds,
    )

    yield put(deleteMessagesSuccess({messagesIds, dialogId: payload.dialogId}))
    yield socket.emit(
      EventsSocket.DELETE_MESSAGES,
      payload.messagesIds,
      interlocutorId,
      payload.dialogId,
    )
  } catch (error) {
    if ((error as AxiosResponse).data) {
      yield put(commonError(error.data.message))
    } else {
      yield put(commonError(error.message))
    }
  }
}

export function* deleteMessagesWatcher() {
  yield takeEvery(MessageActionsTypes.DELETE_MESSAGES, deleteMessagesWorker)
}
