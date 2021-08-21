import type {Request, Response, NextFunction} from 'express'
import type {IDecodedData} from '../types/jwt'
import {jwtVerify} from '../utils/jwtVerify'
import {PATHS, STATIC_PATH} from '../constants'

export const checkAuth = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (PATHS.includes(request.path) || request.path.startsWith(STATIC_PATH)) {
    return next()
  }

  const accessToken = request.headers.authorization?.split(' ')[1]

  if (accessToken) {
    try {
      const user: IDecodedData | null = await jwtVerify(accessToken)

      if (user) {
        request.user = user.data
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
