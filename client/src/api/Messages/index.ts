import type {ICreateMessageBody, ICreateMessageResponse} from 'models/message'
import {api} from 'api'

export class MessagesApi {
  static createMessage(body: ICreateMessageBody): Promise<ICreateMessageResponse | string> {
    return new Promise((resolve, reject) => {
      api.post('/messages', body)
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
