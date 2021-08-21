import {Document} from 'mongoose'
import {IUser, IUserMongoose} from './user'

export interface IMessageMongoose extends Document {
  _id: string,
  user: IUserMongoose,
  text: string,
  dialog: string,
  last_message: IMessageMongoose,
  createdAt: string,
  updatedAt: string,
  read: boolean,
  attachment: string,
}

export interface IMessage {
  id: string,
  author: IUser,
  text: string,
  dialog: string,
  createdAt: string,
  updatedAt: string,
  read: boolean,
  attachment: string,
}

export interface IMessageCreateBody {
  text: string,
  dialog: string,
  interlocutor: string,
  attachment: string,
}
