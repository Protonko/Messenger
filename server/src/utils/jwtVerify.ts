import {verify, VerifyErrors} from 'jsonwebtoken'
import {config} from '../config'
import {IDecodedData} from '../types/jwt';

export const jwtVerify = (token: string): Promise<IDecodedData> => {
  return new Promise((resolve, reject) => {
    const verifyCallback = (
      error: VerifyErrors | null,
      decodedToken: object | undefined,
    ) => {
      if (error || !decodedToken) {
        return reject(error)
      }

      resolve(decodedToken as IDecodedData)
    }

    verify(token, config.JWT_SECRET_KEY, verifyCallback)
  })
}
