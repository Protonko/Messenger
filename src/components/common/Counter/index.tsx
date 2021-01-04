// types
import {Status} from 'models/common/status'

import {FC} from 'react'
import classNames from 'classnames'

export interface IPropsCounter {
  count: number | '99+',
  status?: Status,
}

export const Counter: FC<IPropsCounter> = ({
  count,
  status = Status.ACTIVE,
}) => {
  const classNameStatus = classNames(
    'counter',
    {'counter--muted': status === Status.MUTED}
  )

  return (
    <div className={classNameStatus}>
      <span className="counter__text">
        {count}
      </span>
    </div>
  )
}
