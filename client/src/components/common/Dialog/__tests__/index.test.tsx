import {shallow, mount, ShallowWrapper, ReactWrapper} from 'enzyme'
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
  let component: ShallowWrapper<IDialogProps>
  let componentMount: ReactWrapper<IDialogProps>
  let props: IDialogProps

  beforeEach(() => {
    props = {
      id: '123',
      name: 'string',
      lastMessage: 'string',
      avatar: 'string',
      createdAt: 'Mon May 03 2021 16:47:32 GMT+0300 (Москва, стандартное время)',
      updatedAt: 'Mon May 03 2021 16:47:32 GMT+0300 (Москва, стандартное время)',
      edited: false,
      messages: 0,
      status: Status.ACTIVE,
      readStatus: null,
      selected: false,
    }
  })

  it('Should render Dialog component', () => {
    component = shallow(<Dialog {...props} />)
    expect(component.find(`.${ELEMENT_SELECTORS.dialog}`).length).toBe(1)
  })

  it('Should render Dialog component with selected modifier', () => {
    component = shallow(<Dialog {...{...props, selected: true}} />)
    expect(component.find(`.${ELEMENT_SELECTORS.selected}`).length).toBe(1)
    expect(component).toMatchSnapshot('Dialog with selected modifier')
  })

  it('Match snapshot', () => {
    component = shallow(<Dialog {...props} />)
    expect(component).toMatchSnapshot('Dialog')
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
