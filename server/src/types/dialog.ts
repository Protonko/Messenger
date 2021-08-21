import type {IUser, IUserMongoose} from './user'
import type {IMessage, IMessageMongoose} from './message'
import {Document} from 'mongoose'

export interface IDialogUnpopulatedUsers {
  _id: string
  author: string
  interlocutor: string
  last_message?: IMessageMongoose
  messages?: number
  createdAt: string
  updatedAt: string
  muted: boolean
}

export interface IDialogMongoose extends Document {
  _id: string
  author: IUserMongoose
  interlocutor: IUserMongoose
  last_message?: IMessageMongoose
  messages?: number
  createdAt: string
  updatedAt: string
  muted: boolean
}

export interface IDialog {
  id: string
  interlocutor: IUser
  lastMessage?: IMessage
  createdAt: string
  updatedAt: string
  messages: number
  muted: boolean
}

export interface IDialogCreateBody {
  author: string
  text: string
  interlocutor: string
}
