import {Status, ReadStatus} from './common/status';

export interface IDialog {
  name: string,
  description: string,
  avatar: string,
  date: string | null,
  time: string | null,
  status: Status,
  readStatus: ReadStatus | null,
}
