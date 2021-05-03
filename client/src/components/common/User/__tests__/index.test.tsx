import {User, IPropsUser} from 'components/common/User'
import {mount, ReactWrapper} from 'enzyme'

const ELEMENT_SELECTORS = {
  user: 'user',
  description: 'user__data-description',
  custom: 'custom',
}

describe('User', () => {
  let component: ReactWrapper<IPropsUser>
  let props: IPropsUser

  beforeEach(() => {
    props = {
      name: 'Test Name',
      src: 'test/src',
    }
  })

  it('Should render User component', () => {
    component = mount(<User {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.user}`).length).toBe(1)
    expect(component).toMatchSnapshot('User')
  })

  it('Should render User component with description', () => {
    props.description = 'test description'
    component = mount(<User {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.description}`).text()).toBe(props.description)
    expect(component).toMatchSnapshot('User with description')
  })

  it('Should render User component with custom styles', () => {
    props.customStyles = ELEMENT_SELECTORS.custom
    component = mount(<User {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.custom}`).length).toBe(1)
    expect(component).toMatchSnapshot('User with custom styles')
  })
})
