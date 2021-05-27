import {Request, Response} from 'express'
import {validationResult} from 'express-validator'
import {Server} from 'socket.io'
import {compareSync} from 'bcrypt'
import {User} from '../models/User'
import {IUserMongoose} from '../types/user'
import {IError} from '../types/error'
import {jwtCreate} from '../utils/jwtCreate'
import {userMapper} from '../utils/mappers/userMapper'

export class UserController {
  private io: Server

  constructor(io: Server) {
    this.io = io
  }

  find(request: Request, response: Response) {
    const {id} = request.params

    User.findById(id, (error: IError, user: IUserMongoose) => {
      try {
        if (error) {
          return response
            .status(404)
            .json({message: 'User not found.'})
        }

        return response.json(userMapper(user))
      } catch {
        return response
          .status(500)
          .json({message: 'Undefined error.'})
      }
    })
  }

  getProfiles(request: Request, response: Response) {
    User.find({}, (error: IError, users: IUserMongoose[]) => {
      try {
        if (error) {
          return response
            .status(404)
            .json({message: 'Users not found.'})
        }

        return response.json(users.map(userMapper))
      } catch {
        return response
          .status(500)
          .json({message: 'Undefined error.'})
      }
    }).limit( 10 )
  }

  getOwnProfile(request: Request, response: Response) {
    // @ts-ignore
    const id = request.user?._id ?? null

    User.findById(id, (error: IError, user: IUserMongoose) => {
      if (error) {
        return response
          .status(404)
          .json({message: 'User not found.'})
      }

      response.json(userMapper(user))
    })
  }

  login(request: Request, response: Response) {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response
        .status(422)
        .json({errors: errors.array()});
    }

    const {email, password} = request.body

    User.findOne({email}, (error: IError, user: IUserMongoose) => {
      if (error) {
        return response.status(404).json({
          message: 'User not found.',
        })
      }

      if (compareSync(password, user.password)) {
        const token = jwtCreate({email, password})

        response.json({
          user: userMapper(user),
          token,
        })
      } else {
        response.status(535).json({
          message: 'Incorrect password or email.',
        })
      }
    })
  }

  async create(request: Request, response: Response) {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        return response
          .status(422)
          .json({errors: errors.array()});
      }

      const {email, full_name, password} = request.body
      const user = new User({email, full_name, password})
      const createdUser = await user.save()

      response.json(userMapper(createdUser))
    } catch (reason) {
      response.json(reason)
    }
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params
    const user = await User.findOneAndRemove({_id: id})

    try {
      if (!user) {
        return response
          .status(404)
          .json({message: 'User not found.'})
      }

      return response.json({message: 'User deleted.'})
    } catch {
      return response
        .status(500)
        .json({message: 'Undefined error.'})
    }
  }
}
