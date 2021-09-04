import type {ICreateMessageBody, IMessage} from 'models/message'
import {api} from 'api'
import {apiHandler} from 'api/apiHandler'

export class MessagesApi {
  static createMessage(body: ICreateMessageBody) {
    return apiHandler(api.post<IMessage>('/messages', body))
  }

  static getMessages(dialogId: string) {
    return apiHandler(api.get<IMessage[]>(`/messages?dialog=${dialogId}`))
  }

  static deleteMessages(messagesIds: string[]) {
    const messagesParams = messagesIds
      .map((messageId) => `messages=${messageId}`)
      .join('&')

    return apiHandler(api.delete<string[]>(`/messages?${messagesParams}`))
  }
}
