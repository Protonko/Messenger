import {Request, Response} from 'express'
import {Dialog} from '../models/Dialog'
import {Message} from '../models/Message'
import {IError} from '../models/types/error'
import {IDialog} from '../models/types/dialog'

export class DialogController {
  find(request: Request, response: Response) {
    // @ts-ignore
    const authorEmail = request.user?.email ?? null

    // @ts-ignore
    Dialog
      .find({author: '5ffb4eaf0dd3f211e62772cf'})
      .populate(['author', 'interlocutor'])
      .exec((error: IError, dialogs: IDialog) => {
        try {
          if (error) {
            return response
              .status(404)
              .json({message: 'Dialogs not found'})
          }

          return response.json(dialogs)
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

      console.log(createdDialog)
      const message = new Message({
        text,
        dialog: createdDialog._id,
        user: author,
      })
      const createdMessage = await message.save()

      response.json({
        dialog: createdDialog,
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
