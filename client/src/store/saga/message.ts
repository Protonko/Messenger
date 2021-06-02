import type {ICreateMessageBody, IMessage} from 'models/message'
import type {IInitialState as UsersState} from 'store/reducers/users'
import {call, put, select, takeEvery} from 'redux-saga/effects'
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
    const {selectedUserId}: UsersState = yield select(selectors.getUsers)

    if (selectedUserId) {
      const body: ICreateMessageBody = {
        id: selectedUserId,
        text: payload,
      }

      const message: IMessage = yield call(MessagesApi.createMessage, body)
      yield put(createMessageSuccess(message))
    } else {
      yield put(createMessageError('ID not found!'))
    }
  } catch (error) {
    yield put(errorHandler(error, createMessageError))
  }
}

export function* createMessageWatcher() {
  yield takeEvery(MessageActionsTypes.CREATE_MESSAGE, createMessageWorker)
}
