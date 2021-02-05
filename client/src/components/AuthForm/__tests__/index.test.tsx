import {shallow} from 'enzyme'
import {AuthForm, IPropsAuthForm} from 'components/AuthForm'

const shallowComponent = (props: IPropsAuthForm) => (
  shallow(<AuthForm {...props} />)
)

describe('AuthForm', () => {
  let props: IPropsAuthForm

  // beforeEach(() => {
  //   props = {}
  // })

  it('Match snapshot', () => {
    const component = shallowComponent(props)

    expect(component).toMatchSnapshot()
  })
}
)
