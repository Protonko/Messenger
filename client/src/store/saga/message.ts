import type {ICreateMessageBody, IMessage} from 'models/message'
import type {IInitialState as UsersState} from 'store/reducers/users'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {CreateMessageAction, MessageActionsTypes} from 'models/store/actions/message'
import {MessagesApi} from 'api/Messages'
import {createMessageError, createMessageSuccess} from 'store/actions/message'
import {selectors} from './selectors'

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
  } catch (e) {
    yield put(createMessageError(e))
  }
}

export function* createMessageWatcher() {
  yield takeEvery(MessageActionsTypes.CREATE_MESSAGE, createMessageWorker)
}
