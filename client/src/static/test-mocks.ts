import type {IMessage} from 'models/message'
import type {IDialog} from 'models/dialog'
import type {IUser} from 'models/user'
import {Status} from 'models/common/status'

export const MESSAGE: IMessage = {
  read: false,
  attachments: [],
  id: 'id',
  dialog: 'dialog_id',
  author: {
    avatar: '',
    confirmed: false,
    email: 'foo@bar.baz',
    id: '123',
    full_name: 'name',
    createdAt: new Date('01-01-01'),
    updatedAt: new Date('01-01-01'),
    last_seen: new Date('01-01-01'),
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
    createdAt: new Date('01-01-01'),
    updatedAt: new Date('01-01-01'),
    last_seen: new Date('01-01-01'),
  },
  lastMessage: 'lastMessage',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  messages: 1,
  status: Status.ACTIVE,
  readStatus: null,
}

export const USER: IUser = {
  avatar: null,
  confirmed: false,
  createdAt: new Date(),
  email: 'email',
  full_name: 'full name',
  last_seen: new Date(),
  updatedAt: new Date(),
  id: 'id',
}
