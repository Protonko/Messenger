export const PATHS = ['/user/login', '/user/signup']

export enum EVENTS_SOCKET {
  CONNECTION = 'connection',
  NEW_MESSAGE = 'MESSAGE:CREATE',
  READ_MESSAGE = 'MESSAGE:READ',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  TYPING_MESSAGE = 'MESSAGE:TYPING',
  START_CALL = 'START_CALL',
  DECLINE_CALL = 'DECLINE_CALL',
  RELAY_ICE = 'RELAY_ICE',
  RELAY_SESSION_DESCRIPTION = 'RELAY_SESSION_DESCRIPTION',
  SESSION_DESCRIPTION = 'SESSION_DESCRIPTION',
  ICE_CANDIDATE = 'ICE_CANDIDATE',
}
