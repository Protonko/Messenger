import type {IUser} from 'models/user'
import type {AllUsersActions} from 'models/store/actions/users'
import {UsersActionTypes} from 'models/store/actions/users'

export interface IInitialState {
  loading: boolean
  users: null | IUser[]
  errorMessage: null | string
}

export const initialState = {
  loading: false,
  users: null,
  errorMessage: null,
} as IInitialState

const reducers = (
  state = initialState,
  action: AllUsersActions
): IInitialState => {
  switch (action.type) {
    case UsersActionTypes.GET_START:
      return {
        ...state,
        loading: true,
      }
    case UsersActionTypes.GET_SUCCESS:
      return {
        loading: false,
        errorMessage: null,
        users: action.payload
      }
    case UsersActionTypes.GET_ERROR:
      return {
        loading: false,
        users: null,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export default reducers
