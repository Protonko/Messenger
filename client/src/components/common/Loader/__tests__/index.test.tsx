import {shallow} from 'enzyme'
import {Loader} from 'components/common/Loader'

const ELEMENT_SELECTORS = {
  loader: 'loader',
}

const shallowComponent = () => (
  shallow(<Loader />)
)

describe('Loader', () => {
  it('Should render Loader component', () => {
    const component = shallowComponent()
    const wrapper = component.find(`.${ELEMENT_SELECTORS.loader}`)
    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = shallowComponent()

    expect(component).toMatchSnapshot()
  })
})
