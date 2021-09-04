import type {IMessage} from 'models/message'

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
