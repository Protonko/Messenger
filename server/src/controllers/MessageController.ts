import {Request, Response} from 'express'
import {Server} from 'socket.io'
import {EVENTS_SOCKET} from '../static';
import {Message} from '../models/Message'
import {IError} from '../types/error'
import {IMessageMongoose} from '../types/message'
import {messageMapper} from '../utils/mappers/messageMapper'

export class MessageController {
  private io: Server

  constructor(io: Server) {
    this.io = io

    this.create = this.create.bind(this)
  }

  find(request: Request, response: Response) {
    // dialog id
    const {dialog} = request.query

    if (typeof dialog !== 'string') {
      return response
        .status(400)
        .json({message: 'id should be string!'})
    }

    Message
      .find({dialog})
      .exec((error: IError, messages: Array<IMessageMongoose>) => {
        try {
          if (error) {
            return response
              .status(404)
              .json({message: 'Messages not found'})
          }

          return response.json(messages.map(messageMapper))
        } catch {
          return response
            .status(500)
            .json({message: 'undefined error'})
        }
      })
  }

  async create(request: Request, response: Response) {
    // @ts-ignore
    const userId = request.user?._id ?? null
    const {text, id} = request.body

    try {
      const message = new Message({text, user: userId, id})
      const createdMessage = await message.save()

      createdMessage.populate(
        'dialog',
        (error, message) => {
          if (error) {
            return response.status(500).json({message: error})
          }

          response.json(messageMapper(message))
          this.io.emit(EVENTS_SOCKET.NEW_MESSAGE, message)
      })
    } catch (reason) {
      response.json(reason)
    }
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
    } catch {
      return response
        .json({message: 'undefined error'})
    }
  }
}
