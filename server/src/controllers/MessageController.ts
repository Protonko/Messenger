import {Request, Response} from 'express'
import {Server} from 'socket.io'
import {EVENTS_SOCKET} from '../static';
import {Message} from '../models/Message'
import {IError} from '../types/error'
import {IMessage} from '../types/message'

export class MessageController {
  private io: Server

  constructor(io: Server) {
    this.io = io

    this.create = this.create.bind(this)
  }

  find(request: Request, response: Response) {
    // dialog id
    const {id} = request.query

    Message
      // @ts-ignore
      .find({_id: id})
      .populate(['dialog'])
      .exec((error: IError, messages: Array<IMessage>) => {
        try {
          if (error) {
            return response
              .status(404)
              .json({message: 'Messages not found'})
          }

          return response.json(messages)
        } catch {
          return response
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

          response.json(message)
          this.io.emit(EVENTS_SOCKET.NEW_MESSAGE, message)
      })
    } catch (reason) {
      response.json(reason)
    }
  }

  async delete(request: Request, response: Response) {
    // message id
    const {id} = request.query
    const message = await Message.findOneAndRemove({_id: id})

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
