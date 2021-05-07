import type {IUser} from 'models/user'
import {
  GetUsersErrorAction,
  GetUsersStartAction,
  GetUsersSuccessAction,
  ResetSelectedUserIdAction,
  ResetUsersStateAction,
  SetSelectedUserIdAction,
  UsersActionTypes,
} from 'models/store/actions/users'

export const getUsers = (): GetUsersStartAction =>
  ({type: UsersActionTypes.GET_START})

export const getUsersSuccess = (payload: IUser[]): GetUsersSuccessAction =>
  ({type: UsersActionTypes.GET_SUCCESS, payload})

export const getUsersError = (payload: string): GetUsersErrorAction =>
  ({type: UsersActionTypes.GET_ERROR, payload})

export const resetUsersState = (): ResetUsersStateAction =>
  ({type: UsersActionTypes.RESET})

export const setSelectedUserId = (payload: string): SetSelectedUserIdAction =>
  ({type: UsersActionTypes.SET_SELECTED_USER_ID, payload})

export const resetSelectedUserId = (): ResetSelectedUserIdAction =>
  ({type: UsersActionTypes.RESET_SELECTED_USER_ID})
