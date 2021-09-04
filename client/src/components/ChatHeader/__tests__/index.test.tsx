import type {RootState} from 'store/reducers'
import {mount, ReactWrapper} from 'enzyme'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import {createMemoryHistory, History, Location} from 'history'
import {ChatHeader, IChatHeaderProps} from 'components/ChatHeader'
import {createMockStore, state} from 'static/test-mocks/store'
import {DIALOG} from 'static/test-mocks/dialog'

describe('ChatHeader', () => {
  let component: (state?: RootState) => ReactWrapper<IChatHeaderProps>
  let history: History

  const historyLocation: Location = {
    pathname: '',
    search: `dialog=${DIALOG.id}`,
    hash: '',
    key: '',
    state: null,
  }
  const props: IChatHeaderProps = {
    onPhoneClick: jest.fn(),
  }

  beforeEach(() => {
    history = {
      ...createMemoryHistory(),
      push: jest.fn(),
      goBack: jest.fn(),
      go: jest.fn(),
      location: historyLocation,
    }

    component = (stateArg = state) =>
      mount(
        <Provider store={createMockStore(stateArg)}>
          <Router history={history}>
            <ChatHeader {...props} />
          </Router>
        </Provider>,
      )
  })

  it('Should render component', () => {
    expect(component()).toMatchSnapshot('ChatHeader')
  })

  it('Should render component with interlocutor', () => {
    state.dialogs.dialogs = [DIALOG]
    expect(component(state)).toMatchSnapshot('ChatHeader with interlocutor')
  })
})
