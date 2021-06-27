import type {FC} from 'react'
import classNames from 'classnames'
import {rem} from 'utils/rem'

export interface IProgressBarProps {
  value: number
  customStyles?: string
}

export const Progressbar: FC<IProgressBarProps> = ({value, customStyles}) => {
  const progressbarClassnames = classNames('progressbar', {
    [customStyles ?? '']: !!customStyles,
  })

  return (
    <div className={progressbarClassnames}>
      <div className="progressbar__indicator" style={{width: rem(value)}} />
    </div>
  )
}
