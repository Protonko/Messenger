import {Document} from 'mongoose';

export interface IUser extends Document {
  email: string,
  avatar: null | string,
  full_name: string,
  password: string,
  confirm_hash?: string,
  confirmed: boolean,
  last_seen: Date,
}
