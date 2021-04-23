import {Request, Response} from 'express'
import {Server} from 'socket.io'
import {Dialog} from '../models/Dialog'
import {Message} from '../models/Message'
import {IError} from '../types/error'
import {IDialogMongoose} from '../types/dialog'
import {dialogMapper} from '../utils/mappers/dialogMapper'

export class DialogController {
  io: Server

  constructor(io: Server) {
    this.io = io
  }

  async find(request: Request, response: Response) {
    // @ts-ignore
    const authorId = request.user?._id ?? null;

    await Dialog
      .find({author: authorId})
      .populate(['author', 'interlocutor'])
      .exec((error: IError, dialogs: Array<IDialogMongoose>) => {
        try {
          if (error) {
            return response
              .status(404)
              .json({message: 'Chat not found'})
          }

          return response.json(dialogs.map(dialogMapper))
        } catch {
          return response
            .json({message: 'undefined error'})
        }
      })
  }

  async create(request: Request, response: Response) {
    const {author, text, interlocutor} = request.body

    try {
      const dialog = new Dialog({author, interlocutor})
      const createdDialog = await dialog.save()

      const message = new Message({
        text,
        dialog: createdDialog._id,
        user: author,
      })
      const createdMessage = await message.save()

      response.json({
        dialog: dialogMapper(createdDialog),
        message: createdMessage,
      })
    } catch (reason) {
      response.json(reason)
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
    } catch {
      return response
        .json({message: 'undefined error'})
    }
  }
}
