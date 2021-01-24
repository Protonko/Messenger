import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  KeyboardEvent,
  ClipboardEvent,
  TouchEvent,
  Ref,
} from 'react'

export type TInputTypes =
  | 'number'
  | 'card'
  | 'email'
  | 'file'
  | 'hidden'
  | 'money'
  | 'password'
  | 'tel'
  | 'text'

export interface IInput {
  /**
   * @default 'text'
   */
  type?: TInputTypes
  view?: 'default' | 'filled'
  width?: 'default' | 'available'
  autocomplete?: boolean | string
  disabled?: boolean
  disabledAttr?: boolean
  focused?: boolean
  maxLength?: number
  clear?: boolean
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  tabIndex?: number
  pattern?: string
  placeholder?: string
  title?: string
  required?: boolean
  inputRef?: Ref<HTMLInputElement>
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event?: FocusEvent<any>) => void
  onClick?: (event?: MouseEvent<any>) => void
  onBlur?: (event?: FocusEvent<any>) => void
  onClearClick?: (event?: MouseEvent<any>) => void
  onKeyDown?: (event?: KeyboardEvent<any>) => void
  onKeyUp?: (event?: KeyboardEvent<any>) => void
  onPaste?: (event?: ClipboardEvent<any>) => void
  onTouchStart?: (event?: TouchEvent<any>) => void
  onTouchEnd?: (event?: TouchEvent<any>) => void
  onTouchMove?: (event?: TouchEvent<any>) => void
  onTouchCancel?: (event?: TouchEvent<any>) => void
  onProcessMaskInputEvent?: (event?: ChangeEvent<any>) => void
}
