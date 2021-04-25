import {IDialogMongoose, IDialog} from '../../types/dialog'

export const dialogMapper = (dialog: IDialogMongoose): IDialog => {
  return ({
    id: dialog._id,
    name: dialog.interlocutor.full_name,
    avatar: dialog.interlocutor.avatar ?? '',
    edited: dialog.createdAt !== dialog.updatedAt,
    createdAt: dialog.createdAt,
    updatedAt: dialog.updatedAt,
    messages: dialog.messages ?? 0,
    muted: dialog.muted,
    read: !!dialog.last_message?.read,
    lastMessage: dialog.last_message?.text ?? '',
  })
}
