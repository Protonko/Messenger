import type {Request, Response, NextFunction} from 'express'
import type {IUser} from '../types/user'
import {User} from '../models/User'

export const updateLastSeen = (
  request: Request,
  _: Response,
  next: NextFunction,
) => {
  if (request.user) {
    User.findOneAndUpdate(
      {_id: (request.user as IUser).id},
      {$set: {
          last_seen: new Date()
        }},
      {new: true},
    )
  }

  next()
}
