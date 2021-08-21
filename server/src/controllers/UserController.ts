import type {Request, Response} from 'express'
import type {IUser, IUserAuthData, IUserCreateBody, IUserLoginBody, IUserMongoose} from '../types/user'
import type {IError, IValidationErrors} from '../types/error'
import type {IResponseMessage} from '../types/response'
import * as core from 'express-serve-static-core';
import {validationResult} from 'express-validator'
import {compareSync} from 'bcrypt'
import {User} from '../models/User'
import {jwtCreate} from '../utils/jwtCreate'
import {userDTO} from '../utils/dto/userDTO'

export class UserController {
  find(request: Request, response: Response<IResponseMessage | IUser>) {
    const {id} = request.params

    User.findById(id, (error: IError, user: IUserMongoose) => {
      try {
        if (error) {
          return response
            .status(404)
            .json({message: 'User not found.'})
        }

        return response.json(userDTO(user))
      } catch (error) {
        return response
          .status(500)
          .json({message: error.message})
      }
    })
  }

  getProfiles(request: Request, response: Response<IResponseMessage | IUser[]>) {
    User.find({}, (error: IError, users: IUserMongoose[]) => {
      try {
        if (error) {
          return response
            .status(404)
            .json({message: error.value})
        }

        return response.json(users.map(userDTO))
      } catch {
        return response
          .status(500)
          .json({message: 'Undefined error.'})
      }
    }).limit( 10 )
  }

  getOwnProfile(request: Request, response: Response<IResponseMessage | IUser>) {
    const id = (request.user as IUser)?.id ?? null

    User.findById(id, (error: IError, user: IUserMongoose) => {
      if (error) {
        return response
          .status(404)
          .json({message: error.value})
      }

      return response.json(userDTO(user))
    })
  }

  login(request: Request<core.ParamsDictionary, unknown, IUserLoginBody>, response: Response<IResponseMessage | IValidationErrors | IUserAuthData>) {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response
        .status(422)
        .json({errors: errors.array()});
    }

    const {email, password} = request.body

    User.findOne({email}, (error: IError, user: IUserMongoose) => {
      if (error || !user) {
        return response.status(404).json({
          message: 'User not found.',
        })
      }

      if (compareSync(password, user.password)) {
        const {accessToken} = jwtCreate(user)

        return response.json({
          user: userDTO(user),
          accessToken,
        })
      }

      return response.status(535).json({
        message: 'Incorrect password or email.',
      })
    })
  }

  async create(request: Request<core.ParamsDictionary, unknown, IUserCreateBody>, response: Response<IResponseMessage | IValidationErrors | IUser>) {
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

      return response.json(userDTO(createdUser))
    } catch (error) {
      return response
        .status(500)
        .json({message: error.message})
    }
  }

  async delete(request: Request, response: Response<IResponseMessage>) {
    const {id} = request.params
    const user = await User.findOneAndRemove({_id: id})

    try {
      if (!user) {
        return response
          .status(404)
          .json({message: 'User not found.'})
      }

      return response.json({message: 'User deleted.'})
    } catch (error) {
      return response
        .status(500)
        .json({message: error.message})
    }
  }
}
