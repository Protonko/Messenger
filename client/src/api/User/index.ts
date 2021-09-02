import type {AxiosError, AxiosResponse} from 'axios'
import type {
  IUserLoginBody,
  IUserSignupBody,
  IUserLoginResponse,
} from 'models/auth'
import type {IUser} from 'models/user'
import {api} from 'api'

export class UserApi {
  static login(body: IUserLoginBody): Promise<IUserLoginResponse | AxiosResponse | string> {
    return new Promise((resolve, reject) => {
      api
        .post<IUserLoginResponse>('/user/login', body)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response.statusText)
          }
        })
        .catch((error: AxiosError) => reject(error.response))
    })
  }

  static signUp(body: IUserSignupBody | void): Promise<IUser | AxiosResponse | string> {
    return new Promise((resolve, reject) => {
      api
        .post<IUser>('/user/signup', body)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response.statusText)
          }
        })
        .catch((error: AxiosError) => reject(error.response))
    })
  }

  static getUsers(): Promise<IUser[] | AxiosResponse | string> {
    return new Promise((resolve, reject) => {
      api
        .get<IUser[]>('/users')
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response.statusText)
          }
        })
        .catch((error: AxiosError) => reject(error.response))
    })
  }
}
