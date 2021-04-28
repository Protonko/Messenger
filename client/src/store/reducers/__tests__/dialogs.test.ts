import {Status} from 'models/common/status'
import {AllDialogsActions, DialogsActionTypes} from 'models/store/actions/dialogs'
import dialogs, {initialState} from 'store/reducers/dialogs'

describe('Dialogs reducer', () => {
  const ACTIONS: Record<string, AllDialogsActions> = {
    GET_START: {
      type: DialogsActionTypes.GET_START,
    },
    GET_SUCCESS: {
      type: DialogsActionTypes.GET_SUCCESS,
      payload: [{
        id: 'id',
        name: 'name',
        lastMessage: 'lastMessage',
        avatar: '',
        edited: false,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        messages: 1,
        status: Status.ACTIVE,
        readStatus: null,
      }],
    },
    GET_ERROR: {
      type: DialogsActionTypes.GET_ERROR,
      payload: 'errorMessage',
    },
  }

  it('Should return the payload from GET_START action', () => {
    expect(dialogs(initialState, ACTIONS.GET_START)).toEqual(
      {
        ...initialState,
        loading: true,
      },
    )
  })

  it('Should return the payload from GET_SUCCESS action', () => {
    expect(dialogs(initialState, ACTIONS.GET_SUCCESS)).toEqual(
      {
        ...initialState,
        dialogs: ACTIONS.GET_SUCCESS.payload,
      },
    )
  })

  it('Should return the payload from GET_ERROR action', () => {
    expect(dialogs(initialState, ACTIONS.GET_ERROR)).toEqual(
      {
        ...initialState,
        errorMessage: ACTIONS.GET_ERROR.payload,
      },
    )
  })
})
