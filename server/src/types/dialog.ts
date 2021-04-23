import {Document} from 'mongoose'
import {IUser, IUserMongoose} from './user'
import {IMessage} from './message'

export interface IDialogMongoose extends Document {
  author: IUserMongoose,
  interlocutor: IUserMongoose,
  last_message?: IMessage,
  messages?: number,
  createdAt: string,
  updatedAt: string,
}

export interface IDialog {
  id: string,
  name: string,
  description: string,
  avatar: string,
  edited: boolean,
  createdAt: string,
  updatedAt: string,
  messages: number,
}
