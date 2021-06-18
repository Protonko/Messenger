import {Request, Response} from 'express'
import {Server} from 'socket.io'
import {EVENTS_SOCKET} from '../static'
import {Message} from '../models/Message'
import {Dialog} from '../models/Dialog'
import {IError} from '../types/error'
import {IMessageMongoose} from '../types/message'
import {IDialogMongoose, IDialogUnpopulatedUsers} from '../types/dialog'
import {messageMapper} from '../utils/mappers/messageMapper'

export class MessageController {
  private io: Server

  constructor(io: Server) {
    this.io = io

    this.create = this.create.bind(this)
    this.find = this.find.bind(this)
    this.updateReadStatus = this.updateReadStatus.bind(this)
  }

  async find(request: Request, response: Response) {
    // @ts-ignore
    const userId: string | null = request.user?._id ?? null
    const {dialog} = request.query

    if (typeof dialog !== 'string') {
      return response
        .status(400)
        .json({message: 'id should be string!'})
    }

    await Dialog
      .findOne({_id: dialog})
      .populate(['last_message'])
      .exec((error: IError, result: IDialogUnpopulatedUsers) => {
        try {
          if (error) {
            return response
              .status(500)
              .json({message: error.value})
          }

          const interlocutor = userId?.toString() === result.author.toString()
            ? result.interlocutor
            : result.author

          if (!result.last_message?.read && interlocutor) {
            this.clearUnreadMessages(dialog)
            this.updateReadStatus(dialog, response, interlocutor.toString())
          }
        } catch (error) {
          return response
            .status(500)
            .json({message: error.value})
        }
      })

    await Message
      .find({dialog})
      .populate(['user'])
      .exec((error: IError, messages: Array<IMessageMongoose>) => {
        try {
          if (error) {
            return response
              .status(404)
              .json({message: error.value})
          }

          return response.json(messages.map(messageMapper))
        } catch (error) {
          return response
            .status(500)
            .json({message: error.message})
        }
      })
  }

  async create(request: Request, response: Response) {
    // @ts-ignore
    const userId: string | null = request.user?._id ?? null
    const {text, dialog, interlocutor} = request.body

    if (!userId) {
      return response
        .status(400)
        .json({message: 'User id is not defined!'})
    }

    try {
      const message = await new Message({text, user: userId, dialog}).save()

      await Message
        .findOne({_id: message.id})
        .populate(['user'])
        .exec((error: IError, message: IMessageMongoose) => {
          if (error) {
            return response
              .status(500)
              .json({message: error.value})
          }

          this.updateDialog(response, dialog, message)

          this.io.to(interlocutor).emit(EVENTS_SOCKET.NEW_MESSAGE, messageMapper(message))
          return response.json(messageMapper(message))
        })
    } catch (error) {
      return response
        .status(500)
        .json({message: error.message})
    }
  }

  async updateDialog(response: Response, dialog: string, message: IMessageMongoose) {
    await Dialog
      .findOne({_id: dialog})
      .exec(async (error: IError, result: IDialogMongoose) => {
        if (error) {
          return response
            .status(500)
            .json({message: error.value})
        }

        await Dialog.findOneAndUpdate(
          {_id: dialog},
          {
            last_message: message,
            messages: (result.messages ?? 0) + 1,
          },
        )
      })
  }

  async delete(request: Request, response: Response) {
    // message id
    const {id} = request.query
    const message: IMessageMongoose | void =
      typeof id === 'string' ? await Message.findOneAndRemove({_id: id}) : undefined

    try {
      if (!message) {
        return response
          .status(404)
          .json({message: 'Message not found'})
      }

      return response.json({message: 'Message deleted'})
    } catch (error) {
      return response
        .status(500)
        .json({message: error.message})
    }
  }

  clearUnreadMessages(dialog: string) {
    Dialog.findOneAndUpdate(
      {_id: dialog},
      {
        messages: 0,
      },
    )
  }

  updateReadStatus(dialog: string, response: Response, interlocutor: string) {
    Message
      .updateMany({dialog},
        {$set: {read: true}},
      )
      .exec((error: IError) => {
        try {
          if (error) {
            return response.status(500).json({message: error.value})
          } else {
            this.io.to(interlocutor).emit(EVENTS_SOCKET.READ_MESSAGE, dialog)
          }
        } catch (error) {
          return response
            .status(500)
            .json({message: error.message})
        }
      })
  }
}
