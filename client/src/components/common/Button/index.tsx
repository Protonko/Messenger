import {FC, HTMLProps, ReactNode} from 'react'

interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  text?: string
  icon?: ReactNode
  leftAddons?: ReactNode
  rightAddons?: ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export const Button: FC<IButtonProps> = ({
  text,
  icon,
  leftAddons,
  rightAddons,
  ...buttonProps
}) => {
  const renderButtonContent = () => {
    return (
      <>
        {text && (
          <span className="button__text">
            {text}
          </span>
        )}
        {icon && (
          <span className="button__icon">
            {icon}
          </span>
        )}
      </>
    )
  }

  return (
    <button className="button" {...buttonProps}>
      {leftAddons}
      {renderButtonContent()}
      {rightAddons}
    </button>
  )
}
