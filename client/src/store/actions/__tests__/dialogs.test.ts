import {DialogsActionTypes} from 'models/store/actions/dialogs'
import {Status} from 'models/common/status'
import {getDialogs, getDialogsSuccess, getDialogsError} from 'store/actions/dialogs'

describe('Auth actions', () => {
  const dialogs = [{
    id: 'id',
    name: 'name',
    lastMessage: 'lastMessage',
    avatar: 'avatar',
    edited: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    messages: 1,
    status: Status.MUTED,
    readStatus: null,
  }]

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
      payload: 'errorMessage'
    }

    expect(getDialogsError('errorMessage')).toEqual(expectedAction)
  })
})
