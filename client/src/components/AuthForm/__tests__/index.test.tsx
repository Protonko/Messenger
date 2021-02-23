import {shallow} from 'enzyme'
import {Provider} from 'react-redux'
import store from 'store';
import {AuthForm} from 'components/AuthForm'

const shallowComponent = () => (
  shallow(<Provider store={store}><AuthForm /></Provider>)
)

describe('AuthForm', () => {
  // beforeEach(() => {
  //   props = {}
  // })

  it('Match snapshot', () => {
    const component = shallowComponent()

    expect(component).toMatchSnapshot()
  })
}
)
