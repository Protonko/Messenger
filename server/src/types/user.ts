import {Document} from 'mongoose'

export interface IUserMongoose extends Document {
  _id: string,
  avatar: null | string,
  last_seen: Date,
  password: string,
  email: string,
  full_name: string,
  confirmed: boolean,
  confirm_hash?: string,
}

export interface IUser {
  id: string,
  avatar: null | string,
  last_seen: Date,
  email: string,
  full_name: string,
  confirmed: boolean,
  confirm_hash?: string,
}

export interface IUserAuthData {
  user: IUser,
  accessToken: string,
}

export interface IUserLoginBody {
  email: string,
  password: string,
}

export interface IUserCreateBody {
  email: string,
  password: string,
  full_name: string,
}
