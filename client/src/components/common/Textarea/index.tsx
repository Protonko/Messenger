import type {FC, DetailedHTMLProps, TextareaHTMLAttributes} from 'react'
import classNames from 'classnames'

type TTextArea = Omit<
    DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    'value' | 'onChange'
  >

export interface IPropsTextarea extends TTextArea {
  value: string
  onChange: (value: string) => void
}

export const Textarea: FC<IPropsTextarea> = ({
   placeholder,
   name,
   className,
   onChange,
   value,
   ...textareaProps
 }) => {
  const inputClassNames = classNames([
    'textarea',
    {[className ?? '']: !!className},
  ])

  return (
    <div className={inputClassNames}>
      <textarea
        value={value}
        onChange={event => onChange(event.target.value)}
        name={name}
        placeholder={placeholder}
        className="textarea__form"
        {...textareaProps}
      />
    </div>
  )
}
