import type {FC} from 'react'
import type {IMessage} from 'models/message'
import classNames from 'classnames'
import {TextSize, TextTypes} from 'models/common/text'
import {Sizes} from 'models/common/sizes'
import {Avatar} from 'components/common/Avatar'
import {Text} from 'components/common/Text'

export interface IPropsMessage extends IMessage {
  customStyles?: string
  avatarSize?: Sizes
}

export const Message: FC<IPropsMessage> = ({
  customStyles,
  text,
  author,
  createdAt,
  updatedAt,
  attachments,
}) => {
  const classNamesMessage = classNames('message', {
    [customStyles ?? '']: !!customStyles,
  })

  const renderText = () => {
    if (text) {
      return (
        <Text
          type={TextTypes.mixed}
          size={TextSize.EXTRA_SMALL}
          customStyles="message__content-item message__content-item--text"
          numberOfLines={1}
        >
          {text}
        </Text>
      )
    }
  }

  const renderAttachments = () => {
    if (attachments.length) {
      return (
        <img
          className="message__content-item message__content-item--image"
          src=""
          alt="#"
        />
      )
    }
  }

  return (
    <div className={classNamesMessage}>
      <div className="message__body">
        <Avatar name={author.full_name} src={author.avatar ?? ''} />

        <div className="message__data">
          <Text
            type={TextTypes.h4}
            customStyles="message__author"
            numberOfLines={1}
          >
            {author.full_name}
          </Text>

          <div className="message__content">
            {renderText()}
            {renderAttachments()}
          </div>
        </div>

        <div className="message__date">
          <Text
            type={TextTypes.mixed}
            size={TextSize.EXTRA_SMALL}
            customStyles="message__date-text"
            numberOfLines={1}
          >
            {new Date(updatedAt || createdAt).toLocaleString()}
          </Text>
        </div>
      </div>
    </div>
  )
}
