// types
import {TextTypes} from 'models/common/text'
import {FormTypes} from 'models/common/auth'
import {IInputForm} from './static'

import {FC, useEffect, useState, useCallback} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {INPUTS_DATA} from './static'
import {FORM_DATA} from './static'
import {Text} from 'components/common/Text'
import {Input} from 'components/common/Input'
import {Button} from 'components/common/Button'

export const AuthForm: FC = () => {
  const [inputsData, setInputsData] = useState(INPUTS_DATA)
  const [typeAuth, setTypeAuth] = useState<FormTypes>(FormTypes.auth);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
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
      name: yup
        .string()
        .required('Field is required'),
    }),
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  useEffect(() => {
    formik.setErrors({})

    if (typeAuth === FormTypes.register) {
      setInputsData([
        ...inputsData,
        {
          id: 2,
          name: 'name',
          type: 'text',
          placeholder: 'Your name',
        }
      ])
    } else {
      setInputsData(
        inputsData.filter(input => input.name !== 'name')
      )
    }
  }, [typeAuth])

  const handleClickLinkingButton = useCallback(() => {
    setTypeAuth(FormTypes[typeAuth === 'register' ? 'auth' : 'register'])
  }, [setTypeAuth, typeAuth])

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
        {FORM_DATA[typeAuth].title}
      </Text>

      <Text type={TextTypes.p} customStyles="auth-form__description">
        {FORM_DATA[typeAuth].description}
      </Text>

      <div className="auth-form__inputs">
        <ul className="list list--reset auth-form__inputs-list">
          {inputsData.map(renderInputs)}
        </ul>
      </div>

      <div className="auth-form__buttons">
        <ul className="list list--reset auth-form__buttons-list">
          <li className="auth-form__buttons-item">
            <Button
              text={FORM_DATA[typeAuth].buttonTitle}
              type="submit"
              additionalClassName="auth-form__button"
            />
          </li>
          <li className="auth-form__buttons-item">
            <Button
              text={FORM_DATA[typeAuth].linkingButtonTitle}
              modifier="linking"
              additionalClassName="auth-form__button"
              onClick={handleClickLinkingButton}
            />
          </li>
        </ul>
      </div>
    </form>
  )
}
