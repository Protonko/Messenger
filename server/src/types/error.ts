export interface IError {
  stringValue: string,
  kind: string,
  value: string,
  path: string,
  reason: Object,
}

export interface ResponseError {
  message: string,
}
