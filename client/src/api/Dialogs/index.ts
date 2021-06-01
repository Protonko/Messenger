import type {ICreateDialogBody, IDialog} from 'models/dialog'
import {api} from 'api'
import {AxiosError} from 'axios'

export class DialogsApi {
  static getDialogs(id: string): Promise<IDialog[] | string> {
    return new Promise((resolve, reject) => {
      api
        .get<IDialog[]>(`/dialogs/${id}`)
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

  static createDialog(dialog: ICreateDialogBody): Promise<IDialog | string> {
    return new Promise((resolve, reject) => {
      api
        .post<IDialog>('/dialogs', dialog)
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
