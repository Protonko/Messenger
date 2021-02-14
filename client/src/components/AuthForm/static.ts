import {TInputTypes} from 'models/common/input'
import {FormTypes} from 'models/common/auth'

export interface IInputForm {
  id: number
  name: 'email' | 'password' | 'name',
  placeholder: string
  type: TInputTypes
}

export const FORM_DATA = {
  [FormTypes.auth]: {
    title: 'Sign in',
    description:
      'Note that you need an existing account to log in to this messenger. To sign up, use the button bellow.',
    buttonTitle: 'Log In',
    linkingButtonTitle: 'Create new account',
  },
  [FormTypes.register]: {
    title: 'Sign up',
    description: '',
    buttonTitle: 'Sign Up',
    linkingButtonTitle: 'I already have an account',
  },
}

export const INPUTS_DATA: Array<IInputForm> = [
  {
    id: 0,
    name: 'email',
    placeholder: 'Email',
    type: 'text',
  },
  {
    id: 1,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  }
]
