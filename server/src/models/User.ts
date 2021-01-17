import {Schema, model} from 'mongoose'
import validator from 'validator'
import {IUser} from '../types/user'
import {generatePasswordHash} from '../utils/generatePaswordHash'

const schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'Invalid email.'],
  },
  avatar: {
    type: String,
    default: null,
  },
  full_name: {
    type: String,
    required: 'Full name is required.',
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

schema.pre<IUser>('save', async function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  try {
    user.password = await generatePasswordHash(user.password)
    user.confirm_hash = await generatePasswordHash(new Date().toString())
  } catch (e) {
    console.warn('User schema:', e)
  }
})

export const User = model<IUser>('User', schema)
