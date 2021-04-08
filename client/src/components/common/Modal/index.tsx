import {useRef, FC, ReactPortal, ReactNode} from 'react'
import {createPortal} from 'react-dom'
import {Transition} from 'react-transition-group'
import classNames from 'classnames'
import {useOutsideClick} from 'hooks/useOutsideClick'
import {HEIGHT_MODAL, WIDTH_MODAL, TOGGLE_MODAL_TIMEOUT} from 'static/constants'
import {rem} from 'utils/rem'

export interface IPropsModal {
  children: ReactNode
  modalVisibility: boolean
  toggleVisibilityModal: (visibility: boolean) => void
  timeout?: number
  width?: number
  height?: number
}

const TRANSITION_CLASSNAMES = {
  entering: 'modal__popup--fade-in',
  entered: '',
  exiting: 'modal__popup--fade-out',
  exited: '',
  unmounted: '',
}

export const ModalContent: FC<IPropsModal> = ({
  children,
  modalVisibility,
  toggleVisibilityModal,
  timeout = TOGGLE_MODAL_TIMEOUT,
  width = WIDTH_MODAL,
  height = HEIGHT_MODAL,
}) => {
  const modal = useRef<HTMLElement>(null)

  useOutsideClick(modal, () => toggleVisibilityModal(false))

  return (
    <Transition
      in={modalVisibility}
      timeout={timeout}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      {state => {
        const classNamesModal = classNames(
          'modal',
          {[TRANSITION_CLASSNAMES[state]]: !!TRANSITION_CLASSNAMES[state]}
        )

        return (
          <div className={classNamesModal}>
            <article
              className="modal__popup"
              style={{width: rem(width), height: rem(height)}}
              ref={modal}
            >
              {children}
            </article>
          </div>
        )
      }}
    </Transition>
  )
}

export const Modal = ({children, ...props}: IPropsModal): ReactPortal => {
  const portalRoot = document.getElementById('portal-modal') as HTMLElement
  const el = useRef(document.createElement('div'))
  portalRoot.appendChild(el.current)

  return createPortal(
    <ModalContent {...props}>
      {children}
    </ModalContent>,
    el.current
  )
}
