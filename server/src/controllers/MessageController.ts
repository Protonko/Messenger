import {Request, Response} from 'express'
import {Message} from '../models/Message'
import {IError} from '../types/error'
import {IMessage} from '../types/message'

export class MessageController {
  find(request: Request, response: Response) {
    const {id} = request.query

    Message
      // @ts-ignore
      .find({_id: id})
      .populate(['dialog'])
      .exec((error: IError, messages: IMessage) => {
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
    const userId = '5ff7142f21141a287a33c159';
    const {text, user, id} = request.body

    try {
      const message = new Message({text, user: userId, id})
      const createdMessage = await message.save()

      response.json(createdMessage)
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
