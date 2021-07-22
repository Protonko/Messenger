import type {IDialog} from 'models/dialog'
import {FC, memo} from 'react'
import {ReactComponent as DoubleCheck} from 'assets/icons/double-check.svg'
import {ReactComponent as Check} from 'assets/icons/check.svg'
import classNames from 'classnames'
import {TextSize, TextTypes} from 'models/common/text'
import {Sizes} from 'models/common/sizes'
import {COLORS} from 'static/colors'
import {Text} from 'components/common/Text'
import {Counter} from 'components/common/Counter'
import {Avatar} from 'components/common/Avatar'
import {Typing} from 'components/common/Typing'

export interface IDialogProps extends IDialog {
  selected: boolean
  isOwnMessage: boolean
  isTyping: boolean
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
    isTyping,
  }) => {
    const classNameDialog = classNames('dialog', {
      'dialog--selected': selected,
    })
    const counter = messages.toString().length > 2 ? '99+' : messages

    const renderMessageText = () => {
      if (isTyping) {
        return <Typing customStyles="dialog__typing" size={Sizes.SMALL} />
      }

      if (!lastMessage) {
        return <Text customStyles="dialog__text-description">{''}</Text>
      }

      if (isOwnMessage) {
        return (
          <Text customStyles="dialog__text-description">
            {`You: ${lastMessage.text}`}
          </Text>
        )
      }

      return (
        <Text customStyles="dialog__text-description">{lastMessage.text}</Text>
      )
    }

    const renderStatus = () => {
      const props = {
        width: 15,
        height: 15,
        color: selected ? COLORS.white : COLORS.dustyGray,
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
          additionalClassName="dialog__avatar"
          src={interlocutor.avatar ?? ''}
          name={interlocutor.full_name}
        />

        <div className="dialog__data">
          <div className="dialog__text">
            <Text
              type={TextTypes.h4}
              customStyles="dialog__text-title"
              numberOfLines={1}
            >
              {interlocutor.full_name}
            </Text>
            {renderMessageText()}
          </div>

          <div className="dialog__info">
            <Text
              type={TextTypes.mixed}
              size={TextSize.EXTRA_SMALL}
              customStyles="dialog__info-date"
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
