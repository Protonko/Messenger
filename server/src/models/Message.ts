import type {IMessageMongoose} from '../types/message';
import {model, Schema} from 'mongoose'
import {User} from './User'

const MessageSchema = new Schema({
  text: String,
  read: {
    type: Boolean,
    default: false,
  },
  dialog: {
    type: Schema.Types.ObjectId,
    ref: 'Dialog',
    require: true ,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  attachment: String,
}, {
  timestamps: true,
  usePushEach: true,
})

export const Message = model<IMessageMongoose>('Message', MessageSchema)

