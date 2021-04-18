import type {IDialog} from 'models/dialog'

export interface IInitialState {
  dialogs: null | IDialog[]
}

export const initialState = {
  dialogs: null
} as IInitialState

const reducers = (
  state = initialState,
  action: any
) => {

}
