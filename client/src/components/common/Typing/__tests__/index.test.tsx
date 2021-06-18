import {shallow, ShallowWrapper} from 'enzyme'
import {Sizes} from 'models/common/sizes'
import {IPropsTyping, Typing} from 'components/common/Typing'

const ELEMENT_SELECTORS = {
  typing: 'typing',
  custom: 'custom',
  large: 'typing--large',
  small: 'typing--small',
}

describe('Typing', () => {
  let props: IPropsTyping
  let component: ShallowWrapper

  beforeEach(() => {
    props = {}
  })

  it('Should render Typing component', () => {
    component = shallow(<Typing {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.typing}`).length).toBe(1)
    expect(component).toMatchSnapshot('Typing')
  })

  it('Should render Typing component with custom styles', () => {
    props.customStyles = ELEMENT_SELECTORS.custom
    component = shallow(<Typing {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.typing}`).length).toBe(1)
    expect(component).toMatchSnapshot('Typing with custom styles')
  })

  it('Should render large Typing component', () => {
    props.size = Sizes.LARGE
    component = shallow(<Typing {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.large}`).length).toBe(1)
    expect(component).toMatchSnapshot('Typing large')
  })

  it('Should render small Typing component', () => {
    props.size = Sizes.SMALL
    component = shallow(<Typing {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.small}`).length).toBe(1)
    expect(component).toMatchSnapshot('Typing small')
  })
})
