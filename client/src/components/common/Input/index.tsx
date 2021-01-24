// types
import {IInput} from 'models/common/input'

import {FC} from 'react'
import classNames from 'classnames'

export interface IPropsInput extends IInput {
  withLabel?: boolean
}

export const Input: FC<IPropsInput> = ({
  withLabel = true,
  value,
  placeholder,
  name,
  ...inputProps
}) => {
  const inputClassNames = classNames([
    'input',
    {'input--has-value': !!value}
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
