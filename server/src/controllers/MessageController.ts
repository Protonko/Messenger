import type {Server} from 'socket.io'
import type {Request, Response} from 'express'
import type {IError} from '../types/error'
import type {IResponseMessage} from '../types/response'
import type {
  IMessage,
  IMessageCreateBody,
  IMessageMongoose,
} from '../types/message'
import type {IDialogMongoose, IDialogUnpopulatedUsers} from '../types/dialog'
import type {IUser} from '../types/user'
import * as core from 'express-serve-static-core'
import {Message} from '../models/Message'
import {Dialog} from '../models/Dialog'
import {messageDTO} from '../utils/dto/messageDTO'
import {EVENTS_SOCKET} from '../types/socketEvents'

export class MessageController {
  private io: Server

  constructor(io: Server) {
    this.io = io

    this.create = this.create.bind(this)
    this.find = this.find.bind(this)
    this.updateReadStatus = this.updateReadStatus.bind(this)
  }

  async find(
    request: Request,
    response: Response<IResponseMessage | IMessage[]>,
  ) {
    const userId = (request.user as IUser)?.id ?? null
    const {dialog} = request.query

    if (typeof dialog !== 'string') {
      return response.status(400).json({message: 'id should be string!'})
    }

    await Dialog.findOne({_id: dialog})
      .populate(['last_message'])
      .exec((error: IError, result: IDialogUnpopulatedUsers) => {
        try {
          if (error) {
            return response.status(500).json({message: error.value})
          }

          const interlocutor =
            userId?.toString() === result.author.toString()
              ? result.interlocutor
              : result.author

          if (interlocutor) {
            this.clearUnreadMessages(dialog, response)
            this.updateReadStatus(dialog, response, interlocutor.toString())
          }
        } catch (error) {
          return response.status(500).json({message: error.value})
        }
      })

    await Message.find({dialog})
      .populate(['user'])
      .exec((error: IError, messages: Array<IMessageMongoose>) => {
        try {
          if (error) {
            return response.status(404).json({message: error.value})
          }

          return response.json(messages.map(messageDTO))
        } catch (error) {
          return response.status(500).json({message: error.message})
        }
      })
  }

  async create(
    request: Request<core.ParamsDictionary, unknown, IMessageCreateBody>,
    response: Response<IResponseMessage | IMessage>,
  ) {
    const userId = (request.user as IUser)?.id ?? null
    const {text, dialog, interlocutor, attachment} = request.body

    if (!userId) {
      return response.status(400).json({message: 'User id is not defined!'})
    }

    try {
      const message = await new Message({
        text,
        user: userId,
        dialog,
        attachment,
      }).save()

      await Message.findOne({_id: message.id})
        .populate(['user'])
        .exec((error: IError, message: IMessageMongoose) => {
          if (error) {
            return response.status(500).json({message: error.value})
          }

          this.updateDialog(response, dialog, message)

          this.io
            .to(interlocutor)
            .emit(EVENTS_SOCKET.NEW_MESSAGE, messageDTO(message))
          return response.json(messageDTO(message))
        })
    } catch (error) {
      return response.status(500).json({message: error.message})
    }
  }

  private async updateDialog(
    response: Response,
    dialog: string,
    message: IMessageMongoose,
  ) {
    await Dialog.findOne({_id: dialog}).exec(
      async (error: IError, result: IDialogMongoose) => {
        if (error) {
          return response.status(500).json({message: error.value})
        }

        result.last_message = message
        result.messages = (result.messages ?? 0) + 1
        await result.save()
      },
    )
  }

  async delete(request: Request, response: Response<string[] | IResponseMessage>) {
    const {messages} = request.query

    if (!messages?.length) {
      return response.status(400).json({message: 'Expected messages for delete.'})
    }

    const messagesArray = Array.isArray(messages) ? messages : [messages]

    await Message.deleteMany({_id: {$in: messagesArray}}).exec((error: IError) => {
      try {
        if (error) {
          return response.status(500).json({message: error.value})
        }

        return response.json(messagesArray as string[])
      } catch (error) {
        return response.status(500).json({message: error.message})
      }
    })
  }

  private clearUnreadMessages(dialog: string, response: Response) {
    Dialog.findOneAndUpdate(
      {_id: dialog},
      {
        messages: 0,
      },
    ).exec((error: IError) => {
      if (error) {
        return response.status(500).json({message: error.value})
      }
    })
  }

  private updateReadStatus(
    dialog: string,
    response: Response,
    interlocutor: string,
  ) {
    Message.updateMany({dialog}, {$set: {read: true}}).exec((error: IError) => {
      try {
        if (error) {
          return response.status(500).json({message: error.value})
        } else {
          this.io.to(interlocutor).emit(EVENTS_SOCKET.READ_MESSAGE, dialog)
        }
      } catch (error) {
        return response.status(500).json({message: error.message})
      }
    })
  }

  readMessage(
    response: Response<IResponseMessage | void>,
    dialog: string,
    interlocutor: string,
  ) {
    this.clearUnreadMessages(dialog, response)
    this.updateReadStatus(dialog, response, interlocutor)
  }
}
