import {Request, Response, NextFunction} from 'express'
import {IUser} from '../models/types/user';
import {DecodedData} from '../models/types/jwt';
import {jwtVerify} from '../utils/jwtVerify'

declare namespace Express {
  export interface Request {
    user?: IUser
  }
}

export const checkAuth = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token: string | null =
    'token' in request.headers ? (request.headers.token as string) : null

  if (token) {
    try {
      const user: DecodedData | null = await jwtVerify(token)

      if (user) {
        request.user = user.data._doc
      }

      next()
    } catch {
      response
        .status(403)
        .json({message: 'Invalid auth token provided.'})
    }
  }
}
