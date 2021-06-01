import type {IUser} from 'models/user'
import type {AllUsersActions} from 'models/store/actions/users'
import {UsersActionTypes} from 'models/store/actions/users'

export interface IInitialState {
  loading: boolean
  users: null | IUser[]
  selectedUserId: null | string
  errorMessage: null | string
}

export const initialState = {
  loading: false,
  users: null,
  errorMessage: null,
  selectedUserId: null,
} as IInitialState

const reducers = (
  state = initialState,
  action: AllUsersActions,
): IInitialState => {
  switch (action.type) {
    case UsersActionTypes.GET_START:
      return {
        ...state,
        loading: true,
      }
    case UsersActionTypes.GET_SUCCESS:
      return {
        ...initialState,
        users: action.payload,
      }
    case UsersActionTypes.GET_ERROR:
      return {
        ...initialState,
        errorMessage: action.payload,
      }
    case UsersActionTypes.SET_SELECTED_USER_ID:
      return {
        ...state,
        selectedUserId: action.payload,
      }
    case UsersActionTypes.RESET:
      return initialState
    case UsersActionTypes.RESET_SELECTED_USER_ID:
      return {
        ...state,
        selectedUserId: initialState.selectedUserId,
      }
    default:
      return state
  }
}

export default reducers
