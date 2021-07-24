import {IDialogMongoose, IDialog} from '../../types/dialog'
import {userDTO} from './userDTO'
import {messageDTO} from './messageDTO'

export const dialogDTO = (dialog: IDialogMongoose, authorId: string | null): IDialog => {
  const user = dialog.interlocutor._id.toString() === authorId?.toString()
    ? dialog.author
    : dialog.interlocutor

  return ({
    id: dialog._id,
    interlocutor: userDTO(user),
    createdAt: dialog.createdAt,
    updatedAt: dialog.updatedAt === dialog.updatedAt ? '' : dialog.updatedAt,
    messages: dialog.messages ?? 0,
    muted: dialog.muted,
    lastMessage: dialog.last_message && messageDTO(dialog.last_message)
  })
}
