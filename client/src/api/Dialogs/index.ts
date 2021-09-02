import type {ICreateDialogBody, IDialog} from 'models/dialog'
import {api} from 'api'
import {apiHandler} from 'api/apiHandler'

export class DialogsApi {
  static getDialogs(id: string) {
    return apiHandler(api.get<IDialog[]>(`/dialogs/${id}`))
  }

  static createDialog(dialog: ICreateDialogBody) {
    return apiHandler(api.post<IDialog>('/dialogs', dialog))
  }
}
