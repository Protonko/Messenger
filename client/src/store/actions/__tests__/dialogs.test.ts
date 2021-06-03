import type  {IDialog} from 'models/dialog'
import {DialogsActionTypes} from 'models/store/actions/dialogs'
import {Status} from 'models/common/status'
import {
  getDialogs,
  getDialogsSuccess,
  getDialogsError,
  createDialog,
  createDialogError,
  createDialogSuccess,
  resetCreateDialogState,
} from 'store/actions/dialogs'

describe('Auth actions', () => {
  const dialogs: IDialog[] = [
    {
      id: 'id',
      interlocutor: {
        avatar: '',
        confirmed: false,
        email: 'foo@bar.baz',
        id: '123',
        full_name: 'name',
        createdAt: new Date('01-01-01'),
        updatedAt: new Date('01-01-01'),
        last_seen: new Date('01-01-01'),
      },
      lastMessage: 'lastMessage',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      messages: 1,
      status: Status.MUTED,
      readStatus: null,
    },
  ]

  it('Should create getDialogs', () => {
    const expectedAction = {
      type: DialogsActionTypes.GET_START,
    }

    expect(getDialogs()).toEqual(expectedAction)
  })

  it('Should create getSuccess', () => {
    const expectedAction = {
      type: DialogsActionTypes.GET_SUCCESS,
      payload: dialogs,
    }

    expect(getDialogsSuccess(dialogs)).toEqual(expectedAction)
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
      payload: dialogs[0],
    }

    expect(createDialogSuccess(dialogs[0])).toEqual(expectedAction)
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
})
