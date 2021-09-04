import {shallow} from 'enzyme'
import {IMediaCircleProps, MediaCircle} from 'components/common/MediaCircle'
import {Sizes} from 'models/common/sizes'
import {USER} from '../../../../static/test-mocks/user'

const ELEMENT_SELECTORS = {
  mediaCircle: 'media-circle',
  mediaCircleSmall: 'media-circle--sm',
  additional: 'additional',
  videoConnecting: 'media-circle__video--connecting',
}

describe('MediaCircle', () => {
  let props: IMediaCircleProps

  beforeEach(() => {
    props = {
      size: Sizes.LARGE,
      user: USER,
      connecting: true,
    }
  })

  it('Should render component', () => {
    const component = shallow(<MediaCircle {...props} />)

    expect(component).toMatchSnapshot('MediaCircle')
    expect(component.find(`.${ELEMENT_SELECTORS.mediaCircle}`).length).toBe(1)
  })

  it('Should render component with small size', () => {
    props.size = Sizes.SMALL
    const component = shallow(<MediaCircle {...props} />)

    expect(component).toMatchSnapshot('MediaCircle with small size')
    expect(
      component.find(`.${ELEMENT_SELECTORS.mediaCircleSmall}`).length,
    ).toBe(1)
  })

  it('Should render component with additional class name', () => {
    props.additionalClassName = ELEMENT_SELECTORS.additional
    const component = shallow(<MediaCircle {...props} />)

    expect(component).toMatchSnapshot('MediaCircle with additional class name')
    expect(component.find(`.${ELEMENT_SELECTORS.additional}`).length).toBe(1)
  })

  it('Should render component when connecting is false', () => {
    props.connecting = false
    const component = shallow(<MediaCircle {...props} />)

    expect(component).toMatchSnapshot('MediaCircle when connecting is false')
    expect(component.find(`.${ELEMENT_SELECTORS.videoConnecting}`).length).toBe(
      0,
    )
  })
})
