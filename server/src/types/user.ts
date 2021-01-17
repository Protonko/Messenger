import {Document} from 'mongoose'

export interface ILoginUser {
  email: string,
  password: string,
}

export interface IUser extends Document {
  id: string,
  avatar: null | string,
  last_seen: Date,
  password: string,
  email: string,
  full_name: string,
  confirmed: boolean,
  confirm_hash?: string,
}
