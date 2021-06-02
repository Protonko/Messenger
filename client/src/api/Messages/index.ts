import type {AxiosError} from 'axios'
import type {ICreateMessageBody, IMessage} from 'models/message'
import {api} from 'api'

export class MessagesApi {
  static createMessage(body: ICreateMessageBody): Promise<IMessage | string> {
    return new Promise((resolve, reject) => {
      api
        .post<IMessage>('/messages', body)
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

  static getMessages(dialogId: string): Promise<IMessage[] | string> {
    return new Promise((resolve, reject) => {
      api
        .get<IMessage[]>(`/messages?dialog=${dialogId}`)
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
