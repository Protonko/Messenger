import type {IDialog} from 'models/dialog'
import {memo, FC} from 'react'
import classNames from 'classnames'
import {TextSize, TextTypes} from 'models/common/text'
import {ReactComponent as DoubleCheck} from 'assets/icons/double-check.svg'
import {ReactComponent as Check} from 'assets/icons/check.svg'
import {COLORS} from 'static/colors'
import {Text} from 'components/common/Text'
import {Counter} from 'components/common/Counter'
import {Avatar} from 'components/common/Avatar'

export interface IDialogProps extends IDialog {
  selected: boolean
  isOwnMessage: boolean
}

export const Dialog: FC<IDialogProps> = memo(
  ({
     lastMessage,
     interlocutor,
     createdAt,
     updatedAt,
     messages,
     status,
     selected,
     isOwnMessage,
   }) => {
    const classNameDialog = classNames('dialog', {
      'dialog--selected': selected,
    })
    const counter = messages.toString().length > 2 ? '99+' : messages
    const messageText = lastMessage
      ? (isOwnMessage ? `You: ${lastMessage.text}` : lastMessage.text)
      : ''

    const renderStatus = () => {
      const props = {
        width: 15,
        height: 15,
        color: COLORS.dustyGray,
      }

      if (!lastMessage) {
        return null
      }

      if (!lastMessage.read && !isOwnMessage && counter) {
        return <Counter count={counter} status={status} />
      }

      if (!lastMessage.read && isOwnMessage) {
        return <Check {...props} />
      }

      if (lastMessage.read) {
        return <DoubleCheck {...props} />
      }
    }

    return (
      <div className={classNameDialog}>
        <Avatar
          customStyles='dialog__avatar'
          src={interlocutor.avatar ?? ''}
          name={interlocutor.full_name}
        />

        <div className='dialog__data'>
          <div className='dialog__text'>
            <Text
              type={TextTypes.h4}
              customStyles='dialog__text-title'
              numberOfLines={1}
            >
              {interlocutor.full_name}
            </Text>
            <Text customStyles='dialog__text-description'>
              {messageText}
            </Text>
          </div>

          <div className='dialog__info'>
            <Text
              type={TextTypes.mixed}
              size={TextSize.EXTRA_SMALL}
              customStyles='dialog__info-date'
            >
              {new Date(updatedAt || createdAt).toLocaleDateString()}
            </Text>

            {renderStatus()}
          </div>
        </div>
      </div>
    )
  },
)
