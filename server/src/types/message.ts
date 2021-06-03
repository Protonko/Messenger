import {Document} from 'mongoose'
import {IFile} from '../models/File'
import {IUser, IUserMongoose} from './user'

export interface IMessageMongoose extends Document {
  _id: string,
  user: IUserMongoose,
  text: string,
  dialog: string,
  createdAt: string,
  updatedAt: string,
  read: boolean,
  attachments: Array<IFile>,
}

export interface IMessage {
  id: string,
  author: IUser,
  text: string,
  dialog: string,
  createdAt: string,
  updatedAt: string,
  read: boolean,
  attachments: Array<IFile>,
}
