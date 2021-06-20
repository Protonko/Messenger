import {useMemo, FC} from 'react'
import classNames from 'classnames'
import {Sizes} from 'models/common/sizes'
import {ColorGeneratorByName} from 'utils/ColorGeneratorByName'
import {isDarkColor} from 'utils/isDarkColor'
import {Loader} from 'components/common/Loader'

export interface IPropsAvatar {
  src: string
  name?: string
  size?: Sizes
  customStyles?: string
}

export const Avatar: FC<IPropsAvatar> = ({
  src,
  name,
  size = Sizes.MEDIUM,
  customStyles,
}) => {
  const backgroundColor = useMemo(
    () => new ColorGeneratorByName(name ?? '').generate(),
    [src, name],
  )
  const avatarClassname = classNames(
    'avatar',
    {'avatar--sm': size === Sizes.SMALL},
    {'avatar--lg': size === Sizes.LARGE},
    {[customStyles ?? '']: customStyles},
  )

  if (!src && name) {
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
