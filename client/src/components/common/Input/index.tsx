// types
import {IInput} from 'models/common/input'

import {FC} from 'react'
import classNames from 'classnames'

export interface IPropsInput extends IInput {
  withLabel?: boolean
  className?: string
}

export const Input: FC<IPropsInput> = ({
  withLabel = true,
  value,
  placeholder,
  name,
  className,
  ...inputProps
}) => {
  const inputClassNames = classNames([
    'input',
    {'input--has-value': !!value},
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
          {placeholder}
        </label>
      )}
    </div>
  )
}
