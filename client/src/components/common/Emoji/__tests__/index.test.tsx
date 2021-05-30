import React from 'react'
import {mount, shallow} from 'enzyme'
import {Emoji, IPropsEmoji} from 'components/common/Emoji'

const ELEMENT_SELECTORS = {
  emoji: 'emoji',
  button: 'emoji__button',
  popup: 'emoji__popup',
  smile: 'emoji-mart-emoji',
}

const shallowComponent = (props: IPropsEmoji) => (
  shallow(<Emoji {...props} />)
)

describe('Emoji', () => {
  let props: IPropsEmoji

  beforeEach(() => {
    props = {
      onSelect: jest.fn(),
    }
  })

  it('Should render Emoji component', () => {
    const component = shallowComponent(props)
    const wrapper = component.find(`.${ELEMENT_SELECTORS.emoji}`)
    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = shallowComponent(props)

    expect(component).toMatchSnapshot('Emoji')
  })

  it('Should render popup', () => {
    const component = shallowComponent(props)
    const button = component.find(`.${ELEMENT_SELECTORS.button}`)
    button.simulate('click')
    expect(component.find(`.${ELEMENT_SELECTORS.popup}`).length).toBe(1)
    expect(component).toMatchSnapshot('Emoji with popup')
  })
})
