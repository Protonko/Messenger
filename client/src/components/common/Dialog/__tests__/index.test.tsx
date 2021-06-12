import {mount, ReactWrapper} from 'enzyme'
import {ReactComponent as DoubleCheck} from 'assets/icons/double-check.svg'
import {ReactComponent as Check} from 'assets/icons/check.svg'
import {Counter} from 'components/common/Counter'
import {Dialog, IDialogProps} from 'components/common/Dialog'
import {DIALOG} from 'static/test-mocks'

const ELEMENT_SELECTORS = {
  dialog: 'dialog',
  date: 'dialog__info-date',
  selected: 'dialog--selected',
}

describe('Dialog', () => {
  let componentMount: ReactWrapper<IDialogProps>
  let props: IDialogProps

  beforeEach(() => {
    props = {
      ...DIALOG,
      messages: 0,
      isOwnMessage: false,
      selected: false,
    }
  })

  it('Should render Dialog component', () => {
    componentMount = mount(<Dialog {...props} />)

    expect(componentMount.find(`.${ELEMENT_SELECTORS.dialog}`).length).toBe(1)
  })

  it('Should render Dialog component with selected modifier', () => {
    componentMount = mount(<Dialog {...{...props, selected: true}} />)

    expect(componentMount.find(`.${ELEMENT_SELECTORS.selected}`).length).toBe(1)
    expect(componentMount).toMatchSnapshot('Dialog with selected modifier')
  })

  it('Match snapshot', () => {
    componentMount = mount(<Dialog {...props} />)

    expect(componentMount).toMatchSnapshot('Dialog')
  })

  it('Should render Counter', () => {
    props.messages = 123
    componentMount = mount(<Dialog {...props} />)

    expect(componentMount.find(Counter).length).toBe(1)
    expect(componentMount).toMatchSnapshot('Dialog with counter')
  })

  it('Should render DoubleCheck icon', () => {
    props.lastMessage!.read = true
    componentMount = mount(<Dialog {...props} />)

    expect(componentMount.find(DoubleCheck).length).toBeGreaterThan(0)
    expect(componentMount).toMatchSnapshot('Dialog with read message')
  })

  it('Shouldn`t render status', () => {
    props.lastMessage = undefined
    componentMount = mount(<Dialog {...props} />)

    expect(componentMount).toMatchSnapshot('Dialog without status')
  })

  it('Should render Check icon', () => {
    props.isOwnMessage = true
    props.lastMessage!.read = false
    componentMount = mount(<Dialog {...props} />)

    expect(componentMount.find(Check).length).toBeGreaterThan(0)
    expect(componentMount).toMatchSnapshot('Dialog with sent message')
  })

  it('Should render updated date', () => {
    props.updatedAt =
      'Mon May 03 2021 16:49:32 GMT+0300 (Москва, стандартное время)'
    componentMount = mount(<Dialog {...props} />)

    expect(componentMount.find(`.${ELEMENT_SELECTORS.date}`).text()).toBe(
      new Date(props.updatedAt).toLocaleDateString(),
    )
    expect(componentMount).toMatchSnapshot('Dialog with date')
  })

  it('Should render component with avatar', () => {
    props.interlocutor.avatar = 'avatar/src'
    componentMount = mount(<Dialog {...props} />)

    expect(componentMount).toMatchSnapshot('Dialog with avatar')
  })

  it('Should render component with created date', () => {
    props.updatedAt = ''
    props.createdAt =
      'Mon May 12 2021 16:39:32 GMT+0300 (Москва, стандартное время)'
    componentMount = mount(<Dialog {...props} />)

    expect(componentMount.find(`.${ELEMENT_SELECTORS.date}`).text()).toBe(
      new Date(props.createdAt).toLocaleDateString(),
    )
    expect(componentMount).toMatchSnapshot('Dialog with created date')
  })
})
