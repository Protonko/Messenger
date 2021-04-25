import {Document} from 'mongoose'

export interface IMessage extends Document {
  text: string,
  dialog: string,
  read: boolean,
}
