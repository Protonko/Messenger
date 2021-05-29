import {sign} from 'jsonwebtoken'
import {config} from '../config'
import {IUserMongoose} from '../types/user'
import {userMapper} from './mappers/userMapper'

const options = {
  expiresIn: config.JWT_MAX_AGE,
  algorithm: config.JWT_ALGORITHM,
}

export const jwtCreate = (user: IUserMongoose) => {
  return sign(
    {data: userMapper(user)},
    config.JWT_SECRET_KEY,
    options,
  )
}
