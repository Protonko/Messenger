import type {IFile} from 'models/file'
import type {IUser} from 'models/user'

export interface ICreateMessageBody {
  dialog: string
  text: string
  interlocutor: string
}

export interface IMessage {
  id: string
  author: IUser
  text: string
  dialog: string
  createdAt: string
  updatedAt: string
  read: boolean
  attachments: Array<IFile>
}
