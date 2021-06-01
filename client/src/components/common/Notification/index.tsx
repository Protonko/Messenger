import {FC, useRef} from 'react'
import {Transition} from 'react-transition-group'
import classNames from 'classnames'
import {TOGGLE_MODAL_TIMEOUT} from 'static/constants'
import {ReactComponent as CrossInCircle} from 'assets/icons/cross-in-circle.svg'
import {ReactComponent as ExclamationMarkInTriangle} from 'assets/icons/exclamation-mark-in-triangle.svg'
import {ReactComponent as Check} from 'assets/icons/check.svg'

export enum NotificationType {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
}

export interface INotificationProps {
  visible: boolean
  onEntered: () => void
  text: string
  type?: NotificationType
}

const TRANSITION_CLASSNAMES = {
  entering: 'notification--slide-in-down',
  entered: '',
  exiting: 'notification--slide-in-up',
  exited: '',
  unmounted: '',
}

export const Notification: FC<INotificationProps> = ({
  visible,
  onEntered,
  text,
  type = NotificationType.WARNING,
}) => {
  const notification = useRef(null)

  const renderIcon = () => {
    switch (type) {
      case NotificationType.ERROR:
        return <CrossInCircle className="notification__icon" />

      case NotificationType.SUCCESS:
        return <Check className="notification__icon" />

      case NotificationType.WARNING:
        return <ExclamationMarkInTriangle className="notification__icon" />
    }
  }

  return (
    <Transition
      nodeRef={notification}
      in={visible}
      timeout={TOGGLE_MODAL_TIMEOUT}
      mountOnEnter={true}
      unmountOnExit={true}
      onEntered={() => {
        setTimeout(() => {
          onEntered()
        }, 2000)
      }}
    >
      {(state) => {
        const classNamesNotification = classNames(
          'notification',
          {
            [TRANSITION_CLASSNAMES[state]]: !!TRANSITION_CLASSNAMES[state],
          },
          {
            'notification--success': type === NotificationType.SUCCESS,
          },
          {'notification--error': type === NotificationType.ERROR},
          {
            'notification--warning': type === NotificationType.WARNING,
          },
        )

        return (
          <div ref={notification} className={classNamesNotification}>
            {renderIcon()}
            <span className="notification__text">{text}</span>
          </div>
        )
      }}
    </Transition>
  )
}
