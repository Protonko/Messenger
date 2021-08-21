import type {ValidationError} from 'express-validator'

export interface IError {
  stringValue: string
  kind: string
  value: string
  path: string
  reason: Object
}

export interface IValidationErrors {
  errors: ValidationError[]
}
