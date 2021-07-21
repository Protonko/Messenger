import {mount, ReactWrapper} from 'enzyme'
import {Modal, ModalContent, IPropsModal} from 'components/common/Modal'
import {rem} from 'utils/rem'
import {Transition} from 'react-transition-group'

const ELEMENT_SELECTORS = {
  modal: 'modal',
  popup: 'modal__popup',
  customStyle: 'modal__test',
}

describe('Modal component', () => {
  const Child = () => <div>Yolo</div>
  const portalRoot = document.createElement('div')
  const body = document.querySelector('body')
  const fn = jest.fn()

  portalRoot.setAttribute('id', 'portal-modal')
  body!.appendChild(portalRoot)

  let props: IPropsModal
  let component: ReactWrapper<IPropsModal>

  beforeEach(() => {
    props = {
      children: Child,
      modalVisibility: true,
      toggleVisibilityModal: fn,
      withModalTemplate: true,
    }

    component = mount(
      <Modal {...props}>
        <Child />
      </Modal>,
    )
  })

  it('Should create portal with ModalContent component', () => {
    expect(component.find(ModalContent).length).toBe(1)
  })

  it('Should render ModalContent component', () => {
    expect(component.find(`.${ELEMENT_SELECTORS.modal}`).length).toBe(1)
  })

  it('Match snapshot', () => {
    expect(component).toMatchSnapshot('Modal')
  })

  it('Should style properties be 10rem', () => {
    props.width = 160
    props.height = 160

    component = mount(
      <ModalContent {...props}>
        <Child />
      </ModalContent>,
    )
    const popup = component.find(`.${ELEMENT_SELECTORS.popup}`)

    expect(popup.prop('style')).toHaveProperty('width', rem(props.width))
    expect(popup.prop('style')).toHaveProperty('height', rem(props.height))
  })

  it('Should render modal without template', () => {
    props.withModalTemplate = false

    component = mount(
      <ModalContent {...props}>
        <Child />
      </ModalContent>,
    )

    expect(component).toMatchSnapshot('Modal without template')
  })

  it('Should change timeout from default value to 160', () => {
    props.timeout = 160

    component = mount(
      <ModalContent {...props}>
        <Child />
      </ModalContent>,
    )

    expect(component.find(Transition).prop('timeout')).toBe(160)
  })

  it('Modal with customStyles', () => {
    props.additionalClassName = ELEMENT_SELECTORS.customStyle

    component = mount(
      <ModalContent {...props}>
        <Child />
      </ModalContent>,
    )

    expect(component.find(`.${ELEMENT_SELECTORS.customStyle}`).length).toBe(1)
  })
})
