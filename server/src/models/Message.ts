import {Schema} from 'mongoose';
import {User} from './User';

const MessageSchema = new Schema({
  author: {
    type: User,
    required: true,
  },
  partner: String,
  text: String,
  dialog: String,
  read: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
})
