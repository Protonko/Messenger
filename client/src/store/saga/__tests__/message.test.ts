import {expectSaga} from 'redux-saga-test-plan'
import {call} from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {select} from 'redux-saga/effects'
import {CreateMessageAction, MessageActionsTypes} from 'models/store/actions/message'
import {MessagesApi} from 'api/Messages'
import {selectors} from 'store/saga/selectors'
import {createMessageWatcher, createMessageWorker} from 'store/saga/message'

describe('message sagas', () => {
  const message = {
    read: false,
    attachments: [],
    id: 'id',
    user: 'user',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }

  const createMessageAction: CreateMessageAction = {
    type: MessageActionsTypes.CREATE_MESSAGE,
    payload: 'text',
  }

  it('Should get error "ID not found!"', () => {
    return expectSaga(createMessageWatcher)
      .provide([
        [select(selectors.getUsers), {selectedUserId: null}],
      ])
      .put({type: MessageActionsTypes.CREATE_MESSAGE_ERROR, payload: 'ID not found!'})
      .dispatch({type: MessageActionsTypes.CREATE_MESSAGE})
      .run();
  })

  it('Should create message successfully', () => {
    return expectSaga(createMessageWorker, createMessageAction)
      .provide([
        [select(selectors.getUsers), {selectedUserId: '1'}],
        [call.fn(MessagesApi.createMessage), message]
      ])
      .put({type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS, payload: message})
      .run();
  })

  it('Should get error', () => {
    return expectSaga(createMessageWorker, createMessageAction)
      .provide([
        [select(selectors.getUsers), {selectedUserId: '1'}],
        [call.fn(MessagesApi.createMessage), throwError(new Error('error'))]
      ])
      .put({type: MessageActionsTypes.CREATE_MESSAGE_ERROR, payload: 'error'})
      .run();
  })
})
