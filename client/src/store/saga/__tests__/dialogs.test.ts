import {call} from 'redux-saga-test-plan/matchers'
import {expectSaga} from 'redux-saga-test-plan'
import {throwError} from 'redux-saga-test-plan/providers'
import {select} from 'redux-saga/effects'
import {getDialogsWatcher, getDialogsWorker} from 'store/saga/dialogs'
import {selectors} from 'store/saga/selectors'
import {DialogsActionTypes} from 'models/store/actions/dialogs'
import {DialogsApi} from 'api/Dialogs'
import {Status} from 'models/common/status'

describe('dialogs sagas', () => {
  const dialogs = [{
    id: '123',
    name: 'name',
    lastMessage: 'last message',
    avatar: '',
    edited: false,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    messages: 1,
    status: Status.MUTED,
    readStatus: null,
  }]

  it('Should get error "ID not found!"', () => {
    return expectSaga(getDialogsWatcher)
      .provide([
        [select(selectors.getAuth), {account: null}],
      ])
      .put({type: DialogsActionTypes.GET_ERROR, payload: 'ID not found!'})
      .dispatch({type: DialogsActionTypes.GET_START})
      .run();
  })

  it('Should get success', () => {
    return expectSaga(getDialogsWorker)
      .provide([
        [select(selectors.getAuth), {account: {id: '123'}}],
        [call.fn(DialogsApi.getDialogs), dialogs]
      ])
      .put({type: DialogsActionTypes.GET_SUCCESS, payload: dialogs})
      .run();
  })

  it('Should get error', () => {
    return expectSaga(getDialogsWorker)
      .provide([
        [select(selectors.getAuth), {account: {id: '123'}}],
        [call.fn(DialogsApi.getDialogs), throwError(new Error('error'))]
      ])
      .put({type: DialogsActionTypes.GET_ERROR, payload: 'error'})
      .run();
  })
})
