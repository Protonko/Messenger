import type {ICreateMessageBody, ICreateMessageResponse} from 'models/message'
import {api} from 'api'

export class MessagesApi {
  static createMessage(body: ICreateMessageBody): Promise<ICreateMessageResponse | string> {
    return new Promise((resolve, reject) => {
      api.post<ICreateMessageResponse>('/messages', body)
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
