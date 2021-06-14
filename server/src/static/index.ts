export const PATHS = ['/user/login', '/user/signup']

export enum EVENTS_SOCKET {
  CONNECTION = 'connection',
  NEW_MESSAGE = 'MESSAGE:CREATE',
  READ_MESSAGE = 'MESSAGE:READ',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  TYPING_MESSAGE = 'MESSAGE:TYPING',
}
