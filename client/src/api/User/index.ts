import {
  IUserLoginBody,
  IUserSignupBody,
  IUserLoginResponse,
} from 'models/auth'
import {IUser} from 'models/user'

import {api} from 'api'

export class UserApi {
  static login(body: IUserLoginBody): Promise<IUserLoginResponse | string> {
    return new Promise((resolve, reject) => {
      api.post('/user/login', body)
        .then(response => {
          if (response.data.status === 'error') {
            reject(response.data.message)
          } else {
            resolve(response.data)
          }
        })
        .catch(error => reject(error.message))
    })
  }

  static async signUp(body: IUserSignupBody): Promise<IUser | string> {
    return new Promise((resolve, reject) => {
      api.post('/user/signup', body)
        .then(response => {
          if (response.data.status === 'error') {
            reject(response.data.message)
          } else {
            resolve(response.data)
          }
        })
        .catch(error => reject(error.message))
    })
  }
}
