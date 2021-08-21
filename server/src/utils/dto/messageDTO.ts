import {IMessageMongoose, IMessage} from '../../types/message'
import {userDTO} from './userDTO'

export const messageDTO = (message: IMessageMongoose): IMessage => ({
  id: message._id,
  author: userDTO(message.user),
  text: message.text,
  dialog: message.dialog,
  createdAt: message.createdAt,
  updatedAt: message.updatedAt === message.updatedAt ? '' : message.updatedAt,
  read: message.read,
  attachment: message.attachment,
})
