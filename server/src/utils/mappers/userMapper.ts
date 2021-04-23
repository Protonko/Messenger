import {IUser, IUserMongoose} from '../../types/user'

export const userMapper = (user: IUserMongoose): IUser => ({
  id: user._id,
  avatar: user.avatar,
  last_seen: user.last_seen,
  email: user.email,
  full_name: user.full_name,
  confirmed: user.confirmed,
  confirm_hash: user.confirm_hash,
})
