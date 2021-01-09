import {Schema, model} from 'mongoose'
// @ts-ignore
import {isEmail} from 'validator'
import {IUser} from './types/user';

const schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, 'Invalid email'],
  },
  avatar: {
    type: String,
    default: null,
  },
  full_name: {
    type: String,
    required: 'Full name is required',
  },
  password: {
    type: String,
    required: true,
  },
  confirm_hash: String,
  confirmed: {
    type: Boolean,
    default: false,
  },
  last_seen: {
    type: Date,
    default: new Date(),
  },
}, {
  timestamps: true,
})

export const User = model<IUser>('User', schema)
