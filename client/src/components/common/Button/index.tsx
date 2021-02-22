import {FC, HTMLProps, ReactNode} from 'react'
import classNames from 'classnames'

export interface IPropsButton extends HTMLProps<HTMLButtonElement> {
  /*
   * button text
   */
  text?: string

  /*
   * button right icon
   */
  icon?: ReactNode

  /*
   * list of arbitrary elements in the left slot
   */
  leftAddons?: ReactNode

  /*
   * list of arbitrary elements in the right slot
   */
  rightAddons?: ReactNode

  /*
   * button behavior
   */
  type?: 'button' | 'submit' | 'reset'

  /*
   * button modifier
   */
  modifier?: 'bordered' | 'circle' | 'linking'

  /*
   * button additional className
   */
  additionalClassName?: string

  /*
   *  button disabled
   */
  disabled?: boolean
}

export const Button: FC<IPropsButton> = ({
  text,
  icon,
  leftAddons,
  rightAddons,
  type = 'button',
  modifier,
  additionalClassName,
  disabled,
  ...buttonProps
}) => {
  const buttonClassNames = classNames([
    'button',
    {'button--disabled': !!disabled},
    {[`button--${modifier}`]: !!modifier},
    {[additionalClassName ?? '']: !!additionalClassName},
  ])
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
    <button
      className={buttonClassNames}
      disabled={disabled}
      type={type}
      {...buttonProps}
    >
      {leftAddons}
      {renderButtonContent()}
      {rightAddons}
    </button>
  )
}
