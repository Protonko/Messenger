import {shallow, ShallowWrapper} from 'enzyme'
import image from 'assets/images/test-image.jpg'
import {Avatar, IPropsAvatar} from 'components/common/Avatar'
import {Sizes} from 'models/common/sizes'

const ELEMENT_SELECTORS = {
  avatar: 'avatar',
  avatarSmall: 'avatar--sm',
  avatarLarge: 'avatar--lg',
  avatarText: 'avatar__text',
}

const shallowComponent = (props: IPropsAvatar) => (
  shallow(<Avatar {...props} />)
)

describe('Avatar', () => {
  let props: IPropsAvatar
  let component: ShallowWrapper<IPropsAvatar>

  beforeEach(() => {
    component = shallowComponent(props)
    props = {
      src: image,
      size: Sizes.MEDIUM
    }
  })

  it('Should render Avatar component', () => {
    const wrapper = component.find(`.${ELEMENT_SELECTORS.avatar}`)
    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('Shouldn`t find sm and lg modifiers', () => {
    props.size = undefined
    component = shallowComponent(props)

    const wrapperSmall = component.find(`.${ELEMENT_SELECTORS.avatarSmall}`)
    const wrapperLarge = component.find(`.${ELEMENT_SELECTORS.avatarLarge}`)
    expect(wrapperSmall.length + wrapperLarge.length).toBe(0)
  })

  it('Should return small classname', () => {
    props.size = Sizes.SMALL
    component = shallowComponent(props)

    expect(component.find(`.${ELEMENT_SELECTORS.avatarSmall}`).length).toBe(1)
  })

  it('Should return large classname', () => {
    props.size = Sizes.LARGE
    component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.avatarLarge}`)
    expect(wrapper.length).toBe(1)
  })

  it('Should return avatar placeholder', () => {
    props.src = ''
    props.name = 'Name'
    component = shallowComponent(props)

    expect(component.find(`.${ELEMENT_SELECTORS.avatarText}`).length).toBe(1)
    expect(component.find(`.${ELEMENT_SELECTORS.avatarText}`).text()).toBe(props.name.charAt(0))
  })
})
