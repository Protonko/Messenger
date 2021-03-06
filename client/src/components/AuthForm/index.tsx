// types
import {TextTypes} from 'models/common/text'
import {FormTypes} from 'models/auth'
import {RootState} from 'store/reducers'

import {ChangeEvent, FC, useCallback, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {login, signUp, resetErrorMessage} from 'store/actions/auth'
import {
  IInputForm,
  FORM_DATA,
  INPUT_NAME_DATA,
  INPUTS_DATA
} from './static'
import {Text} from 'components/common/Text'
import {Input} from 'components/common/Input'
import {Button} from 'components/common/Button'

export const AuthForm: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {errorMessage} = useSelector((state: RootState) => state.auth)
  const [inputsData, setInputsData] = useState(INPUTS_DATA)
  const [typeAuth, setTypeAuth] = useState<FormTypes>(FormTypes.auth)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      full_name: '',
      isRegister: false,
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Incorrect email address')
        .required('Field  is required'),
      password: yup
        .string()
        .min(6, 'The minimum password length is 6 characters')
        .required('Field is required'),
      isRegister: yup.boolean().default(false),
      full_name: typeAuth === FormTypes.register
        ? yup.string().required('Field is required')
        : yup.string().notRequired()
    }),
    onSubmit: ({email, password, full_name}) => {
      if (typeAuth === FormTypes.register) {
        dispatch(signUp({email, password, full_name}))
      } else {
        dispatch(login({email, password}))
      }
    },
  })

  useEffect(() => () => {
    dispatch(resetErrorMessage())
  }, [dispatch])

  useEffect(() => {
    if (errorMessage === false) {
      history.push('dialogs')
    }
  }, [errorMessage, history])

  useEffect(() => {
    formik.setErrors({})
    formik.resetForm()

    if (typeAuth === FormTypes.register) {
      setInputsData(prev => ([
        ...prev,
        INPUT_NAME_DATA,
      ]))
    } else {
      setInputsData(prev => prev.filter(input => input.name !== 'full_name'))
    }
  }, [typeAuth])

  const handleClickLinkingButton = useCallback(() => {
    setTypeAuth(FormTypes[typeAuth === 'register' ? 'auth' : 'register'])
  }, [setTypeAuth, typeAuth])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (errorMessage) {
      dispatch(resetErrorMessage())
    }

    formik.handleChange(event)
  }

  const renderInputs = ({id, name, placeholder, type}: IInputForm) => {
    return (
      <li key={id} className="auth-form__input">
        <Input
          value={formik.values[name]}
          onChange={onChange}
          name={name}
          type={type}
          placeholder={placeholder}
          error={(formik.touched[name] && formik.errors[name]) || errorMessage}
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
