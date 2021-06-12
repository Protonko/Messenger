export const PATHS = ['/user/login', '/user/signup']

export enum EVENTS_SOCKET {
  NEW_MESSAGE = 'MESSAGE:CREATE',
  READ_MESSAGE = 'MESSAGE:READ',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
}

export enum READ_STATUS {
  READ = 'READ',
  SENT = 'SENT',
  NEW = 'NEW',
}
