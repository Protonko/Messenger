import type {IDialog} from 'models/dialog'
import {Status} from 'models/common/status'
import {MESSAGE} from './message'

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
