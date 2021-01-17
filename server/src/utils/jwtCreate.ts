import {sign} from 'jsonwebtoken'
import _ from 'lodash'
import {config} from '../config'
import {ILoginUser} from '../types/user';

const options = {
  expiresIn: config.JWT_MAX_AGE,
  algorithm: config.JWT_ALGORITHM,
}

const reduceData = (
  acc: {[key: string]: string},
  value: string,
  key: string
) => {
  if (key !== 'password') {
    return {
      ...acc,
      [key]: value,
    }
  }

  return acc
}

export const jwtCreate = (user: ILoginUser) => {
  const userWithoutPassword = _.reduce(user, reduceData, {})

  return sign(
    {data: userWithoutPassword},
    config.JWT_SECRET_KEY,
    options,
  )
}
