import type {RootState} from 'store/reducers'
import {ChangeEvent, FC, useCallback, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {TextTypes} from 'models/common/text'
import {FormTypes} from 'models/auth'
import {login, resetErrorMessage, signUp} from 'store/actions/auth'
import {FORM_DATA, IInputForm, INPUT_NAME_DATA, INPUTS_DATA} from './static'
import {Text} from 'components/common/Text'
import {Input} from 'components/common/Input'
import {Button} from 'components/common/Button'
import {Modal} from 'components/common/Modal'

export const AuthForm: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {errorMessage, account} = useSelector((state: RootState) => state.auth)
  const [inputsData, setInputsData] = useState(INPUTS_DATA)
  const [modalVisibility, setModalVisibility] = useState(false)
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
      full_name:
        typeAuth === FormTypes.register
          ? yup.string().required('Field is required')
          : yup.string().notRequired(),
    }),
    onSubmit: ({email, password, full_name}) => {
      if (typeAuth === FormTypes.register) {
        dispatch(signUp({email, password, full_name}))
      } else {
        dispatch(login({email, password}))
      }
    },
  })

  useEffect(() => {
    if (errorMessage === false) {
      history.push('dialogs')
      dispatch(resetErrorMessage())
    }
  }, [errorMessage])

  useEffect(() => {
    if (account?.id && typeAuth === FormTypes.register) {
      setModalVisibility(true)
    }
  }, [account?.id])

  useEffect(() => {
    formik.setErrors({})
    formik.resetForm()

    if (typeAuth === FormTypes.register) {
      setInputsData((prev) => [...prev, INPUT_NAME_DATA])
    } else {
      setInputsData((prev) =>
        prev.filter((input) => input.name !== 'full_name'),
      )
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
          error={
            ((formik.touched[name] && formik.errors[name]) || errorMessage) ??
            undefined
          }
        />
      </li>
    )
  }

  const redirectToAuthScreen = () => {
    setModalVisibility(false)
    setTypeAuth(FormTypes.auth)
  }

  return (
    <>
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <Text type={TextTypes.h3}>{FORM_DATA[typeAuth].title}</Text>

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
      <Modal
        customStyles="auth-modal"
        width={350}
        height={170}
        modalVisibility={modalVisibility}
        toggleVisibilityModal={setModalVisibility}
        onClose={redirectToAuthScreen}
      >
        <div className="auth-modal__section auth-modal__section--content">
          <Text type={TextTypes.h3} customStyles="auth__modal-title">
            Success!
          </Text>
          <Text type={TextTypes.p} customStyles="auth-modal__description">
            Registration successfully completed. Click on the "OK" button to
            enter the system
          </Text>
        </div>
        <footer className="auth-modal__section auth-modal__section--footer">
          <Button modifier="linking" text="OK" onClick={redirectToAuthScreen} />
        </footer>
      </Modal>
    </>
  )
}
