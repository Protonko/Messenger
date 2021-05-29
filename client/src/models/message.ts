export interface ICreateMessageBody {
  id: string
  text: string
}

export interface ICreateMessageResponse {
  read: boolean
  // TODO: FIX
  attachments: Array<any>
  id: string
  user: string
  createdAt: string
  updatedAt: string
}

export interface IMessage {
  read: boolean
  // TODO: FIX
  attachments: Array<any>
  id: string
  user: string
  createdAt: string
  updatedAt: string
}
