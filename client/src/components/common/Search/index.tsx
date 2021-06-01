import type {IInput} from 'models/common/input'
import {useState, ChangeEvent, FC} from 'react'
import classNames from 'classnames'
import {ReactComponent as Magnifier} from 'assets/icons/magnifier.svg'
import {Sizes} from 'models/common/sizes'

export interface IPropsSearch extends Omit<IInput, 'value' | 'onChange'> {
  size?: Sizes
  onChange?: (value: string) => void
  placeholder?: string
  customStyles?: string
}

export const Search: FC<IPropsSearch> = ({
  size = Sizes.MEDIUM,
  placeholder = 'Search...',
  customStyles,
  onChange,
  ...inputProps
}) => {
  const [value, setValue] = useState('')

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onChange?.(event.target.value)
  }

  const searchClassNames = classNames([
    'search',
    {'search--small': size === Sizes.SMALL},
    {'search--large': size === Sizes.LARGE},
    {[customStyles ?? '']: !!customStyles},
  ])

  return (
    <div className={searchClassNames}>
      <Magnifier className="search__icon" />
      <input
        type="search"
        className="search__input"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={onChangeValue}
        {...inputProps}
      />
    </div>
  )
}
