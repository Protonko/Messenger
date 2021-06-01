import {shallow} from 'enzyme'
import {Sizes} from 'models/common/sizes'
import {IPropsLoader, Loader} from 'components/common/Loader'

const ELEMENT_SELECTORS = {
  loader: 'loader',
  loaderLarge: 'loader--large',
  loaderSmall: 'loader--small',
  loaderCenter: 'loader--center',
}

const shallowComponent = (props: IPropsLoader) => shallow(<Loader {...props} />)

describe('Loader', () => {
  let props: IPropsLoader
  beforeEach(() => {
    props = {}
  })
  it('Should render Loader component', () => {
    const component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.loader}`)
    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = shallowComponent(props)

    expect(component).toMatchSnapshot()
  })

  it('Loader large', () => {
    props.size = Sizes.LARGE
    const component = shallowComponent(props)

    expect(component.find(`.${ELEMENT_SELECTORS.loaderLarge}`).length).toBe(1)
    expect(component).toMatchSnapshot('Loader large')
  })

  it('Loader small', () => {
    props.size = Sizes.SMALL
    const component = shallowComponent(props)

    expect(component.find(`.${ELEMENT_SELECTORS.loaderSmall}`).length).toBe(1)
    expect(component).toMatchSnapshot('Loader small')
  })

  it('Loader center', () => {
    props.center = true
    const component = shallowComponent(props)

    expect(component.find(`.${ELEMENT_SELECTORS.loaderCenter}`).length).toBe(1)
    expect(component).toMatchSnapshot('Loader center')
  })
})
