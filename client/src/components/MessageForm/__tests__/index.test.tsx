import {mount, ReactWrapper} from 'enzyme'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import {createMemoryHistory, History, Location} from 'history'
import {MessageForm} from 'components/MessageForm'
import {DeleteMessageForm} from 'components/MessageForm/DeleteMessageForm'
import {CreateMessageForm} from 'components/MessageForm/CreateMessageForm'
import {ChatContext, IChatContext} from 'context/ChatContext'
import {DIALOG} from 'static/test-mocks/dialog'
import {createMockStore, state} from 'static/test-mocks/store'

describe('MessageForm', () => {
  let component: (contextValue: IChatContext) => ReactWrapper
  let history: History
  let contextValue: IChatContext

  const historyLocation: Location = {
    pathname: '',
    search: `dialog=${DIALOG.id}`,
    hash: '',
    key: '',
    state: null,
  }

  beforeEach(() => {
    history = {
      ...createMemoryHistory(),
      push: jest.fn(),
      goBack: jest.fn(),
      go: jest.fn(),
      location: historyLocation,
    }

    contextValue = {
      selectedMessagesIds: ['123'],
      toggleSelectMessageId: jest.fn(),
      resetSelectedMessagesIds: jest.fn(),
    }

    component = (contextValue) => {
      return mount(
        <Provider store={createMockStore(state)}>
          <Router history={history}>
            <ChatContext.Provider value={contextValue}>
              <MessageForm />
            </ChatContext.Provider>
          </Router>
        </Provider>,
      )
    }
  })

  it('Should render DeleteMessageForm component', () => {
    const componentMount = component(contextValue)

    expect(componentMount.find(DeleteMessageForm).length).toBe(1)
    expect(componentMount.find(CreateMessageForm).length).toBe(0)
    expect(componentMount).toMatchSnapshot('MessageForm with DeleteMessageForm')
  })

  it('Should render CreateMessageForm component', () => {
    contextValue.selectedMessagesIds = []
    const componentMount = component(contextValue)

    expect(componentMount.find(DeleteMessageForm).length).toBe(0)
    expect(componentMount.find(CreateMessageForm).length).toBe(1)
    expect(componentMount).toMatchSnapshot('MessageForm with CreateMessageForm')
  })
})
