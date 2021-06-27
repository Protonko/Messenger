import {shallow, ShallowWrapper} from 'enzyme'
import {IProgressBarProps, Progressbar} from 'components/common/Progressbar'

const ELEMENT_SELECTORS = {
  progressbar: 'progressbar',
  custom: 'custom',
}

describe('Progressbar', () => {
  let props: IProgressBarProps
  let component: ShallowWrapper<IProgressBarProps>

  beforeEach(() => {
    props = {
      value: 20,
    }

    component = shallow(<Progressbar {...props} />)
  })

  it('Should render Progressbar component', () => {
    expect(component.find(`.${ELEMENT_SELECTORS.progressbar}`).length).toBe(1)
    expect(component).toMatchSnapshot('Progressbar')
  })

  it('Should render Progressbar component with custom styles', () => {
    props.customStyles = ELEMENT_SELECTORS.custom
    component = shallow(<Progressbar {...props} />)

    expect(component.find(`.${ELEMENT_SELECTORS.custom}`).length).toBe(1)
    expect(component).toMatchSnapshot('Progressbar with custom styles')
  })
})
