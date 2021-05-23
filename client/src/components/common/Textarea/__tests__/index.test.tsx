import {shallow} from 'enzyme'
import {Textarea, IPropsTextarea} from 'components/common/Textarea'

const ELEMENT_SELECTORS = {
  textarea: 'textarea',
  custom: 'custom-class-name',
  form: 'textarea__form',
}

const shallowComponent = (props: IPropsTextarea) => (
  shallow(<Textarea {...props} />)
)

describe('Textarea', () => {
  let props: IPropsTextarea

  beforeEach(() => {
    props = {
      value: '',
      onChange: jest.fn(),
    }
  })

  it('Should render Textarea component', () => {
    const component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.textarea}`)
    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = shallowComponent(props)

    expect(component).toMatchSnapshot('Textarea')
  })

  it('Should render Textarea with custom class name', () => {
    props.className = ELEMENT_SELECTORS.custom
    const component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.custom}`)
    expect(wrapper.length).toBe(1)
    expect(component).toMatchSnapshot('Textarea with custom className')
  })

  it('Should call onChange func', () => {
    const component = shallowComponent(props)
    const form = component.find(`.${ELEMENT_SELECTORS.form}`)
    form.simulate('change', {target: {value: 'test'}})
    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toBeCalledWith('test')
  })
})
