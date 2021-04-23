import {IDialogMongoose, IDialog} from '../../types/dialog'

export const dialogMapper = (dialog: IDialogMongoose): IDialog => ({
  id: dialog.id,
  name: dialog.interlocutor.full_name,
  description: dialog.last_message?.text ?? '',
  avatar: dialog.interlocutor.avatar ?? '',
  edited: dialog.createdAt !== dialog.updatedAt,
  createdAt: dialog.createdAt,
  updatedAt: dialog.updatedAt,
  messages: dialog.messages ?? 0,
})
