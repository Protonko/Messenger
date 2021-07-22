import type {FC} from 'react'
import classNames from 'classnames'
import {TextSize, TextTypes} from 'models/common/text'
import {Avatar, IPropsAvatar} from 'components/common/Avatar'
import {Text} from 'components/common/Text'

export interface IPropsUser extends IPropsAvatar {
  name: string
  additionalClassName?: string
  description?: string
}

export const User: FC<IPropsUser> = ({
  name,
  src,
  description,
  size,
  additionalClassName,
}) => {
  const classNamesUser = classNames('user', {
    [additionalClassName ?? '']: !!additionalClassName,
  })

  return (
    <div className={classNamesUser}>
      <Avatar size={size} name={name} src={src} />
      <div className="user__data">
        <Text
          type={TextTypes.h4}
          customStyles="user__data-name"
          numberOfLines={1}
        >
          {name}
        </Text>

        <Text
          type={TextTypes.mixed}
          size={TextSize.EXTRA_SMALL}
          customStyles="user__data-description"
          numberOfLines={1}
        >
          {description ?? ''}
        </Text>
      </div>
    </div>
  )
}
