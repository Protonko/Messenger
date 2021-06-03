import type {IFile} from 'models/file'
import type {IUser} from 'models/user'

export interface ICreateMessageBody {
  id: string
  text: string
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
