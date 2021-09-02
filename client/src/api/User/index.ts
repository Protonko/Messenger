import type {
  IUserLoginBody,
  IUserSignupBody,
  IUserLoginResponse,
} from 'models/auth'
import type {IUser} from 'models/user'
import {api} from 'api'
import {apiHandler} from 'api/apiHandler'

export class UserApi {
  static login(body: IUserLoginBody) {
    return apiHandler(api.post<IUserLoginResponse>('/user/login', body))
  }

  static signUp(body: IUserSignupBody | void) {
    return apiHandler(api.post<IUser>('/user/signup', body))
  }

  static getUsers() {
    return apiHandler(api.get<IUser[]>('/users'))
  }
}
