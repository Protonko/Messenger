import type {MockStoreEnhanced} from 'redux-mock-store'
import type {RootState} from 'store/reducers'
import {mount, ReactWrapper} from 'enzyme'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import {createMemoryHistory, History, Location} from 'history'
import {ErrorActionTypes} from 'models/store/actions/error'
import {MessageActionsTypes} from 'models/store/actions/message'
import {CreateMessageForm} from 'components/MessageForm/CreateMessageForm'
import {createMockStore, state} from 'static/test-mocks/store'
import {DIALOG} from 'static/test-mocks/dialog'

const ELEMENT_SELECTORS = {
  form: 'create-message-form',
  textarea: 'textarea__form',
}

describe('CreateMessageForm', () => {
  let component: (store: MockStoreEnhanced<RootState>) => ReactWrapper
  let history: History
  let stateRedux: RootState

  const historyLocation: Location = {
    pathname: '',
    search: `dialog=${DIALOG.id}`,
    hash: '',
    key: '',
    state: null,
  }

  beforeEach(() => {
    stateRedux = {...state}
    history = {
      ...createMemoryHistory(),
      push: jest.fn(),
      goBack: jest.fn(),
      go: jest.fn(),
      location: historyLocation,
    }

    component = (store) =>
      mount(
        <Provider store={store}>
          <Router history={history}>
            <CreateMessageForm />
          </Router>
        </Provider>,
      )
  })

  it('Should render component', () => {
    expect(component(createMockStore(stateRedux))).toMatchSnapshot(
      'CreateMessageForm',
    )
  })

  it('Should change input value', () => {
    const componentMount = component(createMockStore(stateRedux))
    componentMount
      .find(`.${ELEMENT_SELECTORS.textarea}`)
      .simulate('change', {target: {value: 'test'}})
    expect(
      componentMount.find(`.${ELEMENT_SELECTORS.textarea}`).prop('value'),
    ).toBe('test')
  })

  it('Should submit form', () => {
    stateRedux = {
      ...stateRedux,
      dialogs: {
        ...stateRedux.dialogs,
        dialogs: [DIALOG],
      },
    }

    const payload = {
      attachment: undefined,
      dialogId: 'id',
      interlocutorId: '123',
      text: '',
    }

    const store = createMockStore(stateRedux)
    store.dispatch = jest.fn()
    const componentMount = component(store)
    componentMount.find(`.${ELEMENT_SELECTORS.form}`).simulate('submit')
    expect(store.dispatch).toBeCalledWith({
      type: MessageActionsTypes.CREATE_MESSAGE,
      payload,
    })
  })

  it('Should submit form with error', () => {
    const store = createMockStore(stateRedux)
    store.dispatch = jest.fn()
    const componentMount = component(store)
    componentMount.find(`.${ELEMENT_SELECTORS.form}`).simulate('submit')
    expect(store.dispatch).toBeCalledWith({
      type: ErrorActionTypes.COMMON_ERROR,
      payload: 'ID not found!',
    })
  })
})
