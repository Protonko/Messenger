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
    const {dialog} = request.query

    if (typeof dialog !== 'string') {
      return response
        .status(400)
        .json({message: 'id should be string!'})
    }

    Message
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

          response.json(messageMapper(message))
          this.io.to(interlocutor).emit(EVENTS_SOCKET.NEW_MESSAGE, messageMapper(message))
        })
    } catch (error) {
      return response
        .status(500)
        .json({message: error.message})
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
    } catch (error) {
      return response
        .status(500)
        .json({message: error.message})
    }
  }
}
