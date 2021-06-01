import type {FC} from 'react'
import classNames from 'classnames'
import {TextSize, TextTypes} from 'models/common/text'
import {Avatar, IPropsAvatar} from 'components/common/Avatar'
import {Text} from 'components/common/Text'

export interface IPropsMessage extends IPropsAvatar {
  name: string
  customStyles?: string
  description?: string
}

export const Message: FC<IPropsMessage> = ({
  name,
  customStyles,
  ...avatarProps
}) => {
  const classNamesMessage = classNames('message', {
    [customStyles ?? '']: !!customStyles,
  })

  return (
    <div className={classNamesMessage}>
      <div className="message__body">
        <Avatar {...avatarProps} name={name} />

        <div className="message__data">
          <Text
            type={TextTypes.h4}
            customStyles="message__author"
            numberOfLines={1}
          >
            {name}
          </Text>

          <div className="message__content">
            <Text
              type={TextTypes.mixed}
              size={TextSize.EXTRA_SMALL}
              customStyles="message__content-item message__content-item--text"
              numberOfLines={1}
            >
              text
            </Text>
            <img
              className="message__content-item message__content-item--image"
              src=""
              alt="#"
            />
          </div>
        </div>

        <div className="message__date">
          <Text
            type={TextTypes.mixed}
            size={TextSize.EXTRA_SMALL}
            customStyles="message__date-text"
            numberOfLines={1}
          >
            22.05.2021
          </Text>
        </div>
      </div>
    </div>
  )
}
