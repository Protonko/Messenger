import {shallow} from 'enzyme'
import {Counter, IPropsCounter} from 'components/common/Counter';
import {Status} from 'models/common/status';

const ELEMENT_SELECTORS = {
  counter: 'counter',
  counterMuted: 'counter--muted',
}

const shallowComponent = (props: IPropsCounter) => (
  shallow(<Counter {...props} />)
)

describe('Counter', () => {
  let props: IPropsCounter

  beforeEach(() => {
    props = {
      count: 1,
      status: Status.MUTED,
    }
  })

  it('Should render Counter component', () => {
    const component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.counter}`)
    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = shallowComponent(props)

    expect(component).toMatchSnapshot()
  })

  it('Shouldn`t find muted modifier', () => {
    props.status = undefined

    const component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.counterMuted}`)
    expect(wrapper.length).toBe(0)
  })
})
