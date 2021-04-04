import {mount} from 'enzyme'
import {Modal, ModalContent, IPropsModal} from 'components/common/Modal'
import {rem} from 'utils/rem'
import {Transition} from 'react-transition-group'

const ELEMENT_SELECTORS = {
  modal: 'modal',
  popup: 'modal__popup'
}

describe('Modal component', () => {
  const Child = () => <div>Yolo</div>
  const portalRoot = document.createElement('div')
  const body = document.querySelector('body')
  portalRoot.setAttribute('id', 'portal-modal')
  body!.appendChild(portalRoot)

  let props: IPropsModal
  const fn = jest.fn();

  beforeEach(() => {
    props = {
      children: Child,
      modalVisibility: true,
      toggleVisibilityModal: fn,
    }
  })

  it('Should create portal with ModalContent component', () => {
    const component = mount(
      <Modal {...props}>
        <Child />
      </Modal>,
    );
    const wrapper = component.find(ModalContent);

    expect(wrapper.length).toBe(1)
  })

  it('Should render ModalContent component', () => {
    const component = mount(
      <ModalContent {...props}>
        <Child />
      </ModalContent>,
    );
    const wrapper = component.find(`.${ELEMENT_SELECTORS.modal}`)

    expect(wrapper.length).toBe(1)
  })

  it('Match snapshot', () => {
    const component = mount(
      <ModalContent {...props}>
        <Child />
      </ModalContent>,
    );

    expect(component).toMatchSnapshot()
  })

  it('Should style properties be 10rem', () => {
    props.width = 160
    props.height = 160

    const component = mount(
      <ModalContent {...props}>
        <Child />
      </ModalContent>,
    );
    const popup = component.find(`.${ELEMENT_SELECTORS.popup}`)

    expect(popup.prop('style')).toHaveProperty('width', rem(props.width))
    expect(popup.prop('style')).toHaveProperty('height', rem(props.height))
  })

  it('Should change timeout from default value to 160', () => {
    props.timeout = 160

    const component = mount(
      <ModalContent {...props}>
        <Child />
      </ModalContent>,
    );
    const transition = component.find(Transition)

    expect(transition.prop('timeout')).toBe(160)
  })
})
