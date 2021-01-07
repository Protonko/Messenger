// types
import {FC} from 'react'
import {Sizes} from 'models/common/sizes'

import {Loader} from 'components/common/Loader'

type TAvatarClassNames =
  | 'avatar'
  | 'avatar avatar--sm'
  | 'avatar avatar--lg'

export interface IPropsAvatar {
  src: string,
  size?: Sizes,
}

export const Avatar: FC<IPropsAvatar> = ({
  src,
  size = Sizes.MEDIUM,
}) => {
  let avatarClassname: TAvatarClassNames;

  switch (size) {
      case Sizes.SMALL:
        avatarClassname = 'avatar avatar--sm'
        break
      case Sizes.LARGE:
        avatarClassname = 'avatar avatar--lg'
        break
    default:
      avatarClassname = 'avatar'
  }

  return (
    <div className={avatarClassname}>
      <img className="avatar__image" src={src} alt=""/>
      <Loader />
    </div>
  )
}
