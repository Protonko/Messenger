import {IDialogMongoose, IDialog} from '../../types/dialog'
import {userMapper} from './userMapper'
import {READ_STATUS} from '../../static'

export const dialogMapper = (dialog: IDialogMongoose, authorId: string | null): IDialog => {
  let readStatus: READ_STATUS
  const user = dialog.interlocutor._id.toString() === authorId?.toString()
    ? dialog.author
    : dialog.interlocutor

  if (dialog.last_message?.user.toString() === authorId?.toString()) {
    readStatus = READ_STATUS.SENT
  } else if (!!dialog.last_message?.read) {
    readStatus = READ_STATUS.READ
  } else {
    readStatus = READ_STATUS.NEW
  }

  return ({
    id: dialog._id,
    interlocutor: userMapper(user),
    createdAt: dialog.createdAt,
    updatedAt: dialog.updatedAt === dialog.updatedAt ? '' : dialog.updatedAt,
    messages: dialog.messages ?? 0,
    muted: dialog.muted,
    readStatus,
    lastMessage: dialog.last_message?.text ?? '',
  })
}
