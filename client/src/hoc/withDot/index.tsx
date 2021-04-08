import type {ComponentType, FC} from 'react'
import type {TNumberOfLines} from 'models/common/text'
import Dotdotdot from 'react-dotdotdot'

interface IWithDotsProps {
  numberOfLines?: TNumberOfLines
}

export const withDot = <P extends object>(
  WrappedComponent: ComponentType<P>,
): FC<P & IWithDotsProps> => ({
  numberOfLines = Infinity,
  ...props
}) => {
  return (
    <Dotdotdot clamp={numberOfLines}>
      <WrappedComponent {...props as P} />
    </Dotdotdot>
  )
}
