import {render} from 'enzyme'
import {IPropsText, Text} from 'components/common/Text'
import {TextTypes, TextWeight} from 'models/common/text'

const ELEMENT_SELECTORS = {
  text: 'text',
  paragraph: 'p',
  heading1: 'text--heading-1',
  heading2: 'text--heading-2',
  heading3: 'text--heading-3',
  heading4: 'text--heading-4',
  heading5: 'text--heading-5',
  heading6: 'text--heading-6',
  light: 'text--light',
  custom: 'custom-style',
}

const renderComponent = (props: IPropsText) => render(<Text {...props} />)

describe('Text', () => {
  let props: IPropsText

  beforeEach(() => {
    props = {
      children: 'Hello world',
    }
  })

  it('Should render Text component', () => {
    const component = renderComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.text}`)

    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = renderComponent(props)

    expect(component).toMatchSnapshot()
  })

  it('Should render <p></p>', () => {
    const component = renderComponent(props)
    const wrapper = component.find(ELEMENT_SELECTORS.paragraph)

    expect(wrapper.length).toBe(1)
  })

  it('Should render heading-1', () => {
    props.type = TextTypes.h1

    const component = renderComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.heading1}`)

    expect(wrapper.length).toBe(1)
  })

  it('Should render heading-2', () => {
    props.type = TextTypes.h2

    const component = renderComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.heading2}`)

    expect(wrapper.length).toBe(1)
  })

  it('Should render heading-3', () => {
    props.type = TextTypes.h3

    const component = renderComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.heading3}`)

    expect(wrapper.length).toBe(1)
  })

  it('Should render heading-4', () => {
    props.type = TextTypes.h4

    const component = renderComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.heading4}`)

    expect(wrapper.length).toBe(1)
  })

  it('Should render heading-5', () => {
    props.type = TextTypes.h5

    const component = renderComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.heading5}`)

    expect(wrapper.length).toBe(1)
  })

  it('Should render heading-6', () => {
    props.type = TextTypes.h6

    const component = renderComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.heading6}`)

    expect(wrapper.length).toBe(1)
  })

  it('Should render <p></p> as default value', () => {
    // @ts-ignore
    props.type = 'another type'

    const component = renderComponent(props)
    const wrapper = component.find(ELEMENT_SELECTORS.paragraph)

    expect(wrapper.length).toBe(1)
  })

  it('Should render light font weight', () => {
    props.type = TextTypes.mixed
    props.weight = TextWeight.LIGHT

    const component = renderComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.light}`)

    expect(wrapper.length).toBe(1)
  })

  it('Should render custom styles', () => {
    props.customStyles = ELEMENT_SELECTORS.custom

    const component = renderComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.custom}`)

    expect(wrapper.length).toBe(1)
  })
})
