import {Document} from 'mongoose'
import {IDialog} from './dialog'

export interface IMessage extends Document {
  text: string,
  dialog: IDialog,
  read: boolean,
}
