import {useRef, FC, ReactPortal, ReactNode, RefObject} from 'react'
import {createPortal} from 'react-dom'
import {Transition, TransitionStatus} from 'react-transition-group'
import classNames from 'classnames'
import {useOutsideClick} from 'hooks/useOutsideClick'
import {HEIGHT_MODAL, WIDTH_MODAL, TOGGLE_MODAL_TIMEOUT} from 'static/constants'
import {rem} from 'utils/rem'

export interface IPropsModal {
  children: ReactNode
  initiatorRef?: RefObject<HTMLElement>
  modalVisibility: boolean
  toggleVisibilityModal?: (visibility: boolean) => void
  onClose?: () => void
  timeout?: number
  width?: number
  height?: number
  additionalClassName?: string
  withModalTemplate?: boolean
}

const TRANSITION_CLASSNAMES = {
  entering: 'modal--fade-in',
  entered: '',
  exiting: 'modal--fade-out',
  exited: '',
  unmounted: '',
}

export const ModalContent: FC<IPropsModal> = ({
  children,
  modalVisibility,
  toggleVisibilityModal,
  onClose,
  timeout = TOGGLE_MODAL_TIMEOUT,
  width = WIDTH_MODAL,
  height = HEIGHT_MODAL,
  additionalClassName,
  initiatorRef,
  withModalTemplate,
}) => {
  const modal = useRef<HTMLElement>(null)
  useOutsideClick<HTMLElement>(
    modal,
    () => {
      onClose?.()
      toggleVisibilityModal?.(false)
    },
    initiatorRef,
  )

  const renderContent = (state: TransitionStatus) => {
    const classNamesModal = classNames(
      'modal',
      {[TRANSITION_CLASSNAMES[state]]: !!TRANSITION_CLASSNAMES[state]},
      {'modal--blur': !withModalTemplate},
    )
    const classNamesModalContent = classNames('modal__popup', {
      [additionalClassName ?? '']: !!additionalClassName,
    })

    if (withModalTemplate) {
      return (
        <div className={classNamesModal}>
          <article
            className={classNamesModalContent}
            style={{width: rem(width), height: rem(height)}}
            ref={modal}
          >
            {children}
          </article>
        </div>
      )
    }

    return <div className={classNamesModal}>{children}</div>
  }

  return (
    <Transition
      nodeRef={modal}
      in={modalVisibility}
      timeout={timeout}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      {renderContent}
    </Transition>
  )
}

export const Modal = ({children, ...props}: IPropsModal): ReactPortal => {
  const portalRoot = document.getElementById('portal-modal') as HTMLElement
  const el = useRef(document.createElement('div'))
  portalRoot.appendChild(el.current)

  return createPortal(
    <ModalContent {...props}>{children}</ModalContent>,
    el.current,
  )
}
