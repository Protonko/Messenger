import {Request, Response, NextFunction} from 'express'
import {User} from '../models/User'

export const updateLastSeen = (
  _: Request,
  __: Response,
  next: NextFunction,
) => {
  User.findOneAndUpdate(
    // TODO: сменить _id
    {_id: '5ff9783e874fca04ac12cfb0'},
    {$set: {
      last_seen: new Date()
    }},
    {new: true},
  )

  next()
}
