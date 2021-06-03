import {Document} from 'mongoose'
import {IUser, IUserMongoose} from './user'
import {IMessageMongoose} from './message'

export enum ReadStatus {
  SENT = 'SENT',
  READ = 'READ',
}

export interface IDialogMongoose extends Document {
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
  read: boolean,
}
