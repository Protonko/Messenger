import {IDialogMongoose, IDialog} from '../../types/dialog'
import {userMapper} from './userMapper'

export const dialogMapper = (dialog: IDialogMongoose): IDialog => {
  return ({
    id: dialog._id,
    interlocutor: userMapper(dialog.interlocutor),
    createdAt: dialog.createdAt,
    updatedAt: dialog.updatedAt === dialog.updatedAt ? '' : dialog.updatedAt,
    messages: dialog.messages ?? 0,
    muted: dialog.muted,
    read: !!dialog.last_message?.read,
    lastMessage: dialog.last_message?.text ?? '',
  })
}
