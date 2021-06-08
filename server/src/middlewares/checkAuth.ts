import {Request, Response, NextFunction} from 'express'
import {PATHS} from '../static'
import {IDecodedData} from '../types/jwt'
import {IError} from '../types/error'
import {IUserMongoose} from '../types/user'
import {User} from '../models/User'
import {jwtVerify} from '../utils/jwtVerify'

export const checkAuth = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (PATHS.includes(request.path)) {
    return next()
  }

  const token: string | null =
    'token' in request.headers ? (request.headers.token as string) : null

  if (token) {
    try {
      const user: IDecodedData | null = await jwtVerify(token)

      if (user) {
        const {email} = user.data

        await User.findOne({email}, (error: IError, user: IUserMongoose) => {
          if (error) {
            return response
              .status(404)
              .json({message: 'User not found.'})
          }

          // @ts-ignore
          request.user = user
        })
      }

      next()
    } catch {
      response
        .status(403)
        .json({message: 'Invalid auth token provided.'})
    }
  } else {
    return response
      .status(403)
      .json({message: 'Invalid auth token provided.'})
  }
}
