import {Document} from 'mongoose'
import {IFile} from '../models/File'

export interface IMessageMongoose extends Document {
  _id: string,
  user: string,
  text: string,
  dialog: string,
  createdAt: string,
  updatedAt: string,
  read: boolean,
  attachments: Array<IFile>,
}

export interface IMessage {
  id: string,
  user: string,
  text: string,
  dialog: string,
  createdAt: string,
  updatedAt: string,
  read: boolean,
  attachments: Array<IFile>,
}
