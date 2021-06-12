import type {IUser} from './user'
import {Status} from './common/status'
import {IMessage} from './message'

export interface IDialog {
  id: string
  interlocutor: IUser
  lastMessage?: IMessage
  createdAt: string
  updatedAt: string
  messages: number
  status: Status
}

export interface ICreateDialogBody {
  author: string
  interlocutor: string
  text: string
}
