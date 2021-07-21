import type {FC} from 'react'
import type {IUser} from 'models/user'
import classNames from 'classnames'
import {Sizes} from 'models/common/sizes'
import {Avatar} from 'components/common/Avatar'

interface ICallCircleProps {
  size: Exclude<Sizes, Sizes.MEDIUM>
  user: IUser
  connecting: boolean
  additionalClassName?: string
}

export const VideoCircle: FC<ICallCircleProps> = ({
  size,
  user,
  additionalClassName,
  connecting,
}) => {
  const videoCircleClassNames = classNames(
    'video-circle',
    {'video-circle--lg': size === Sizes.LARGE},
    {'video-circle--sm': size === Sizes.SMALL},
    {[additionalClassName ?? '']: !!additionalClassName},
  )

  const renderContent = () => {
    if (connecting) {
      return (
        <Avatar
          src={user.avatar ?? ''}
          name={user.full_name}
          customStyles="video-circle__avatar"
        />
      )
    } else {
      return <video src="#" />
    }
  }

  return <div className={videoCircleClassNames}>{renderContent()}</div>
}
