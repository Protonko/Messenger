import {Request, Response, NextFunction} from 'express'
import {PATHS} from '../static'
import {DecodedData} from '../models/types/jwt'
import {jwtVerify} from '../utils/jwtVerify'

export const checkAuth = async (
  request: any, // TODO: исправить
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
  } else {
    return response
      .status(403)
      .json({message: 'Invalid auth token provided.'})
  }
}
