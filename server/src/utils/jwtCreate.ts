import type {IUserMongoose} from '../types/user'
import {sign} from 'jsonwebtoken'
import {config} from '../config'
import {userDTO} from './dto/userDTO'

const options = {
  expiresIn: config.ACCESS_TOKEN_MAX_AGE,
  algorithm: config.JWT_ALGORITHM,
}

export const jwtCreate = (user: IUserMongoose) => {
  return {
    accessToken: sign(
      {data: userDTO(user)},
      config.JWT_SECRET_KEY,
      options,
    )
  }
}
