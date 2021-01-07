import {model, Schema} from 'mongoose'
import {IDialog} from './types/dialog'

const DialogSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  interlocutor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  last_message: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
}, {
  timestamps: true
})

export const Dialog = model<IDialog>('Dialog', DialogSchema)
