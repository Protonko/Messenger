import {IMessageMongoose, IMessage} from '../../types/message'
import {userMapper} from './userMapper'

export const messageMapper = (message: IMessageMongoose): IMessage => ({
  id: message._id,
  author: userMapper(message.user),
  text: message.text,
  dialog: message.dialog,
  createdAt: message.createdAt,
  updatedAt: message.updatedAt === message.updatedAt ? '' : message.updatedAt,
  read: message.read,
  attachments: message.attachments,
})
