import {Status, ReadStatus} from './common/status'

export interface IDialog {
  id: string
  name: string
  lastMessage: string
  avatar: string
  edited: boolean
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
