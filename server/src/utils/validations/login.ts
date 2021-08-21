import {check} from 'express-validator'

export const loginValidation = [
  check('email', 'Incorrect email.').isEmail(),
  check('password', 'Min length of password is a 6 symbols.').isLength({
    min: 6,
  }),
]
