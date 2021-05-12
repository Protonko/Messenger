import type {ICreateDialogBody, IDialog} from 'models/dialog'
import {api} from 'api'

export class DialogsApi {
  static getDialogs(id: string): Promise<IDialog[]> {
    return new Promise((resolve, reject) => {
      api.get(`/dialogs/${id}`)
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

  static createDialog(dialog: ICreateDialogBody): Promise<IDialog> {
    return new Promise((resolve, reject) => {
      api.post('/dialogs', dialog)
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
