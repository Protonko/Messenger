import {shallow} from 'enzyme'
import {Input, IPropsInput} from 'components/common/Input'

const ELEMENT_SELECTORS = {
  input: 'input',
  label: 'input__label',
  inputForm: 'input__form',
  inputWithValue: 'input--has-value',
}

const shallowComponent = (props: IPropsInput) => (
  shallow(<Input {...props} />)
)

describe('Input', () => {
  let props: IPropsInput
  let text: string;

  beforeEach(() => {
    props = {
      onChange: (event) => {
        text = event.target.value;
      },
    }
  })

  it('Should render Input component', () => {
    const component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.input}`)
    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = shallowComponent(props)

    expect(component).toMatchSnapshot()
  })

  it('Shouldn`t render label', () => {
    props.withLabel = false

    const component = shallowComponent(props)
    const label = component.find(`.${ELEMENT_SELECTORS.label}`)

    expect(label.length).toBe(0)
  })

  it('Should render placeholder', () => {
    props.withLabel = false
    props.placeholder = 'placeholder'

    const component = shallowComponent(props)
    const input = component.find(`.${ELEMENT_SELECTORS.inputForm}`)
    const placeholder = input.prop('placeholder')

    expect(placeholder).toBe('placeholder')
  })

  it('Value should be "test"', () => {
    props.value = 'test'

    const component = shallowComponent(props)
    const input = component.find(`.${ELEMENT_SELECTORS.inputForm}`)
    const value = input.prop('value')

    expect(value).toBe('test')
  })

  it('Should change value to "test changed"', () => {
    const component = shallowComponent(props)
    const input = component.find(`.${ELEMENT_SELECTORS.inputForm}`)

    input.simulate('change', {target: {value: 'test changed'}})

    expect(text).toBe('test changed')
  })

  it(
    `Input should contains className: ${ELEMENT_SELECTORS.inputWithValue}`,
    () => {
      props.value = 'test'

      const component = shallowComponent(props)
      const input = component.find(`.${ELEMENT_SELECTORS.inputWithValue}`)

      expect(input.length).toBe(1)
  })
})
