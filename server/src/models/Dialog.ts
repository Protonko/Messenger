import type {IDialogMongoose} from '../types/dialog'
import {model, Schema} from 'mongoose'

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
  messages: Number,
  mute: Schema.Types.Boolean,
  status: Schema.Types.String,
}, {
  timestamps: true
})

export const Dialog = model<IDialogMongoose>('Dialog', DialogSchema)
