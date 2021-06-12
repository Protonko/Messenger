import {Document} from 'mongoose'
import {IUser, IUserMongoose} from './user'
import {IMessageMongoose} from './message'
import {READ_STATUS} from '../static'

export interface IDialogUnpopulated {
  _id: string,
  author: string,
  interlocutor: string,
  last_message?: string,
  messages?: number,
  createdAt: string,
  updatedAt: string,
  muted: boolean,
}

export interface IDialogMongoose extends Document {
  _id: string,
  author: IUserMongoose,
  interlocutor: IUserMongoose,
  last_message?: IMessageMongoose,
  messages?: number,
  createdAt: string,
  updatedAt: string,
  muted: boolean,
}

export interface IDialog {
  id: string,
  interlocutor: IUser,
  lastMessage: string | null,
  createdAt: string,
  updatedAt: string,
  messages: number,
  muted: boolean,
  readStatus: READ_STATUS,
}
