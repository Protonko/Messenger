import {
  useState,
  FC,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  ChangeEvent,
} from 'react'
import classNames from 'classnames'

type TTextArea = Omit<
    DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    'value' | 'onChange'
  >

export interface IPropsTextarea extends TTextArea {
  onChange?: (value: string) => void
}

export const Textarea: FC<IPropsTextarea> = ({
   placeholder,
   name,
   className,
   onChange,
   ...textareaProps
 }) => {
  const [value, setValue] = useState('')

  const onChangeValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
    onChange?.(event.target.value)
  }
  const inputClassNames = classNames([
    'textarea',
    {[className ?? '']: !!className},
  ])

  return (
    <div className={inputClassNames}>
      <textarea
        value={value}
        onChange={onChangeValue}
        name={name}
        placeholder={placeholder}
        className="textarea__form"
        {...textareaProps}
      />
    </div>
  )
}
