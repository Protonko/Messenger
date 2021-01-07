import {Document} from 'mongoose';
import {IUser} from './user';

export interface IMessage extends Document {
  author: IUser,
  partner: string,
  dialog: string,
  text: string,
  read: boolean,
}
