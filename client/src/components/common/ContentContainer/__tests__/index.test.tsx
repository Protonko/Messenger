import {shallow} from 'enzyme'
import {ContentContainer, IContentContainerProps} from 'components/common/ContentContainer'
import {Loader} from 'components/common/Loader'

const ELEMENT_SELECTORS = {
  children: '[data-test="test"]',
}

const shallowComponent = (props: IContentContainerProps) => (
  shallow(<ContentContainer {...props} />)
)

describe('ContentContainer', () => {
  let props: IContentContainerProps

  beforeEach(() => {
    props = {
      errorMessage: null,
      loading: false,
      children: <div data-test="test" />,
    }
  })

  it('Should render ContentContainer component with children', () => {
    const component = shallowComponent(props)
    const wrapper = component.find(ELEMENT_SELECTORS.children)
    expect(wrapper.length).toBe(1)
    expect(component).toMatchSnapshot('ContentContainer with children')
  })

  it('Should render ContentContainer component with Loader', () => {
    props.loading = true
    const component = shallowComponent(props)
    const wrapper = component.find(Loader)
    expect(wrapper.length).toBe(1)
    expect(component).toMatchSnapshot('ContentContainer with Loader')
  })

  it('Should render ContentContainer component with error', () => {
    props.errorMessage = 'error message'
    const component = shallowComponent(props)
    expect(component).toMatchSnapshot('ContentContainer with error')
  })
})
