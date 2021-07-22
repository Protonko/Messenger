import type {IUser} from 'models/user'
import {forwardRef} from 'react'
import classNames from 'classnames'
import {Sizes} from 'models/common/sizes'
import {Avatar} from 'components/common/Avatar'

interface IMediaCircleProps {
  size: Exclude<Sizes, Sizes.MEDIUM>
  user: IUser
  connecting: boolean
  additionalClassName?: string
}

export const MediaCircle = forwardRef<HTMLVideoElement, IMediaCircleProps>(
  ({size, user, additionalClassName, connecting}, ref) => {
    const mediaCircleClassNames = classNames(
      'media-circle',
      {'media-circle--lg': size === Sizes.LARGE},
      {'media-circle--sm': size === Sizes.SMALL},
      {[additionalClassName ?? '']: !!additionalClassName},
    )

    const videoClassNames = classNames(
      'media-circle__video',
      {'media-circle__video--connecting': connecting},
    )

    const renderAvatar = () => {
      if (connecting) {
        return (
          <Avatar
            src={user.avatar ?? ''}
            name={user.full_name}
            additionalClassName="media-circle__avatar"
          />
        )
      }

      return null
    }

    return (
      <div className={mediaCircleClassNames}>
        {renderAvatar()}
        <video
          ref={ref}
          autoPlay={true}
          playsInline={true}
          muted={true}
          className={videoClassNames}
        />
      </div>
    )
  }
)
