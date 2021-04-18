import type {IDialog} from 'models/dialog'
import {DialogsActionTypes} from 'models/store/actions/dialogs'

export const getDialogs = (payload: IDialog[]) => ({type: DialogsActionTypes.GET, payload})
