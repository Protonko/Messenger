import type {IUser, IUserMongoose} from './user'
import {Document} from 'mongoose'

export interface IMessageMongoose extends Document {
  _id: string
  user: IUserMongoose
  text: string
  dialog: string
  last_message: IMessageMongoose
  createdAt: string
  updatedAt: string
  read: boolean
  attachment: string
}

export interface IMessage {
  id: string
  author: IUser
  text: string
  dialog: string
  createdAt: string
  updatedAt: string
  read: boolean
  attachment: string
}

export interface IMessageCreateBody {
  text: string
  dialog: string
  interlocutor: string
  attachment: string
}
