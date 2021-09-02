import type {IMessage} from 'models/message'
import {memo, FC} from 'react'
import classNames from 'classnames'
import {TextSize, TextTypes} from 'models/common/text'
import {Sizes} from 'models/common/sizes'
import {Avatar} from 'components/common/Avatar'
import {Text} from 'components/common/Text'
import {FileLink} from 'components/common/FileLink'
import {IMAGE_REGEX} from 'static/regex'

export interface IPropsMessage extends IMessage {
  additionalClassname?: string
  selected?: boolean
  avatarSize?: Sizes
}

export const Message: FC<IPropsMessage> = memo(
  ({additionalClassname, text, author, createdAt, updatedAt, attachment, selected}) => {
    const classNamesMessage = classNames('message', {
      [additionalClassname ?? '']: !!additionalClassname,
      'message--selected': selected,
    })

    const checkIsImage = (attachment: string) => {
      return !!attachment
        .split('.')
        .pop()
        ?.match(IMAGE_REGEX)
    }

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
      if (!attachment) return null

      if (checkIsImage(attachment)) {
        return (
          <img
            className="message__content-item message__content-item--image"
            src={attachment}
            alt={attachment.split('/').pop() ?? '#'}
          />
        )
      }

      return (
        <div className="message__content-item">
          <FileLink link={attachment} />
        </div>
      )
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
  },
)
