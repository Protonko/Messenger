import type {ICreateMessageBody, IMessage} from 'models/message'
import {call, put, takeEvery} from 'redux-saga/effects'
import {
  CreateMessageAction,
  GetMessagesAction,
  MessageActionsTypes,
} from 'models/store/actions/message'
import {MessagesApi} from 'api/Messages'
import {
  createMessageError,
  createMessageSuccess,
  getMessagesError,
  getMessagesSuccess,
} from 'store/actions/message'
import {errorHandler} from 'utils/errorHandler'

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
