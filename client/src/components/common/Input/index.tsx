// types
import {IInput} from 'models/common/input'

import {FC} from 'react'
import classNames from 'classnames'

export interface IPropsInput extends IInput {
  withLabel?: boolean
  className?: string
  error?: boolean | string
}

export const Input: FC<IPropsInput> = ({
  withLabel = true,
  value,
  placeholder,
  name,
  className,
  error,
  ...inputProps
}) => {
  const inputClassNames = classNames([
    'input',
    {'input--has-value': !!value},
    {'input--incorrect': !!error},
    {[className ?? '']: !!className}
  ])

  return (
    <div className={inputClassNames}>
      <input
        value={value}
        name={name}
        type="text"
        placeholder={withLabel ? undefined : placeholder}
        className="input__form"
        {...inputProps}
      />
      {withLabel && (
        <label htmlFor={name} className="input__label">
          {error || placeholder}
        </label>
      )}
    </div>
  )
}
