import {call} from 'redux-saga-test-plan/matchers'
import {expectSaga} from 'redux-saga-test-plan'
import {throwError} from 'redux-saga-test-plan/providers'
import {select} from 'redux-saga/effects'
import {
  createDialogWatcher,
  createDialogWorker,
  getDialogsWatcher,
  getDialogsWorker,
} from 'store/saga/dialogs'
import {selectors} from 'store/saga/selectors'
import {
  CreateDialogAction,
  DialogsActionTypes,
} from 'models/store/actions/dialogs'
import {DialogsApi} from 'api/Dialogs'
import {DIALOG} from 'static/test-mocks'

describe('dialogs sagas', () => {
  describe('get dialogs', () => {
    it('Should get error "ID not found!"', () => {
      return expectSaga(getDialogsWatcher)
        .provide([[select(selectors.getAuth), {account: null}]])
        .put({
          type: DialogsActionTypes.GET_ERROR,
          payload: 'ID not found!',
        })
        .dispatch({type: DialogsActionTypes.GET_START})
        .run()
    })

    it('Should get success', () => {
      return expectSaga(getDialogsWorker)
        .provide([
          [select(selectors.getAuth), {account: {id: '123'}}],
          [call.fn(DialogsApi.getDialogs), [DIALOG]],
        ])
        .put({type: DialogsActionTypes.GET_SUCCESS, payload: [DIALOG]})
        .run()
    })

    it('Should get error', () => {
      return expectSaga(getDialogsWorker)
        .provide([
          [select(selectors.getAuth), {account: {id: '123'}}],
          [call.fn(DialogsApi.getDialogs), throwError(new Error('error'))],
        ])
        .put({type: DialogsActionTypes.GET_ERROR, payload: 'error'})
        .run()
    })
  })

  describe('create dialog', () => {
    const createDialogAction: CreateDialogAction = {
      type: DialogsActionTypes.CREATE_DIALOG,
      payload: 'message',
    }

    it('Should get error "ID not found!"', () => {
      return expectSaga(createDialogWatcher)
        .provide([
          [select(selectors.getAuth), {account: null}],
          [select(selectors.getUsers), {selectedUserId: null}],
        ])
        .put({
          type: DialogsActionTypes.CREATE_DIALOG_ERROR,
          payload: 'ID not found!',
        })
        .dispatch({type: DialogsActionTypes.CREATE_DIALOG})
        .run()
    })

    it('Should create dialog successfully', () => {
      return expectSaga(createDialogWorker, createDialogAction)
        .provide([
          [select(selectors.getAuth), {account: {id: '123'}}],
          [select(selectors.getUsers), {selectedUserId: '321'}],
          [call.fn(DialogsApi.createDialog), DIALOG],
        ])
        .put({
          type: DialogsActionTypes.CREATE_DIALOG_SUCCESS,
          payload: DIALOG,
        })
        .run()
    })

    it('Should get error', () => {
      return expectSaga(createDialogWorker, createDialogAction)
        .provide([
          [select(selectors.getAuth), {account: {id: '123'}}],
          [select(selectors.getUsers), {selectedUserId: '321'}],
          [call.fn(DialogsApi.createDialog), throwError(new Error('error'))],
        ])
        .put({
          type: DialogsActionTypes.CREATE_DIALOG_ERROR,
          payload: 'error',
        })
        .run()
    })
  })
})
