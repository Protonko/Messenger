import {Request, Response} from 'express'
import {compareSync} from 'bcrypt'
import {validationResult} from 'express-validator'
import {User} from '../models/User'
import {IUser} from '../types/user'
import {IError} from '../types/error'
import {jwtCreate} from '../utils/jwtCreate'

export class UserController {
  find(request: Request, response: Response) {
    const {id} = request.params

    User.findById(id, (error: IError, user: IUser) => {
      try {
        if (error) {
          return response
            .status(404)
            .json({message: 'User not found.'})
        }

        return response.json(user)
      } catch {
        return response
          .status(500)
          .json({message: 'Undefined error.'})
      }
    })
  }

  getOwnProfile(request: Request, response: Response) {
    // @ts-ignore
    const id = request.user?._id ?? null

    User.findById(id, (error: IError, user: IUser) => {
      if (error) {
        return response
          .status(404)
          .json({message: 'User not found.'})
      }

      response.json(user)
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

    User.findOne({email}, (error: IError, user: IUser) => {
      if (error) {
        return response.status(404).json({
          message: 'User not found.',
        })
      }

      if (compareSync(password, user.password)) {
        const token = jwtCreate({email, password})

        response.json({
          status: 'success',
          token,
        })
      } else {
        response.json({
          status: 'error',
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

      response.json(createdUser)
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
