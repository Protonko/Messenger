import type {AxiosError, AxiosResponse} from 'axios'
import type {ICreateMessageBody, IMessage} from 'models/message'
import {api} from 'api'

export class MessagesApi {
  static createMessage(body: ICreateMessageBody): Promise<IMessage | AxiosResponse | string> {
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

  static getMessages(dialogId: string): Promise<IMessage[] | AxiosResponse | string> {
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

  static deleteMessages(messagesIds: string[]): Promise<string[] | AxiosResponse | string> {
    const messagesParams = messagesIds.map(messageId => `messages=${messageId}`).join('&');

    return new Promise((resolve, reject) => {
      api
        .delete<string[]>(`/messages?${messagesParams}`)
        .then(response => {
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
