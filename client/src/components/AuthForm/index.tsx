// types
import {TextTypes} from 'models/common/text'
import {FormTypes} from 'models/common/auth'
import {TInputTypes} from 'models/common/input'

import {FC, useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {Text} from 'components/common/Text'
import {Input} from 'components/common/Input'
import {Button} from 'components/common/Button'

export interface IPropsAuthForm {
  title: string
  description?: string
  type?: FormTypes
}

interface IInputForm {
  id: number
  name: 'email' | 'password'
  placeholder: string
  type: TInputTypes
}

const INPUTS_DATA: Array<IInputForm> = [{
  id: 0,
  name: 'email',
  placeholder: 'Email',
  type: 'text',
}]

export const AuthForm: FC<IPropsAuthForm> = ({
  title,
  description,
  type = FormTypes.auth,
}) => {
  const [inputsData, setInputsData] = useState(INPUTS_DATA)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Incorrect email address')
        .required('Field is required'),
      password: yup
        .string()
        .min(6, 'The minimum password length is 6 characters')
        .required('Field is required'),
    }),
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  useEffect(() => {
    if (type === FormTypes.auth) {
      setInputsData([
        ...inputsData,
        {
          id: 1,
          name: 'password',
          type: 'password',
          placeholder: 'Password',
        }
      ])
    }
  }, [])

  const renderInputs = (elem: IInputForm) => {
    const {name, placeholder, type} = elem

    return (
      <li key={elem.id} className="auth-form__input">
        <Input
          value={formik.values[name]}
          onChange={formik.handleChange}
          name={name}
          type={type}
          placeholder={placeholder}
          error={formik.touched[name] && formik.errors[name]}
        />
      </li>
    )
  }

  return (
    <form className="auth-form" onSubmit={formik.handleSubmit}>
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
          {inputsData.map(renderInputs)}
        </ul>
      </div>

      <div className="auth-form__buttons">
        <ul className="list list--reset auth-form__buttons-list">
          <li className="auth-form__buttons-item">
            <Button
              text="Log In"
              type="submit"
              additionalClassName="auth-form__button"
            />
          </li>
          <li className="auth-form__buttons-item">
            <Button
              text="Create New Account"
              modifier="linking"
              additionalClassName="auth-form__button"
            />
          </li>
        </ul>
      </div>
    </form>
  )
}
