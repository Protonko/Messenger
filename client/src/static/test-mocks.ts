import type {IMessage} from 'models/message'
import type {IDialog} from 'models/dialog'
import type {IUser} from 'models/user'
import {Status} from 'models/common/status'

export const MESSAGE: IMessage = {
  read: false,
  attachment: '',
  id: 'id',
  dialog: 'dialog_id',
  author: {
    avatar: '',
    confirmed: false,
    email: 'foo@bar.baz',
    id: '123',
    full_name: 'name',
    createdAt: '2021-08-19T00:00:00.000Z',
    last_seen: '2021-08-21T00:00:00.000Z',
    updatedAt: '2021-08-20T00:00:00.000Z',
  },
  text: 'text',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

export const DIALOG: IDialog = {
  id: 'id',
  interlocutor: {
    avatar: null,
    confirmed: false,
    email: 'foo@bar.baz',
    id: '123',
    full_name: 'name',
    createdAt: '2021-08-19T00:00:00.000Z',
    last_seen: '2021-08-21T00:00:00.000Z',
    updatedAt: '2021-08-20T00:00:00.000Z',
  },
  lastMessage: MESSAGE,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  messages: 1,
  status: Status.ACTIVE,
}

export const USER: IUser = {
  avatar: null,
  confirmed: false,
  email: 'email',
  full_name: 'full name',
  createdAt: '2021-08-19T00:00:00.000Z',
  last_seen: '2021-08-21T00:00:00.000Z',
  updatedAt: '2021-08-20T00:00:00.000Z',
  id: 'id',
}
