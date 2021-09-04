import {DialogsActionTypes} from 'models/store/actions/dialogs'
import {
  getDialogs,
  getDialogsSuccess,
  getDialogsError,
  createDialog,
  createDialogError,
  createDialogSuccess,
  resetCreateDialogState,
  changeReadStatus,
  updateLastMessage,
  appendDialog,
} from 'store/actions/dialogs'
import {DIALOG} from '../../../static/test-mocks/dialog'

describe('Dialog actions', () => {
  it('Should create getDialogs', () => {
    const expectedAction = {
      type: DialogsActionTypes.GET_START,
    }

    expect(getDialogs()).toEqual(expectedAction)
  })

  it('Should create getSuccess', () => {
    const expectedAction = {
      type: DialogsActionTypes.GET_SUCCESS,
      payload: [DIALOG],
    }

    expect(getDialogsSuccess([DIALOG])).toEqual(expectedAction)
  })

  it('Should create getError', () => {
    const expectedAction = {
      type: DialogsActionTypes.GET_ERROR,
      payload: 'errorMessage',
    }

    expect(getDialogsError('errorMessage')).toEqual(expectedAction)
  })

  it('Should create createDialog', () => {
    const expectedAction = {
      type: DialogsActionTypes.CREATE_DIALOG,
      payload: 'message',
    }

    expect(createDialog('message')).toEqual(expectedAction)
  })

  it('Should create createDialogSuccess', () => {
    const expectedAction = {
      type: DialogsActionTypes.CREATE_DIALOG_SUCCESS,
      payload: DIALOG,
    }

    expect(createDialogSuccess(DIALOG)).toEqual(expectedAction)
  })

  it('Should create createDialogError', () => {
    const expectedAction = {
      type: DialogsActionTypes.CREATE_DIALOG_ERROR,
      payload: 'message',
    }

    expect(createDialogError('message')).toEqual(expectedAction)
  })

  it('Should create resetCreateDialogState', () => {
    const expectedAction = {
      type: DialogsActionTypes.RESET_CREATE_DIALOG_STATE,
    }

    expect(resetCreateDialogState()).toEqual(expectedAction)
  })

  it('Should create changeReadStatus', () => {
    const expectedAction = {
      type: DialogsActionTypes.CHANGE_READ_STATUS,
      payload: 'dialog_id',
    }

    expect(changeReadStatus('dialog_id')).toEqual(expectedAction)
  })

  it('Should create updateLastMessage', () => {
    const expectedAction = {
      type: DialogsActionTypes.UPDATE_LAST_MESSAGE,
      payload: DIALOG,
    }

    expect(updateLastMessage(DIALOG)).toEqual(expectedAction)
  })

  it('Should create appendDialog', () => {
    const expectedAction = {
      type: DialogsActionTypes.APPEND_DIALOG,
      payload: DIALOG,
    }

    expect(appendDialog(DIALOG)).toEqual(expectedAction)
  })
})
