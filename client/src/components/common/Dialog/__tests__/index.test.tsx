import type {IDialog} from 'models/dialog'
import {ReadStatus, Status} from 'models/common/status'
import {shallow, mount, ShallowWrapper, ReactWrapper} from 'enzyme'
import {ReactComponent as DoubleCheck} from 'assets/icons/double-check.svg'
import {ReactComponent as Check} from 'assets/icons/check.svg'
import {Counter} from 'components/common/Counter'
import {Dialog} from 'components/common/Dialog'

const ELEMENT_SELECTORS = {
  dialog: 'dialog',
  date: 'dialog__info-date',
}

describe('Dialog', () => {
  let component: ShallowWrapper<IDialog>
  let componentMount: ReactWrapper<IDialog>
  let props: IDialog

  beforeEach(() => {
    props = {
      id: '123',
      name: 'string',
      lastMessage: 'string',
      avatar: 'string',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      edited: false,
      messages: 0,
      status: Status.ACTIVE,
      readStatus: null,
    }
  })

  it('Should render Dialog component', () => {
    component = shallow(<Dialog {...props} />)
    expect(component.find(`.${ELEMENT_SELECTORS.dialog}`).length).toBe(1)
  })

  it('Match snapshot', () => {
    component = shallow(<Dialog {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('Should render Counter', () => {
    props.messages = 123
    component = shallow(<Dialog {...props} />)
    expect(component.find(Counter).length).toBe(1)
    expect(component).toMatchSnapshot('Dialog with counter')
  })

  it('Should render DoubleCheck icon', () => {
    props.readStatus = ReadStatus.READ
    component = shallow(<Dialog {...props} />)
    expect(component.find(DoubleCheck).length).toBeGreaterThan(0)
    expect(component).toMatchSnapshot('Dialog with readStatus === READ')
  })

  it('Should render Check icon', () => {
    props.readStatus = ReadStatus.SENT
    component = shallow(<Dialog {...props} />)
    expect(component.find(Check).length).toBeGreaterThan(0)
    expect(component).toMatchSnapshot('Dialog with readStatus === SENT')
  })

  it('Should render updated date', () => {
    props.edited = true;
    componentMount = mount(<Dialog {...props} />)
    expect(componentMount.find(`.${ELEMENT_SELECTORS.date}`).text()).toBe(new Date(props.updatedAt).toLocaleDateString())
    expect(componentMount).toMatchSnapshot('Dialog with date')
  })
})
