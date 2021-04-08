import {Status, ReadStatus} from './common/status'

export interface IDialog {
  name: string
  description: string
  avatar: string
  date: string
  time: string | null
  messages: number
  status: Status
  readStatus: ReadStatus | null
}
