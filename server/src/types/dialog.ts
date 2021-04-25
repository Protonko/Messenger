import {Document} from 'mongoose'
import {IUserMongoose} from './user'
import {IMessage} from './message'

export enum ReadStatus {
  SENT = 'SENT',
  READ = 'READ',
}

export interface IDialogMongoose extends Document {
  author: IUserMongoose,
  interlocutor: IUserMongoose,
  last_message?: IMessage,
  messages?: number,
  createdAt: string,
  updatedAt: string,
  muted: boolean,
}

export interface IDialog {
  id: string,
  name: string,
  avatar: string,
  edited: boolean,
  lastMessage: string | null,
  createdAt: string,
  updatedAt: string,
  messages: number,
  muted: boolean,
  read: boolean,
}
