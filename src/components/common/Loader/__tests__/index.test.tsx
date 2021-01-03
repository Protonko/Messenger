import {shallow} from 'enzyme'
import {Loader} from 'components/common/Loader/index'

const ELEMENT_SELECTORS = {
  loader: 'loader',
}

const shallowCardComponent = () => (
  shallow(<Loader />)
)

describe('Loader', () => {
  it('Should render Loader component', () => {
    const component = shallowCardComponent()
    const wrapper = component.find(`.${ELEMENT_SELECTORS.loader}`)
    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = shallowCardComponent()

    expect(component).toMatchSnapshot()
  })
})
