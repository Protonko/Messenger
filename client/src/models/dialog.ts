import type {IUser} from './user'
import type {IMessage} from './message'
import {Status} from './common/status'

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
