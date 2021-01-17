import {Document} from 'mongoose'
import {IUser} from './user'
import {IMessage} from './message'

export interface IDialog extends Document {
  author: IUser,
  partner: IUser,
  last_message: IMessage,
}
