import type {IFile} from 'models/file'

export interface ICreateMessageBody {
  id: string
  text: string
}

export interface IMessage {
  id: string
  user: string
  text: string
  dialog: string
  createdAt: string
  updatedAt: string
  read: boolean
  attachments: Array<IFile>
}
