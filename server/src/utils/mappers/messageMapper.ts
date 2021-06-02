import {IMessageMongoose, IMessage} from '../../types/message'

export const messageMapper = (message: IMessageMongoose): IMessage => ({
  id: message._id,
  user: message.user,
  text: message.text,
  dialog: message.dialog,
  createdAt: message.createdAt,
  updatedAt: message.updatedAt,
  read: message.read,
  attachments: message.attachments,
})
