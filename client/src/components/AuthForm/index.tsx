// types
import {TextTypes} from 'models/common/text'
import {IInput} from 'models/common/input'

import {FC} from 'react'
import {Text} from 'components/common/Text'
import {Input} from 'components/common/Input'

export interface IPropsAuthForm {
  title: string
  description?: string
  inputs: Array<IInput>
}

export const AuthForm: FC<IPropsAuthForm> = ({
  title,
  description,
  inputs,
}) => {
  const renderInputs = (elem: IInput) => {
    const {name, placeholder, value, onChange} = elem

    return (
      <li key={elem.id} className="auth-form__input">
        <Input
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
        />
      </li>
    )
  }

  return (
    <div className="auth-form">
      <Text type={TextTypes.h3}>
        {title}
      </Text>

      {description && (
        <Text type={TextTypes.p} customStyles="auth-form__description">
          {description}
        </Text>
      )}

      <div className="auth-form__inputs">
        <ul className="list list--reset auth-form__inputs-list">
          <li className="auth-form__input">
            {inputs.map(renderInputs)}
          </li>
        </ul>
      </div>
    </div>
  )
}
