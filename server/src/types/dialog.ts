import {Document} from 'mongoose'
import {IUserMongoose} from './user'
import {IMessage} from './message'

export interface IDialog extends Document {
  author: IUserMongoose,
  partner: IUserMongoose,
  last_message: IMessage,
}
