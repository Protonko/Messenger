import {model, Schema} from 'mongoose'
import {User} from './User'
import {IMessage} from './types/message';

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
  attachments: [{
      type: Schema.Types.ObjectId,
      ref: 'UploadFile',
  }],
}, {
  timestamps: true,
  usePushEach: true,
})

export const Message = model<IMessage>('Message', MessageSchema)

