// types
import {TNumberOfLines} from 'models/common/text';

import Dotdotdot from 'react-dotdotdot'
import {ComponentType, FC} from 'react'

interface IWithDotsProps {
  numberOfLines?: TNumberOfLines
}

export const withDot = <P extends object>(
  WrappedComponent: ComponentType<P>,
): FC<P & IWithDotsProps> => ({
  numberOfLines = 'auto',
  ...props
}) => {
  return (
    <Dotdotdot clamp={numberOfLines}>
      <WrappedComponent {...props as P} />
    </Dotdotdot>
  )
}
