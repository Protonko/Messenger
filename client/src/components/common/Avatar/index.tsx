import type {FC} from 'react'
import classNames from 'classnames'
import {Sizes} from 'models/common/sizes'
import {getRandomColor} from 'utils/getRandomColor'
import {isDarkColor} from 'utils/isDarkColor'
import {Loader} from 'components/common/Loader'

export interface IPropsAvatar {
  src: string
  name?: string
  size?: Sizes
}

export const Avatar: FC<IPropsAvatar> = ({
  src,
  name,
  size = Sizes.MEDIUM,
}) => {
  const avatarClassname = classNames(
    'avatar',
    {'avatar--sm': size === Sizes.SMALL},
    {'avatar--lg': size === Sizes.LARGE},
  )

  if (!src && name) {
    const backgroundColor = getRandomColor()
    const classNamesText = classNames(
      'avatar__text',
      {'avatar__text--light': isDarkColor(backgroundColor)},
      {'avatar__text--dark': !isDarkColor(backgroundColor)},
    )

    return (
      <div className={avatarClassname} style={{backgroundColor}}>
        <span className={classNamesText}>{name.charAt(0)}</span>
      </div>
    )
  }

  return (
    <div className={avatarClassname}>
      <img className="avatar__image" src={src} alt="" />
      <Loader />
    </div>
  )
}
