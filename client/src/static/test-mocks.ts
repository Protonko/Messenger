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
    createdAt: new Date('2021-08-19').toISOString(),
    last_seen: new Date('2021-08-21').toISOString(),
    updatedAt: new Date('2021-08-20').toISOString(),
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
    createdAt: new Date('2021-08-19').toISOString(),
    last_seen: new Date('2021-08-21').toISOString(),
    updatedAt: new Date('2021-08-20').toISOString(),
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
  createdAt: new Date('2021-08-19').toISOString(),
  email: 'email',
  full_name: 'full name',
  last_seen: new Date('2021-08-21').toISOString(),
  updatedAt: new Date('2021-08-20').toISOString(),
  id: 'id',
}
