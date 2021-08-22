import {shallow, ShallowWrapper} from 'enzyme'
import {FileLink, IFileLinkProps} from 'components/common/FileLink'

const ELEMENT_SELECTORS = {
  fileLink: '.file-link',
  fileName: '.file-link__info-name',
}

describe('FileLink', () => {
  let component: ShallowWrapper<IFileLinkProps>
  let props: IFileLinkProps

  beforeEach(() => {
    props = {
      link: 'foo.bar/file.pdf',
    }
  })

  it('Should render FileLink component', () => {
    component = shallow(<FileLink {...props} />)

    expect(component.find(ELEMENT_SELECTORS.fileLink).length).toBe(1)
    expect(component).toMatchSnapshot('FileLink')
  })
})
