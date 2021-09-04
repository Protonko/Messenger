import {shallow, ShallowWrapper} from 'enzyme'
import {Message, IPropsMessage} from 'components/common/Message'
import {FileLink} from 'components/common/FileLink'
import {MESSAGE} from '../../../../static/test-mocks/message'

const ELEMENT_SELECTORS = {
  message: '.message',
  text: '.message__content-item--text',
  image: '.message__content-item--image',
  additional: 'additionalClassName',
  selected: '.message--selected',
}

describe('Message', () => {
  let component: ShallowWrapper<IPropsMessage>
  let props: IPropsMessage

  beforeEach(() => {
    props = {
      ...MESSAGE,
    }
  })

  it('Should render Message component', () => {
    component = shallow(<Message {...props} />)

    expect(component.find(ELEMENT_SELECTORS.message).length).toBe(1)
    expect(component).toMatchSnapshot('Message')
  })

  it('Should render Message component with selected modifier', () => {
    props.selected = true
    component = shallow(<Message {...props} />)

    expect(component.find(ELEMENT_SELECTORS.selected).length).toBe(1)
    expect(component).toMatchSnapshot('Selected message')
  })

  it('Should render Message component without text', () => {
    component = shallow(<Message {...props} text="" />)

    expect(component.find(ELEMENT_SELECTORS.text).length).toBe(0)
    expect(component).toMatchSnapshot('Message without text')
  })

  it('Should render Message component with image', () => {
    component = shallow(<Message {...props} attachment="image.png" />)

    expect(component.find(ELEMENT_SELECTORS.image).length).toBe(1)
    expect(component).toMatchSnapshot('Message with image')
  })

  it('Should render Message component with file', () => {
    component = shallow(<Message {...props} attachment="doc.pdf" />)

    expect(component.find(FileLink).length).toBe(1)
    expect(component).toMatchSnapshot('Message with file')
  })

  it('Should render Message component with additional classname', () => {
    component = shallow(
      <Message {...props} additionalClassname={ELEMENT_SELECTORS.additional} />,
    )

    expect(component.find(`.${ELEMENT_SELECTORS.additional}`).length).toBe(1)
    expect(component).toMatchSnapshot('Message with additionalClassName')
  })

  it('Should render Message component with created date', () => {
    component = shallow(<Message {...props} updatedAt="" />)

    expect(component).toMatchSnapshot('Message with created date')
  })
})
