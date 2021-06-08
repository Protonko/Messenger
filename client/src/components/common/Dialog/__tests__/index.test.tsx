import {mount, ReactWrapper} from 'enzyme'
import {ReadStatus, Status} from 'models/common/status'
import {ReactComponent as DoubleCheck} from 'assets/icons/double-check.svg'
import {ReactComponent as Check} from 'assets/icons/check.svg'
import {Counter} from 'components/common/Counter'
import {Dialog, IDialogProps} from 'components/common/Dialog'

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
      id: '123',
      interlocutor: {
        avatar: null,
        confirmed: false,
        email: 'foo@bar.baz',
        id: '123',
        full_name: 'name',
        createdAt: new Date('01-01-01'),
        updatedAt: new Date('01-01-01'),
        last_seen: new Date('01-01-01'),
      },
      lastMessage: 'string',
      createdAt:
        'Mon May 03 2021 16:47:32 GMT+0300 (Москва, стандартное время)',
      updatedAt:
        'Mon May 03 2021 16:47:32 GMT+0300 (Москва, стандартное время)',
      messages: 0,
      status: Status.ACTIVE,
      readStatus: null,
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
    props.readStatus = ReadStatus.READ
    componentMount = mount(<Dialog {...props} />)
    expect(componentMount.find(DoubleCheck).length).toBeGreaterThan(0)
    expect(componentMount).toMatchSnapshot('Dialog with readStatus === READ')
  })

  it('Should render Check icon', () => {
    props.readStatus = ReadStatus.SENT
    componentMount = mount(<Dialog {...props} />)
    expect(componentMount.find(Check).length).toBeGreaterThan(0)
    expect(componentMount).toMatchSnapshot('Dialog with readStatus === SENT')
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
})
