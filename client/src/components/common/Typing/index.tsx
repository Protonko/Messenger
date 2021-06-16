import type {FC} from 'react'
import classNames from 'classnames'
import {Sizes} from 'models/common/sizes'

interface IPropsTyping {
  customStyles?: string
  size?: Sizes
}

export const Typing: FC<IPropsTyping> = ({
  customStyles,
  size = Sizes.MEDIUM,
}) => {
  const classNamesTyping = classNames(
    'typing',
    {[customStyles ?? '']: !!customStyles},
    {'typing--large': size === Sizes.LARGE},
    {'typing--small': size === Sizes.SMALL},
  )

  return (
    <div className={classNamesTyping}>
      <p className="typing__text">Typing</p>
      <div className="typing__loader">
        <div className="typing__loader-ellipse" />
        <div className="typing__loader-ellipse" />
        <div className="typing__loader-ellipse" />
        <div className="typing__loader-ellipse" />
      </div>
    </div>
  )
}
