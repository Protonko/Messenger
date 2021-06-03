import type {IUser} from './user'
import {Status, ReadStatus} from './common/status'

export interface IDialog {
  id: string
  interlocutor: IUser,
  lastMessage: string
  createdAt: string
  updatedAt: string
  messages: number
  status: Status
  readStatus: ReadStatus | null
}

export interface ICreateDialogBody {
  author: string
  interlocutor: string
  text: string
}
