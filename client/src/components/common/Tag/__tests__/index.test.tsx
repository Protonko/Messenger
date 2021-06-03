import {shallow, ShallowWrapper} from 'enzyme'
import {Tag, ITagProps} from 'components/common/Tag'

const ELEMENT_SELECTORS = {
  tag: 'tag',
  custom: 'custom',
}

describe('Tag', () => {
  let props: ITagProps
  let component: ShallowWrapper

  beforeEach(() => {
    props = {
      text: 'test text'
    }
  })

  it('Should render Tag component', () => {
    component = shallow(<Tag {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.tag}`).length).toBe(1)
    expect(component).toMatchSnapshot('Tag')
  })

  it('Should render Tag component with custom styles', () => {
    props.customStyles = ELEMENT_SELECTORS.custom
    component = shallow(<Tag {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.tag}`).length).toBe(1)
    expect(component).toMatchSnapshot('Tag with custom styles')
  })
})
