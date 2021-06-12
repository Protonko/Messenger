import {IDialogMongoose, IDialog} from '../../types/dialog'
import {userMapper} from './userMapper'
import {messageMapper} from './messageMapper'

export const dialogMapper = (dialog: IDialogMongoose, authorId: string | null): IDialog => {
  const user = dialog.interlocutor._id.toString() === authorId?.toString()
    ? dialog.author
    : dialog.interlocutor

  return ({
    id: dialog._id,
    interlocutor: userMapper(user),
    createdAt: dialog.createdAt,
    updatedAt: dialog.updatedAt === dialog.updatedAt ? '' : dialog.updatedAt,
    messages: dialog.messages ?? 0,
    muted: dialog.muted,
    lastMessage: dialog.last_message && messageMapper(dialog.last_message)
  })
}
