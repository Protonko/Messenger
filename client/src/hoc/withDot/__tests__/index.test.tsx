import {render} from 'enzyme'
import {IPropsText, Text} from 'components/common/Text'
import {withDot} from 'hoc/withDot'

const ELEMENT_SELECTORS = {
  text: 'text',
}

const DotComponent = withDot(Text)

const renderComponent = (props: IPropsText) =>
  render(<DotComponent {...props} />)

describe('withDot', () => {
  let props: IPropsText

  beforeEach(() => {
    props = {
      children: 'Hello world',
      numberOfLines: 1,
    }
  })

  it('Should render Text component wrapped withDot', () => {
    const component = renderComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.text}`)

    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = renderComponent(props)

    expect(component).toMatchSnapshot()
  })
})
