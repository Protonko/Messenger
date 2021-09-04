import type {MockStoreEnhanced} from 'redux-mock-store'
import type {RootState} from 'store/reducers'
import {mount, ReactWrapper} from 'enzyme'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import {createMemoryHistory, History, Location} from 'history'
import {MessageActionsTypes} from 'models/store/actions/message'
import {DeleteMessageForm} from 'components/MessageForm/DeleteMessageForm'
import {ChatContext, IChatContext} from 'context/ChatContext'
import {DIALOG} from 'static/test-mocks/dialog'
import {createMockStore, state} from 'static/test-mocks/store'

const ELEMENT_SELECTORS = {
  deleteButton: 'delete-message-form__button--delete',
}

describe('DeleteMessageForm', () => {
  let component: (store: MockStoreEnhanced<RootState>) => ReactWrapper
  let history: History

  const historyLocation: Location = {
    pathname: '',
    search: `dialog=${DIALOG.id}`,
    hash: '',
    key: '',
    state: null,
  }

  const contextValue: IChatContext = {
    selectedMessagesIds: ['123'],
    toggleSelectMessageId: jest.fn(),
    resetSelectedMessagesIds: jest.fn(),
  }

  beforeEach(() => {
    history = {
      ...createMemoryHistory(),
      push: jest.fn(),
      goBack: jest.fn(),
      go: jest.fn(),
      location: historyLocation,
    }

    component = (store) => {
      return mount(
        <Provider store={store}>
          <Router history={history}>
            <ChatContext.Provider value={contextValue}>
              <DeleteMessageForm />
            </ChatContext.Provider>
          </Router>
        </Provider>,
      )
    }
  })

  it('Should render component', () => {
    expect(component(createMockStore(state))).toMatchSnapshot(
      'DeleteMessageForm',
    )
  })

  it('Should call dispatch on delete button click', () => {
    const payload = {
      messagesIds: ['123'],
      dialogId: 'id',
    }

    const store = createMockStore(state)
    store.dispatch = jest.fn()
    const componentMount = component(store)
    componentMount.find(`.${ELEMENT_SELECTORS.deleteButton}`).simulate('click')

    expect(store.dispatch).toBeCalledWith({
      type: MessageActionsTypes.DELETE_MESSAGES,
      payload,
    })
  })
})
