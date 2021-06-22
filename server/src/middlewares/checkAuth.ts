import {Request, Response, NextFunction} from 'express'
import {PATHS} from '../static'
import {IDecodedData} from '../types/jwt'
import {jwtVerify} from '../utils/jwtVerify'

export const checkAuth = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (PATHS.includes(request.path)) {
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
