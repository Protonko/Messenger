import {DialogsActionTypes} from 'models/store/actions/dialogs'
import dialogs, {initialState, TDialogsReducerActions} from 'store/reducers/dialogs'
import {MessageActionsTypes} from 'models/store/actions/message'
import {DIALOG, MESSAGE} from 'static/test-mocks'

describe('Dialogs reducer', () => {
  const ACTIONS: Record<string, TDialogsReducerActions> = {
    GET_START: {
      type: DialogsActionTypes.GET_START,
    },
    GET_SUCCESS: {
      type: DialogsActionTypes.GET_SUCCESS,
      payload: [DIALOG],
    },
    GET_ERROR: {
      type: DialogsActionTypes.GET_ERROR,
      payload: 'errorMessage',
    },
    CREATE_DIALOG: {
      type: DialogsActionTypes.CREATE_DIALOG,
      payload: 'message',
    },
    CREATE_DIALOG_SUCCESS: {
      type: DialogsActionTypes.CREATE_DIALOG_SUCCESS,
      payload: DIALOG,
    },
    CREATE_DIALOG_ERROR: {
      type: DialogsActionTypes.CREATE_DIALOG_ERROR,
      payload: 'error message',
    },
    CHANGE_READ_STATUS: {
      type: DialogsActionTypes.CHANGE_READ_STATUS,
      payload: MESSAGE.dialog,
    },
    RESET_CREATE_DIALOG_STATE: {
      type: DialogsActionTypes.RESET_CREATE_DIALOG_STATE,
    },
    APPEND_MESSAGE: {
      type: MessageActionsTypes.APPEND_MESSAGE,
      payload: MESSAGE,
    },
    CREATE_MESSAGE_SUCCESS: {
      type: MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
      payload: MESSAGE,
    },
    GET_MESSAGES_SUCCESS: {
      type: MessageActionsTypes.GET_MESSAGES_SUCCESS,
      payload: {
        messages: [MESSAGE],
        dialogId: MESSAGE.dialog,
      },
    }
  }

  it('Should return the payload from GET_START action', () => {
    expect(dialogs(initialState, ACTIONS.GET_START)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('Should return the payload from GET_SUCCESS action', () => {
    expect(dialogs(initialState, ACTIONS.GET_SUCCESS)).toEqual({
      ...initialState,
      dialogs: ACTIONS.GET_SUCCESS.payload,
    })
  })

  it('Should return the payload from GET_ERROR action', () => {
    expect(dialogs(initialState, ACTIONS.GET_ERROR)).toEqual({
      ...initialState,
      errorMessage: ACTIONS.GET_ERROR.payload,
    })
  })

  it('Should return the payload from CREATE_DIALOG action', () => {
    expect(dialogs(initialState, ACTIONS.CREATE_DIALOG)).toEqual({
      ...initialState,
      creating: true,
    })
  })

  it('Should return the payload from CREATE_DIALOG_SUCCESS action', () => {
    expect(dialogs(initialState, ACTIONS.CREATE_DIALOG_SUCCESS)).toEqual({
      ...initialState,
      dialogs: [DIALOG],
      createErrorMessage: false,
    })
  })

  it('Should return the payload from CREATE_DIALOG_ERROR action', () => {
    expect(dialogs(initialState, ACTIONS.CREATE_DIALOG_ERROR)).toEqual({
      ...initialState,
      createErrorMessage: ACTIONS.CREATE_DIALOG_ERROR.payload,
    })
  })

  it('Should reset state after RESET_CREATE_DIALOG_STATE action', () => {
    expect(dialogs(initialState, ACTIONS.RESET_CREATE_DIALOG_STATE)).toEqual({
      ...initialState,
    })
  })

  it('Shouldn`t change state on APPEND_MESSAGE action', () => {
    expect(dialogs(initialState, ACTIONS.APPEND_MESSAGE)).toEqual({
      ...initialState,
    })
  })

  it('Shouldn update lastMessage on APPEND_MESSAGE action', () => {
    const dialog = {...DIALOG, id: MESSAGE.dialog}
    const state = {...initialState, dialogs: [dialog, DIALOG]}

    expect(dialogs(state, ACTIONS.APPEND_MESSAGE)).toEqual({
      ...initialState,
      dialogs: [{...dialog, lastMessage: MESSAGE}, DIALOG],
    })
  })

  it('Shouldn`t change state on CREATE_MESSAGE_SUCCESS action', () => {
    expect(dialogs(initialState, ACTIONS.CREATE_MESSAGE_SUCCESS)).toEqual({
      ...initialState,
    })
  })

  it('Should update lastMessage on CREATE_MESSAGE_SUCCESS action', () => {
    const dialog = {...DIALOG, id: MESSAGE.dialog}
    const state = {...initialState, dialogs: [dialog, DIALOG]}

    expect(dialogs(state, ACTIONS.CREATE_MESSAGE_SUCCESS)).toEqual({
      ...initialState,
      dialogs: [{...dialog, lastMessage: MESSAGE}, DIALOG],
    })
  })

  it('Shouldn`t change state on CHANGE_READ_STATUS action', () => {
    expect(dialogs(initialState, ACTIONS.CHANGE_READ_STATUS)).toEqual({
      ...initialState,
    })
  })

  it('Should update lastMessage on CHANGE_READ_STATUS action', () => {
    const dialog = {...DIALOG, id: MESSAGE.dialog}
    const state = {...initialState, dialogs: [dialog, DIALOG]}

    expect(dialogs(state, ACTIONS.CHANGE_READ_STATUS)).toEqual({
      ...initialState,
      dialogs: [{...dialog, lastMessage: {...MESSAGE, read: true}}, DIALOG],
    })
  })

  it('Shouldn`t change state on GET_MESSAGES_SUCCESS action', () => {
    expect(dialogs(initialState, ACTIONS.GET_MESSAGES_SUCCESS)).toEqual({
      ...initialState,
    })
  })

  it('Should update lastMessage on GET_MESSAGES_SUCCESS action', () => {
    const dialog = {...DIALOG, id: MESSAGE.dialog}
    const state = {...initialState, dialogs: [dialog, DIALOG]}

    expect(dialogs(state, ACTIONS.GET_MESSAGES_SUCCESS)).toEqual({
      ...initialState,
      dialogs: [{...dialog, lastMessage: {...MESSAGE, read: true}}, DIALOG],
    })
  })
})
