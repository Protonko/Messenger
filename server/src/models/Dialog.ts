import {model, Schema} from 'mongoose'
import {IDialog} from '../types/dialog'

const DialogSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  interlocutor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  last_message: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
}, {
  timestamps: true
})

export const Dialog = model<IDialog>('Dialog', DialogSchema)
