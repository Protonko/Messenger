import {verify, VerifyErrors} from 'jsonwebtoken'
import {config} from '../config'
import {DecodedData} from '../types/jwt';

export const jwtVerify = (token: string): Promise<DecodedData> => {
  return new Promise((resolve, reject) => {
    const verifyCallback = (
      error: VerifyErrors | null,
      decodedToken: object | undefined,
    ) => {
      if (error || !decodedToken) {
        return reject(error)
      }

      resolve(decodedToken as DecodedData)
    }

    verify(token, config.JWT_SECRET_KEY, verifyCallback)
  })
}
