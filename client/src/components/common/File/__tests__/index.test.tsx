import {shallow, ShallowWrapper} from 'enzyme'
import {File as FileComponent, IFileProps} from 'components/common/File'

const ELEMENT_SELECTORS = {
  file: '.file-preview',
  removeButton: '.file-preview__remove',
  imageFile: '.file-preview--image',
  additional: 'additional-classname',
}

describe('File', () => {
  let component: ShallowWrapper<IFileProps>
  let props: IFileProps

  beforeEach(() => {
    props = {
      file: new File([], 'mock'),
      onRemove: jest.fn(),
    }
  })

  it('Should render File component', () => {
    component = shallow(<FileComponent {...props} />)

    expect(component).toMatchSnapshot('File')
    expect(component.find(ELEMENT_SELECTORS.file).length).toBe(1)
  })

  it('Should render File component with additional classname', () => {
    component = shallow(
      <FileComponent
        {...props}
        additionalClassName={ELEMENT_SELECTORS.additional}
      />,
    )

    expect(component).toMatchSnapshot('File with additional classname')
    expect(component.find(`.${ELEMENT_SELECTORS.additional}`).length).toBe(1)
  })

  it('Should render File without remove button', () => {
    component = shallow(<FileComponent {...props} onRemove={undefined} />)

    expect(component).toMatchSnapshot('File without remove button')
    expect(component.find(ELEMENT_SELECTORS.removeButton).length).toBe(0)
  })

  it('Should render image File', () => {
    const image = new File([], 'image.png', {type: 'image/png'})
    component = shallow(<FileComponent {...props} file={image} />)

    expect(component).toMatchSnapshot('File with image file')
    expect(component.find(ELEMENT_SELECTORS.imageFile).length).toBe(1)
  })

  it('Should call onRemove', () => {
    component = shallow(<FileComponent {...props} />)
    component.find(ELEMENT_SELECTORS.removeButton).simulate('click')

    expect(props.onRemove).toBeCalled()
  })
})
