import {mount, ReactWrapper} from 'enzyme'
import {FileUploader, IFileUploaderProps} from 'components/common/FileUploader'

const ELEMENT_SELECTORS = {
  input: '.file-uploader__input',
}

describe('FileUploader', () => {
  let component: ReactWrapper<IFileUploaderProps>
  let props: IFileUploaderProps

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
    }
  })

  it('Should render FileUploader component', () => {
    component = mount(<FileUploader {...props} />)

    expect(component).toMatchSnapshot('FileUploader')
    expect(component.find(ELEMENT_SELECTORS.input).length).toBe(1)
  })

  it('Should render disabled FileUploader component with', () => {
    component = mount(<FileUploader {...props} disabled={true} />)

    expect(component).toMatchSnapshot('FileUploaderDisabled')
    expect(component.find(ELEMENT_SELECTORS.input).prop('disabled')).toBe(true)
  })

  it('Should call onChange', () => {
    component = mount(<FileUploader {...props} disabled={true} />)
    component
      .find(ELEMENT_SELECTORS.input)
      .simulate('change', {target: {files: [new File([], 'mock')]}})

    expect(props.onChange).toBeCalled()
  })
})
