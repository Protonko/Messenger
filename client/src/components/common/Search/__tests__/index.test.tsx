import {mount, ReactWrapper} from 'enzyme'
import {Sizes} from 'models/common/sizes'
import {Search, IPropsSearch} from 'components/common/Search'

const ELEMENT_SELECTORS = {
  search: 'search',
  custom: 'test-style',
  input: 'search__input',
}

describe('Search', () => {
  let componentMount: ReactWrapper<IPropsSearch>
  let props: IPropsSearch

  const onChange = jest.fn()
  const updateComponent = (props: IPropsSearch) => {
    componentMount = mount(<Search {...props} />)
  }

  beforeEach(() => {
    props = {}
    updateComponent(props)
  })

  it('Search without props', () => {
    expect(componentMount.find(`.${ELEMENT_SELECTORS.search}`).length).toBe(1)
    expect(componentMount).toMatchSnapshot('Search without props')
  })

  it('Search with small size', () => {
    props.size = Sizes.SMALL
    updateComponent(props)
    expect(componentMount).toMatchSnapshot('Search with small size')
  })

  it('Search with large size', () => {
    props.size = Sizes.LARGE
    updateComponent(props)
    expect(componentMount).toMatchSnapshot('Search with large size')
  })

  it('Search with custom styles', () => {
    props.customStyles = ELEMENT_SELECTORS.custom
    updateComponent(props)
    expect(componentMount.find(`.${ELEMENT_SELECTORS.custom}`).length).toBe(1)
    expect(componentMount).toMatchSnapshot('Search with custom styles')
  })

  it('Search with custom placeholder', () => {
    props.placeholder = 'test'
    updateComponent(props)
    expect(
      componentMount.find(`.${ELEMENT_SELECTORS.input}`).prop('placeholder'),
    ).toBe('test')
    expect(componentMount).toMatchSnapshot('Search with custom placeholder')
  })

  it('Should call onChange func', () => {
    props.onChange = onChange
    updateComponent(props)
    componentMount.find(`.${ELEMENT_SELECTORS.input}`).simulate('change')
    expect(onChange).toBeCalled()
  })

  it('Shouldn`t call onChange func', () => {
    componentMount.find(`.${ELEMENT_SELECTORS.input}`).simulate('change')
    expect(onChange).not.toBeCalled()
  })
})
