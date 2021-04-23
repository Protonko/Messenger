import {Document} from 'mongoose'
import {IDialogMongoose} from './dialog'

export interface IMessage extends Document {
  text: string,
  dialog: IDialogMongoose,
  read: boolean,
}
