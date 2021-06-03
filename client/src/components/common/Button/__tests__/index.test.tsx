import {shallow} from 'enzyme'
import {Button, ButtonModifier, IPropsButton} from 'components/common/Button'

const ELEMENT_SELECTORS = {
  button: 'button',
  text: 'button__text',
  icon: 'button__icon',
  leftAddons: 'left-addons',
  rightAddons: 'right-addons',
  disabled: 'button--disabled',
  bordered: 'button--bordered',
  additionalClassName: 'additional-class-name',
}

const shallowComponent = (props: IPropsButton) => shallow(<Button {...props} />)

describe('Button', () => {
  let props: IPropsButton = {}
  let eventFn = jest.fn()

  it('Should render Button component', () => {
    const component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.button}`)

    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = shallowComponent(props)

    expect(component).toMatchSnapshot()
  })

  it('Should render text', () => {
    props.text = 'text'

    const component = shallowComponent(props)
    const text = component.find(`.${ELEMENT_SELECTORS.text}`)

    expect(text.length).toBe(1)
  })

  it('Should render leftAddons', () => {
    props.leftAddons = <div className={ELEMENT_SELECTORS.leftAddons} />

    const component = shallowComponent(props)
    const leftAddons = component.find(`.${ELEMENT_SELECTORS.leftAddons}`)

    expect(leftAddons.length).toBe(1)
  })

  it('Should render rightAddons', () => {
    props.rightAddons = <div className={ELEMENT_SELECTORS.rightAddons} />

    const component = shallowComponent(props)
    const rightAddons = component.find(`.${ELEMENT_SELECTORS.rightAddons}`)

    expect(rightAddons.length).toBe(1)
  })

  it('Should render icon', () => {
    props.icon = <div />

    const component = shallowComponent(props)
    const icon = component.find(`.${ELEMENT_SELECTORS.icon}`)

    expect(icon.length).toBe(1)
  })

  it(`Should add ${ELEMENT_SELECTORS.disabled} className for button`, () => {
    props.disabled = true

    const component = shallowComponent(props)
    const disabled = component.find(`.${ELEMENT_SELECTORS.disabled}`)

    expect(disabled.length).toBe(1)
  })

  it(`Should add ${ELEMENT_SELECTORS.bordered} className for button`, () => {
    props.modifier = ButtonModifier.BORDERED

    const component = shallowComponent(props)
    const bordered = component.find(`.${ELEMENT_SELECTORS.bordered}`)

    expect(bordered.length).toBe(1)
  })

  it(`Should add ${ELEMENT_SELECTORS.additionalClassName} className for button`, () => {
    props.additionalClassName = ELEMENT_SELECTORS.additionalClassName

    const component = shallowComponent(props)
    const additionalClassName = component.find(
      `.${ELEMENT_SELECTORS.additionalClassName}`,
    )

    expect(additionalClassName.length).toBe(1)
  })

  it('Should have type `button`', () => {
    const component = shallowComponent(props)
    const type = component.prop('type')

    expect(type).toBe('button')
  })

  it('Should have disabled attribute', () => {
    props.disabled = true
    props.onClick = eventFn

    const component = shallowComponent(props)
    const disabled = component.prop('disabled')

    expect(disabled).toBe(true)
  })

  it('Should call `onClick` callback after button was clicked', () => {
    props.onClick = eventFn

    const component = shallowComponent(props)
    component.simulate('click')

    expect(eventFn).toHaveBeenCalledTimes(1)
  })

  it('Should call `onFocus` callback after button was focused', () => {
    props.onFocus = eventFn

    const component = shallowComponent(props)
    component.simulate('focus')

    expect(eventFn).toHaveBeenCalledTimes(1)
  })

  it('Should call `onBlur` callback after button was blurred', () => {
    props.onBlur = eventFn

    const component = shallowComponent(props)
    component.simulate('blur')

    expect(eventFn).toHaveBeenCalledTimes(1)
  })

  it('Should call `onMouseEnter` callback after button was hovered', () => {
    props.onMouseEnter = eventFn

    const component = shallowComponent(props)
    component.simulate('mouseEnter')

    expect(eventFn).toHaveBeenCalledTimes(1)
  })

  it('Should call `onMouseLeave` callback after button was left by cursor', () => {
    props.onMouseLeave = eventFn

    const component = shallowComponent(props)
    component.simulate('mouseLeave')

    expect(eventFn).toHaveBeenCalledTimes(1)
  })

  it('Should call `onMouseDown` callback after button was pressed', () => {
    props.onMouseDown = eventFn

    const component = shallowComponent(props)
    component.simulate('mouseDown')

    expect(eventFn).toHaveBeenCalledTimes(1)
  })

  it('Should call `onMouseUp` callback after button was unpressed', () => {
    props.onMouseUp = eventFn

    const component = shallowComponent(props)
    component.simulate('mouseUp')

    expect(eventFn).toHaveBeenCalledTimes(1)
  })
})
