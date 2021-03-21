import {shallow} from 'enzyme'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {AuthForm} from 'components/AuthForm'

const mockStore = configureStore([])
const store = mockStore({})
const shallowComponent = () => (
  shallow(
    <Provider store={store}>
      <AuthForm/>
    </Provider>
  )
)

describe('AuthForm', () => {
  it('Match snapshot', () => {
    const component = shallowComponent()

    expect(component).toMatchSnapshot()
  })
})
