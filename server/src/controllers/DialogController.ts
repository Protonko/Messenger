import type {Server} from 'socket.io'
import type {Request, Response} from 'express'
import type {IError} from '../types/error'
import type {IDialog, IDialogCreateBody, IDialogMongoose} from '../types/dialog'
import type {IUser} from '../types/user'
import type {IResponseMessage} from '../types/response'
import * as core from 'express-serve-static-core'
import {Dialog} from '../models/Dialog'
import {Message} from '../models/Message'
import {dialogDTO} from '../utils/dto/dialogDTO'

export class DialogController {
  private io: Server

  constructor(io: Server) {
    this.io = io
  }

  async find(
    request: Request,
    response: Response<IResponseMessage | IDialog[]>,
  ) {
    const authorId = (request.user as IUser)?.id ?? null

    await Dialog.find()
      .or([{author: authorId}, {interlocutor: authorId}])
      .populate(['author', 'interlocutor', 'last_message'])
      .exec((error: IError, dialogs: Array<IDialogMongoose>) => {
        try {
          if (error) {
            return response.status(404).json({message: 'Chat not found'})
          }

          return response.json(
            dialogs.map((dialog) => dialogDTO(dialog, authorId)),
          )
        } catch (error) {
          return response.json({message: error.message})
        }
      })
  }

  async create(
    request: Request<core.ParamsDictionary, unknown, IDialogCreateBody>,
    response: Response<IResponseMessage | IDialog>,
  ) {
    let shouldContinue = true
    const authorId = (request.user as IUser)?.id ?? null
    const {author, text, interlocutor} = request.body

    try {
      await Dialog.findOne(
        // @ts-ignore
        {author, interlocutor},
        (error: IError, dialog: IDialogMongoose) => {
          if (error) {
            shouldContinue = false
            return response.status(404).json({message: error.value})
          }

          if (dialog) {
            shouldContinue = false
            return response.status(409).json({message: 'Dialog already exist'})
          }
        },
      )

      if (!shouldContinue) return

      const dialog = new Dialog({
        author,
        interlocutor,
        mute: false,
        status: null,
        messages: 0,
      })
      await dialog.save()
      const message = new Message({
        text,
        dialog: dialog._id,
        user: author,
      })
      await message.save()
      dialog.last_message = message
      await dialog.save()

      await Dialog.findOne({_id: dialog._id})
        .populate(['author', 'interlocutor', 'last_message'])
        .exec((error: IError, dialog: IDialogMongoose) => {
          try {
            if (error) {
              return response.status(404).json({message: 'Chat not found'})
            }

            return response.json(dialogDTO(dialog, authorId))
          } catch (error) {
            return response.json(error)
          }
        })
    } catch (error) {
      response.json({message: error.message})
    }
  }

  async delete(request: Request, response: Response<IResponseMessage>) {
    const {id} = request.params
    const dialog = await Dialog.findOneAndRemove({_id: id})

    try {
      if (!dialog) {
        return response.status(404).json({message: 'Dialog not found'})
      }

      return response.json({message: 'Dialog deleted'})
    } catch (error) {
      return response.json({message: error.message})
    }
  }
}
