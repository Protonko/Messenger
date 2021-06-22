import {Request, Response} from 'express'
import {Server} from 'socket.io'
import {Dialog} from '../models/Dialog'
import {Message} from '../models/Message'
import {IError} from '../types/error'
import {IDialogMongoose} from '../types/dialog'
import {dialogMapper} from '../utils/mappers/dialogMapper'

export class DialogController {
  private io: Server

  constructor(io: Server) {
    this.io = io
  }

  async find(request: Request, response: Response) {
    // @ts-ignore
    const authorId = request.user?.id ?? null

    await Dialog
      .find()
      .or([{author: authorId}, {interlocutor: authorId}])
      .populate(['author', 'interlocutor', 'last_message'])
      .exec((error: IError, dialogs: Array<IDialogMongoose>) => {
        try {
          if (error) {
            return response
              .status(404)
              .json({message: 'Chat not found'})
          }

          return response.json(dialogs.map(dialog => dialogMapper(dialog, authorId)))
        } catch (error) {
          return response
            .json({error: error.message})
        }
      })
  }

  async create(request: Request, response: Response) {
    let shouldContinue = true
    // @ts-ignore
    const authorId = request.user?.id ?? null
    const {author, text, interlocutor} = request.body

    try {
      await Dialog
        .findOne(
          {author, interlocutor},
          (error: IError, dialog: IDialogMongoose) => {
            if (error) {
              shouldContinue = false
              return response
                .status(404)
                .json({message: error})
            }

            if (dialog) {
              shouldContinue = false
              return response
                .status(409)
                .json({message: 'Dialog already exist'})
            }
          }
        )

      if (!shouldContinue) return

      const dialog = new Dialog({author, interlocutor, mute: false, status: null, messages: 0})
      await dialog.save()
      const message = new Message({
        text,
        dialog: dialog._id,
        user: author,
      })
      await message.save()
      dialog.last_message = message
      await dialog.save()

      await Dialog
        .findOne({_id: dialog._id})
        .populate(['author', 'interlocutor', 'last_message'])
        .exec((error: IError, dialog: IDialogMongoose) => {
          try {
            if (error) {
              return response
                .status(404)
                .json({message: 'Chat not found'})
            }

            return response.json(dialogMapper(dialog, authorId))
          } catch (error) {
            return response
              .json(error)
          }
        })
    } catch (error) {
      response.json({error: error.message})
    }
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params

    const dialog = await Dialog.findOneAndRemove({_id: id})

    try {
      if (!dialog) {
        return response
          .status(404)
          .json({message: 'Dialog not found'})
      }

      return response.json({message: 'Dialog deleted'})
    } catch (error) {
      return response
        .json({message: error.message})
    }
  }
}
