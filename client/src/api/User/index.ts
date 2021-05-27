import type {
  IUserLoginBody,
  IUserSignupBody,
  IUserLoginResponse,
} from 'models/auth'
import type {IUser} from 'models/user'
import {api} from 'api'

export class UserApi {
  static login(body: IUserLoginBody): Promise<IUserLoginResponse | string> {
    return new Promise((resolve, reject) => {
      api.post<IUserLoginResponse>('/user/login', body)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response.statusText)
          }
        })
        .catch(error => reject(error.message))
    })
  }

  static signUp(body: IUserSignupBody | void): Promise<IUser | string> {
    return new Promise((resolve, reject) => {
      api.post<IUser>('/user/signup', body)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response.statusText)
          }
        })
        .catch(error => reject(error.message))
    })
  }

  static getUsers(): Promise<IUser[] | string> {
    return new Promise((resolve, reject) => {
      api.get<IUser[]>('/users')
        .then(response => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response.statusText)
          }
        })
        .catch(error => reject(error.message))
    })
  }
}
