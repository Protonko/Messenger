import type {FC} from 'react'
import classNames from 'classnames'
import {Sizes} from 'models/common/sizes'

export interface IPropsLoader {
  center?: boolean
  size?: Sizes
}

export const Loader: FC<IPropsLoader> = ({center, size = Sizes.MEDIUM}) => {
  const classNamesLoader = classNames(
    'loader',
    {'loader--center': center},
    {'loader--small': size === Sizes.SMALL},
    {'loader--large': size === Sizes.LARGE},
  )

  const renderLine = (_: string, index: number) => {
    return <div className="loader__line" key={index} />
  }

  return (
    <div className={classNamesLoader}>
      {new Array(12).fill('').map(renderLine)}
    </div>
  )
}
