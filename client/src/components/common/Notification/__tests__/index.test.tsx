import {mount, ReactWrapper} from 'enzyme'
import {
  INotificationProps,
  Notification,
  NotificationType,
} from 'components/common/Notification'

const ELEMENT_SELECTORS = {
  success: 'notification--success',
  error: 'notification--error',
  warning: 'notification--warning',
}

describe('Notification', () => {
  let props: INotificationProps
  let component: ReactWrapper<INotificationProps>

  beforeEach(() => {
    props = {
      visible: false,
      onEntered: jest.fn(),
      text: 'Text',
    }

    component = mount(<Notification {...props} />)
  })

  it('Shouldn`t render component', () => {
    expect(component).toMatchSnapshot('Hidden notification')
  })

  it('Should render warning notification', () => {
    props.visible = true

    component = mount(<Notification {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.warning}`).length).toBe(1)
    expect(component).toMatchSnapshot('Warning notification')
  })

  it('Should render success notification', () => {
    props.visible = true
    props.type = NotificationType.SUCCESS

    component = mount(<Notification {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.success}`).length).toBe(1)
    expect(component).toMatchSnapshot('Success notification')
  })

  it('Should render error notification', () => {
    props.visible = true
    props.type = NotificationType.ERROR

    component = mount(<Notification {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.error}`).length).toBe(1)
    expect(component).toMatchSnapshot('Error notification')
  })
})
