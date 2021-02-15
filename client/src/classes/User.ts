import {IUserLoginBody, IUserSignupBody, IUserLoginResponse} from 'models/auth'

import api from './index';

export class UserApi {
  static async login(body: IUserLoginBody): Promise<IUserLoginResponse> {
    const response = await api.send(
      api.sendRequest()
        .url('/user/login')
        .method('POST')
        .body(body),
    );

    return response.getContent();
  }

  static async signup(body: IUserSignupBody): Promise<any> {
    const response = await api.send(
      api.sendRequest()
        .url('/user/signup')
        .method('POST')
        .body(body),
    );

    return response.getContent();
  }
}
