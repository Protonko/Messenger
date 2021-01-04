import {shallow} from 'enzyme'
import image from 'assets/images/test-image.jpg'
import {Avatar, IPropsAvatar} from 'components/common/Avatar'
import {Sizes} from 'models/common/sizes'

const ELEMENT_SELECTORS = {
  avatar: 'avatar',
  avatarSmall: 'avatar--sm',
  avatarLarge: 'avatar--lg',
}

const shallowComponent = (props: IPropsAvatar) => (
  shallow(<Avatar {...props} />)
)

describe('Avatar', () => {
  let props: IPropsAvatar

  beforeEach(() => {
    props = {
      src: image,
      size: Sizes.MEDIUM
    }
  })

  it('Should render Avatar component', () => {
    const component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.avatar}`)
    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = shallowComponent(props)

    expect(component).toMatchSnapshot()
  })

  it('Shouldn`t find sm and lg modifiers', () => {
    props.size = undefined

    const component = shallowComponent(props)
    const wrapperSmall = component.find(`.${ELEMENT_SELECTORS.avatarSmall}`)
    const wrapperLarge = component.find(`.${ELEMENT_SELECTORS.avatarLarge}`)
    expect(wrapperSmall.length + wrapperLarge.length).toBe(0)
  })

  it('Should return small classname', () => {
    props.size = Sizes.SMALL

    const component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.avatarSmall}`)
    expect(wrapper.length).toBe(1)
  })

  it('Should return large classname', () => {
    props.size = Sizes.LARGE

    const component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.avatarLarge}`)
    expect(wrapper.length).toBe(1)
  })
})
